-- Triggers and Functions for Car Dealership Management System

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sales_updated_at BEFORE UPDATE ON sales
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rentals_updated_at BEFORE UPDATE ON rentals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_appointments_updated_at BEFORE UPDATE ON service_appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_technicians_updated_at BEFORE UPDATE ON technicians
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically update car status when sold
CREATE OR REPLACE FUNCTION update_car_status_on_sale()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        -- Update all cars in this sale to 'sold' status
        UPDATE cars 
        SET status = 'sold', availability = 'none'
        WHERE id IN (
            SELECT car_id FROM sale_items WHERE sale_id = NEW.id
        );
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_update_car_status_on_sale
    AFTER UPDATE ON sales
    FOR EACH ROW EXECUTE FUNCTION update_car_status_on_sale();

-- Function to update car availability when rental status changes
CREATE OR REPLACE FUNCTION update_car_availability_on_rental()
RETURNS TRIGGER AS $$
BEGIN
    -- When rental becomes active, mark car as rented
    IF NEW.status = 'active' AND OLD.status != 'active' THEN
        UPDATE cars SET status = 'rented' WHERE id = NEW.car_id;
        
        -- Block dates in availability calendar
        INSERT INTO car_availability (car_id, date, status, rental_id)
        SELECT NEW.car_id, generate_series(NEW.pickup_date, NEW.return_date, '1 day'::interval)::date, 'booked', NEW.id
        ON CONFLICT (car_id, date) DO UPDATE SET status = 'booked', rental_id = NEW.id;
        
    -- When rental is completed, mark car as available
    ELSIF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        UPDATE cars SET status = 'available' WHERE id = NEW.car_id;
        
        -- Free up dates in availability calendar
        UPDATE car_availability 
        SET status = 'available', rental_id = NULL 
        WHERE car_id = NEW.car_id AND rental_id = NEW.id;
        
    -- When rental is cancelled, mark car as available
    ELSIF NEW.status = 'cancelled' AND OLD.status != 'cancelled' THEN
        UPDATE cars SET status = 'available' WHERE id = NEW.car_id;
        
        -- Free up dates in availability calendar
        DELETE FROM car_availability 
        WHERE car_id = NEW.car_id AND rental_id = NEW.id;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_update_car_availability_on_rental
    AFTER UPDATE ON rentals
    FOR EACH ROW EXECUTE FUNCTION update_car_availability_on_rental();

-- Function to calculate rental total amount
CREATE OR REPLACE FUNCTION calculate_rental_total()
RETURNS TRIGGER AS $$
DECLARE
    days_count INTEGER;
    base_cost DECIMAL(12,2);
    services_cost DECIMAL(12,2);
BEGIN
    -- Calculate number of days
    days_count := NEW.return_date - NEW.pickup_date;
    IF days_count < 1 THEN
        days_count := 1;
    END IF;
    
    -- Calculate base cost based on rental type
    IF NEW.rental_type = 'daily' THEN
        base_cost := NEW.daily_rate * days_count;
    ELSIF NEW.rental_type = 'weekly' THEN
        base_cost := NEW.daily_rate * 7 * CEIL(days_count::DECIMAL / 7);
    ELSIF NEW.rental_type = 'monthly' THEN
        base_cost := NEW.daily_rate * 30 * CEIL(days_count::DECIMAL / 30);
    ELSE
        base_cost := NEW.daily_rate * days_count;
    END IF;
    
    -- Get additional services cost
    SELECT COALESCE(SUM(total_price), 0) INTO services_cost
    FROM rental_items WHERE rental_id = NEW.id;
    
    -- Update calculated fields
    NEW.total_days := days_count;
    NEW.base_amount := base_cost;
    NEW.additional_services_amount := services_cost;
    NEW.total_amount := base_cost + services_cost + COALESCE(NEW.security_deposit, 0) - COALESCE(NEW.discount_amount, 0) + COALESCE(NEW.tax_amount, 0);
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_calculate_rental_total
    BEFORE INSERT OR UPDATE ON rentals
    FOR EACH ROW EXECUTE FUNCTION calculate_rental_total();

-- Function to update customer statistics
CREATE OR REPLACE FUNCTION update_customer_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_TABLE_NAME = 'sales' THEN
        IF NEW.status = 'completed' AND (OLD IS NULL OR OLD.status != 'completed') THEN
            UPDATE customers 
            SET total_purchases = total_purchases + 1,
                total_spent = total_spent + NEW.final_amount
            WHERE id = NEW.customer_id;
        END IF;
    ELSIF TG_TABLE_NAME = 'rentals' THEN
        IF NEW.status = 'completed' AND (OLD IS NULL OR OLD.status != 'completed') THEN
            UPDATE customers 
            SET total_rentals = total_rentals + 1,
                total_spent = total_spent + NEW.total_amount
            WHERE id = NEW.customer_id;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_update_customer_stats_sales
    AFTER INSERT OR UPDATE ON sales
    FOR EACH ROW EXECUTE FUNCTION update_customer_stats();

CREATE TRIGGER trigger_update_customer_stats_rentals
    AFTER INSERT OR UPDATE ON rentals
    FOR EACH ROW EXECUTE FUNCTION update_customer_stats();

-- Function for audit logging
CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO audit_log (table_name, record_id, action, old_values, changed_by)
        VALUES (TG_TABLE_NAME, OLD.id, 'DELETE', row_to_json(OLD), 
                COALESCE(current_setting('app.current_user_id', true)::UUID, NULL));
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, changed_by)
        VALUES (TG_TABLE_NAME, NEW.id, 'UPDATE', row_to_json(OLD), row_to_json(NEW),
                COALESCE(current_setting('app.current_user_id', true)::UUID, NULL));
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_log (table_name, record_id, action, new_values, changed_by)
        VALUES (TG_TABLE_NAME, NEW.id, 'INSERT', row_to_json(NEW),
                COALESCE(current_setting('app.current_user_id', true)::UUID, NULL));
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Apply audit triggers to important tables
CREATE TRIGGER audit_cars AFTER INSERT OR UPDATE OR DELETE ON cars
    FOR EACH ROW EXECUTE FUNCTION audit_trigger();

CREATE TRIGGER audit_customers AFTER INSERT OR UPDATE OR DELETE ON customers
    FOR EACH ROW EXECUTE FUNCTION audit_trigger();

CREATE TRIGGER audit_sales AFTER INSERT OR UPDATE OR DELETE ON sales
    FOR EACH ROW EXECUTE FUNCTION audit_trigger();

CREATE TRIGGER audit_rentals AFTER INSERT OR UPDATE OR DELETE ON rentals
    FOR EACH ROW EXECUTE FUNCTION audit_trigger();

CREATE TRIGGER audit_service_appointments AFTER INSERT OR UPDATE OR DELETE ON service_appointments
    FOR EACH ROW EXECUTE FUNCTION audit_trigger();

-- Function to check rental date conflicts
CREATE OR REPLACE FUNCTION check_rental_conflicts()
RETURNS TRIGGER AS $$
DECLARE
    conflict_count INTEGER;
BEGIN
    -- Check for existing rentals that conflict with the new dates
    SELECT COUNT(*) INTO conflict_count
    FROM rentals r
    WHERE r.car_id = NEW.car_id
    AND r.id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::UUID)
    AND r.status IN ('confirmed', 'active')
    AND (
        (NEW.pickup_date BETWEEN r.pickup_date AND r.return_date) OR
        (NEW.return_date BETWEEN r.pickup_date AND r.return_date) OR
        (r.pickup_date BETWEEN NEW.pickup_date AND NEW.return_date) OR
        (r.return_date BETWEEN NEW.pickup_date AND NEW.return_date)
    );
    
    IF conflict_count > 0 THEN
        RAISE EXCEPTION 'السيارة محجوزة في هذه الفترة الزمنية';
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_check_rental_conflicts
    BEFORE INSERT OR UPDATE ON rentals
    FOR EACH ROW EXECUTE FUNCTION check_rental_conflicts();

-- Function to generate unique numbers
CREATE OR REPLACE FUNCTION generate_unique_number(prefix TEXT, table_name TEXT, column_name TEXT)
RETURNS TEXT AS $$
DECLARE
    new_number TEXT;
    counter INTEGER := 1;
    year_suffix TEXT := TO_CHAR(CURRENT_DATE, 'YYYY');
BEGIN
    LOOP
        new_number := prefix || '-' || year_suffix || '-' || LPAD(counter::TEXT, 3, '0');
        
        EXECUTE format('SELECT 1 FROM %I WHERE %I = $1', table_name, column_name) 
        USING new_number;
        
        IF NOT FOUND THEN
            RETURN new_number;
        END IF;
        
        counter := counter + 1;
    END LOOP;
END;
$$ language 'plpgsql';

-- Function to auto-generate sale numbers
CREATE OR REPLACE FUNCTION generate_sale_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.sale_number IS NULL OR NEW.sale_number = '' THEN
        NEW.sale_number := generate_unique_number('SALE', 'sales', 'sale_number');
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_generate_sale_number
    BEFORE INSERT ON sales
    FOR EACH ROW EXECUTE FUNCTION generate_sale_number();

-- Function to auto-generate rental numbers
CREATE OR REPLACE FUNCTION generate_rental_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.rental_number IS NULL OR NEW.rental_number = '' THEN
        NEW.rental_number := generate_unique_number('RENT', 'rentals', 'rental_number');
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_generate_rental_number
    BEFORE INSERT ON rentals
    FOR EACH ROW EXECUTE FUNCTION generate_rental_number();

-- Function to auto-generate appointment numbers
CREATE OR REPLACE FUNCTION generate_appointment_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.appointment_number IS NULL OR NEW.appointment_number = '' THEN
        NEW.appointment_number := generate_unique_number('SERV', 'service_appointments', 'appointment_number');
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_generate_appointment_number
    BEFORE INSERT ON service_appointments
    FOR EACH ROW EXECUTE FUNCTION generate_appointment_number();

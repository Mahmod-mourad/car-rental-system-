-- Views for Car Dealership Management System

-- View for car details with brand and category information
CREATE OR REPLACE VIEW car_details_view AS
SELECT 
    c.*,
    b.name as brand_name,
    b.logo_url as brand_logo,
    cat.name as category_name,
    cat.description as category_description,
    (
        SELECT json_agg(
            json_build_object(
                'id', ci.id,
                'image_url', ci.image_url,
                'image_type', ci.image_type,
                'is_primary', ci.is_primary,
                'alt_text', ci.alt_text
            ) ORDER BY ci.is_primary DESC, ci.sort_order
        )
        FROM car_images ci 
        WHERE ci.car_id = c.id
    ) as images,
    (
        SELECT COUNT(*)
        FROM customer_favorites cf
        WHERE cf.car_id = c.id
    ) as favorite_count
FROM cars c
LEFT JOIN brands b ON c.brand_id = b.id
LEFT JOIN categories cat ON c.category_id = cat.id
WHERE c.is_active = true;

-- View for customer details with statistics
CREATE OR REPLACE VIEW customer_details_view AS
SELECT 
    c.*,
    COALESCE(rental_stats.active_rentals, 0) as active_rentals,
    COALESCE(rental_stats.total_rental_amount, 0) as total_rental_amount,
    COALESCE(service_stats.pending_appointments, 0) as pending_appointments,
    COALESCE(service_stats.total_service_amount, 0) as total_service_amount,
    (
        SELECT json_agg(
            json_build_object(
                'car_id', cf.car_id,
                'brand', cd.brand_name,
                'model', cd.model,
                'year', cd.year,
                'image', (cd.images->0->>'image_url')
            )
        )
        FROM customer_favorites cf
        JOIN car_details_view cd ON cf.car_id = cd.id
        WHERE cf.customer_id = c.id
    ) as favorite_cars
FROM customers c
LEFT JOIN (
    SELECT 
        customer_id,
        COUNT(*) FILTER (WHERE status IN ('confirmed', 'active')) as active_rentals,
        SUM(total_amount) as total_rental_amount
    FROM rentals
    GROUP BY customer_id
) rental_stats ON c.id = rental_stats.customer_id
LEFT JOIN (
    SELECT 
        customer_id,
        COUNT(*) FILTER (WHERE status IN ('scheduled', 'in_progress')) as pending_appointments,
        SUM(total_cost) as total_service_amount
    FROM service_appointments
    GROUP BY customer_id
) service_stats ON c.id = service_stats.customer_id;

-- View for rental details with customer and car information
CREATE OR REPLACE VIEW rental_details_view AS
SELECT 
    r.*,
    c.first_name || ' ' || c.last_name as customer_name,
    c.phone as customer_phone,
    c.email as customer_email,
    c.license_number as customer_license,
    car.brand_name,
    car.model as car_model,
    car.year as car_year,
    car.color as car_color,
    car.license_plate,
    (car.images->0->>'image_url') as car_image,
    u.first_name || ' ' || u.last_name as agent_name,
    (
        SELECT json_agg(
            json_build_object(
                'item_type', ri.item_type,
                'item_name', ri.item_name,
                'quantity', ri.quantity,
                'unit_price', ri.unit_price,
                'total_price', ri.total_price
            )
        )
        FROM rental_items ri
        WHERE ri.rental_id = r.id
    ) as additional_services,
    (
        SELECT COALESCE(SUM(amount), 0)
        FROM rental_payments rp
        WHERE rp.rental_id = r.id AND rp.status = 'completed'
    ) as total_paid,
    CASE 
        WHEN r.return_date < CURRENT_DATE AND r.status = 'active' THEN true
        ELSE false
    END as is_overdue,
    CASE 
        WHEN r.return_date = CURRENT_DATE AND r.status = 'active' THEN true
        ELSE false
    END as due_today
FROM rentals r
JOIN customer_details_view c ON r.customer_id = c.id
JOIN car_details_view car ON r.car_id = car.id
LEFT JOIN users u ON r.agent_id = u.id;

-- View for service appointment details
CREATE OR REPLACE VIEW service_appointment_details_view AS
SELECT 
    sa.*,
    c.first_name || ' ' || c.last_name as customer_name,
    c.phone as customer_phone,
    c.email as customer_email,
    car.brand_name,
    car.model as car_model,
    car.year as car_year,
    car.license_plate,
    s.name as service_name,
    s.category as service_category,
    t.first_name || ' ' || t.last_name as technician_name,
    t.specializations as technician_specializations,
    u.first_name || ' ' || u.last_name as created_by_name,
    (
        SELECT json_agg(
            json_build_object(
                'service_name', si_s.name,
                'description', si.description,
                'quantity', si.quantity,
                'unit_price', si.unit_price,
                'total_price', si.total_price,
                'status', si.status
            )
        )
        FROM service_items si
        LEFT JOIN services si_s ON si.service_id = si_s.id
        WHERE si.appointment_id = sa.id
    ) as service_items,
    (
        SELECT COALESCE(SUM(amount), 0)
        FROM service_payments sp
        WHERE sp.appointment_id = sa.id AND sp.status = 'completed'
    ) as total_paid
FROM service_appointments sa
JOIN customers c ON sa.customer_id = c.id
LEFT JOIN car_details_view car ON sa.car_id = car.id
LEFT JOIN services s ON sa.service_id = s.id
LEFT JOIN technicians t ON sa.technician_id = t.id
LEFT JOIN users u ON sa.created_by = u.id;

-- View for sales details
CREATE OR REPLACE VIEW sales_details_view AS
SELECT 
    s.*,
    c.first_name || ' ' || c.last_name as customer_name,
    c.phone as customer_phone,
    c.email as customer_email,
    u.first_name || ' ' || u.last_name as salesperson_name,
    (
        SELECT json_agg(
            json_build_object(
                'car_id', si.car_id,
                'brand', car.brand_name,
                'model', car.model,
                'year', car.year,
                'vin', car.vin,
                'unit_price', si.unit_price,
                'total_price', si.total_price,
                'accessories', si.accessories
            )
        )
        FROM sale_items si
        JOIN car_details_view car ON si.car_id = car.id
        WHERE si.sale_id = s.id
    ) as sale_items
FROM sales s
JOIN customers c ON s.customer_id = c.id
LEFT JOIN users u ON s.salesperson_id = u.id;

-- Dashboard statistics view
CREATE OR REPLACE VIEW dashboard_stats_view AS
SELECT 
    -- Car statistics
    (SELECT COUNT(*) FROM cars WHERE is_active = true) as total_cars,
    (SELECT COUNT(*) FROM cars WHERE status = 'available' AND is_active = true) as available_cars,
    (SELECT COUNT(*) FROM cars WHERE status = 'rented' AND is_active = true) as rented_cars,
    (SELECT COUNT(*) FROM cars WHERE status = 'sold' AND is_active = true) as sold_cars,
    (SELECT COUNT(*) FROM cars WHERE status = 'maintenance' AND is_active = true) as maintenance_cars,
    
    -- Customer statistics
    (SELECT COUNT(*) FROM customers) as total_customers,
    (SELECT COUNT(*) FROM customers WHERE status = 'active') as active_customers,
    (SELECT COUNT(*) FROM customers WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as new_customers_month,
    
    -- Rental statistics
    (SELECT COUNT(*) FROM rentals WHERE status = 'active') as active_rentals,
    (SELECT COUNT(*) FROM rentals WHERE status = 'confirmed') as confirmed_rentals,
    (SELECT COUNT(*) FROM rentals WHERE return_date < CURRENT_DATE AND status = 'active') as overdue_rentals,
    (SELECT COUNT(*) FROM rentals WHERE return_date = CURRENT_DATE AND status = 'active') as due_today_rentals,
    
    -- Service statistics
    (SELECT COUNT(*) FROM service_appointments WHERE status = 'scheduled' AND appointment_date >= CURRENT_DATE) as scheduled_appointments,
    (SELECT COUNT(*) FROM service_appointments WHERE status = 'in_progress') as ongoing_services,
    (SELECT COUNT(*) FROM service_appointments WHERE appointment_date = CURRENT_DATE) as today_appointments,
    
    -- Financial statistics
    (SELECT COALESCE(SUM(final_amount), 0) FROM sales WHERE status = 'completed' AND sale_date >= DATE_TRUNC('month', CURRENT_DATE)) as monthly_sales_revenue,
    (SELECT COALESCE(SUM(total_amount), 0) FROM rentals WHERE status IN ('completed', 'active') AND pickup_date >= DATE_TRUNC('month', CURRENT_DATE)) as monthly_rental_revenue,
    (SELECT COALESCE(SUM(total_cost), 0) FROM service_appointments WHERE status = 'completed' AND appointment_date >= DATE_TRUNC('month', CURRENT_DATE)) as monthly_service_revenue,
    
    -- Recent activity counts
    (SELECT COUNT(*) FROM sales WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as sales_this_week,
    (SELECT COUNT(*) FROM rentals WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as rentals_this_week,
    (SELECT COUNT(*) FROM service_appointments WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as appointments_this_week;

-- Monthly revenue view
CREATE OR REPLACE VIEW monthly_revenue_view AS
SELECT 
    DATE_TRUNC('month', month_date) as month,
    COALESCE(sales_revenue, 0) as sales_revenue,
    COALESCE(rental_revenue, 0) as rental_revenue,
    COALESCE(service_revenue, 0) as service_revenue,
    COALESCE(sales_revenue, 0) + COALESCE(rental_revenue, 0) + COALESCE(service_revenue, 0) as total_revenue
FROM (
    SELECT generate_series(
        DATE_TRUNC('month', CURRENT_DATE - INTERVAL '11 months'),
        DATE_TRUNC('month', CURRENT_DATE),
        '1 month'::interval
    ) as month_date
) months
LEFT JOIN (
    SELECT 
        DATE_TRUNC('month', sale_date) as month,
        SUM(final_amount) as sales_revenue
    FROM sales 
    WHERE status = 'completed'
    GROUP BY DATE_TRUNC('month', sale_date)
) sales_data ON months.month_date = sales_data.month
LEFT JOIN (
    SELECT 
        DATE_TRUNC('month', pickup_date) as month,
        SUM(total_amount) as rental_revenue
    FROM rentals 
    WHERE status IN ('completed', 'active')
    GROUP BY DATE_TRUNC('month', pickup_date)
) rental_data ON months.month_date = rental_data.month
LEFT JOIN (
    SELECT 
        DATE_TRUNC('month', appointment_date) as month,
        SUM(total_cost) as service_revenue
    FROM service_appointments 
    WHERE status = 'completed'
    GROUP BY DATE_TRUNC('month', appointment_date)
) service_data ON months.month_date = service_data.month
ORDER BY month;

-- Car utilization view (for rental cars)
CREATE OR REPLACE VIEW car_utilization_view AS
SELECT 
    c.id,
    c.brand_name,
    c.model,
    c.year,
    c.license_plate,
    c.daily_rental_price,
    COALESCE(rental_stats.total_rental_days, 0) as total_rental_days,
    COALESCE(rental_stats.total_rental_revenue, 0) as total_rental_revenue,
    COALESCE(rental_stats.rental_count, 0) as rental_count,
    CASE 
        WHEN rental_stats.total_rental_days > 0 THEN
            ROUND((rental_stats.total_rental_days::DECIMAL / 365) * 100, 2)
        ELSE 0
    END as utilization_percentage,
    c.status,
    c.availability
FROM car_details_view c
LEFT JOIN (
    SELECT 
        car_id,
        COUNT(*) as rental_count,
        SUM(total_days) as total_rental_days,
        SUM(total_amount) as total_rental_revenue
    FROM rentals
    WHERE status IN ('completed', 'active')
    AND pickup_date >= CURRENT_DATE - INTERVAL '1 year'
    GROUP BY car_id
) rental_stats ON c.id = rental_stats.car_id
WHERE c.availability IN ('rental', 'both')
ORDER BY utilization_percentage DESC;

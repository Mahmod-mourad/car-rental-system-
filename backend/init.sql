-- Car Dealership Database Initialization Script

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS car_dealership;

-- Use the database
\c car_dealership;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_cars_status ON cars(status);
CREATE INDEX IF NOT EXISTS idx_cars_brand ON cars("brandId");
CREATE INDEX IF NOT EXISTS idx_cars_category ON cars("categoryId");
CREATE INDEX IF NOT EXISTS idx_cars_price ON cars(price);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_sales_date ON sales("saleDate");
CREATE INDEX IF NOT EXISTS idx_rentals_dates ON rentals("startDate", "endDate");

-- Insert default brands
INSERT INTO brands (id, name, country, "isActive", "createdAt", "updatedAt") VALUES
(uuid_generate_v4(), 'تويوتا', 'اليابان', true, NOW(), NOW()),
(uuid_generate_v4(), 'هوندا', 'اليابان', true, NOW(), NOW()),
(uuid_generate_v4(), 'نيسان', 'اليابان', true, NOW(), NOW()),
(uuid_generate_v4(), 'هيونداي', 'كوريا الجنوبية', true, NOW(), NOW()),
(uuid_generate_v4(), 'كيا', 'كوريا الجنوبية', true, NOW(), NOW()),
(uuid_generate_v4(), 'فورد', 'الولايات المتحدة', true, NOW(), NOW()),
(uuid_generate_v4(), 'شيفروليه', 'الولايات المتحدة', true, NOW(), NOW()),
(uuid_generate_v4(), 'بي إم دبليو', 'ألمانيا', true, NOW(), NOW()),
(uuid_generate_v4(), 'مرسيدس بنز', 'ألمانيا', true, NOW(), NOW()),
(uuid_generate_v4(), 'أودي', 'ألمانيا', true, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert default categories
INSERT INTO categories (id, name, description, "isActive", "createdAt", "updatedAt") VALUES
(uuid_generate_v4(), 'سيدان', 'سيارات السيدان العائلية', true, NOW(), NOW()),
(uuid_generate_v4(), 'هاتشباك', 'سيارات صغيرة اقتصادية', true, NOW(), NOW()),
(uuid_generate_v4(), 'SUV', 'سيارات الدفع الرباعي', true, NOW(), NOW()),
(uuid_generate_v4(), 'كوبيه', 'سيارات رياضية بابين', true, NOW(), NOW()),
(uuid_generate_v4(), 'بيك أب', 'شاحنات صغيرة', true, NOW(), NOW()),
(uuid_generate_v4(), 'فان', 'سيارات عائلية كبيرة', true, NOW(), NOW()),
(uuid_generate_v4(), 'كونفرتيبل', 'سيارات مكشوفة', true, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert default service types
INSERT INTO service_types (id, name, description, "estimatedDuration", "basePrice", "isActive", "createdAt", "updatedAt") VALUES
(uuid_generate_v4(), 'صيانة دورية', 'فحص وصيانة عامة للسيارة', 120, 200.00, true, NOW(), NOW()),
(uuid_generate_v4(), 'تغيير زيت', 'تغيير زيت المحرك والفلتر', 30, 80.00, true, NOW(), NOW()),
(uuid_generate_v4(), 'فحص شامل', 'فحص جميع أجزاء السيارة', 180, 150.00, true, NOW(), NOW()),
(uuid_generate_v4(), 'إصلاح المحرك', 'إصلاح وصيانة المحرك', 480, 800.00, true, NOW(), NOW()),
(uuid_generate_v4(), 'إصلاح الفرامل', 'فحص وإصلاح نظام الفرامل', 120, 300.00, true, NOW(), NOW()),
(uuid_generate_v4(), 'تكييف الهواء', 'صيانة وإصلاح المكيف', 90, 250.00, true, NOW(), NOW()),
(uuid_generate_v4(), 'إطارات', 'تغيير وصيانة الإطارات', 60, 400.00, true, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Create functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sales_updated_at BEFORE UPDATE ON sales FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rentals_updated_at BEFORE UPDATE ON rentals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create views for reporting
CREATE OR REPLACE VIEW monthly_sales_report AS
SELECT 
    DATE_TRUNC('month', "saleDate") as month,
    COUNT(*) as total_sales,
    SUM("totalAmount") as total_revenue,
    AVG("totalAmount") as average_sale
FROM sales 
WHERE "saleDate" >= DATE_TRUNC('year', CURRENT_DATE)
GROUP BY DATE_TRUNC('month', "saleDate")
ORDER BY month;

CREATE OR REPLACE VIEW car_inventory_status AS
SELECT 
    b.name as brand,
    c.name as category,
    car.status,
    COUNT(*) as count
FROM cars car
JOIN brands b ON car."brandId" = b.id
JOIN categories c ON car."categoryId" = c.id
GROUP BY b.name, c.name, car.status
ORDER BY b.name, c.name, car.status;

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;

-- Initial setup complete
SELECT 'Database initialized successfully' as status;

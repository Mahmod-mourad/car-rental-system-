-- Initial data for Car Dealership Management System

-- Insert default brands
INSERT INTO brands (name, country, logo_url) VALUES
('تويوتا', 'Japan', '/images/brands/toyota.png'),
('BMW', 'Germany', '/images/brands/bmw.png'),
('مرسيدس', 'Germany', '/images/brands/mercedes.png'),
('هوندا', 'Japan', '/images/brands/honda.png'),
('نيسان', 'Japan', '/images/brands/nissan.png'),
('هيونداي', 'South Korea', '/images/brands/hyundai.png'),
('أودي', 'Germany', '/images/brands/audi.png'),
('لكزس', 'Japan', '/images/brands/lexus.png'),
('فولكس واجن', 'Germany', '/images/brands/volkswagen.png'),
('كيا', 'South Korea', '/images/brands/kia.png');

-- Insert car categories
INSERT INTO categories (name, description) VALUES
('سيدان', 'سيارات سيدان عائلية مريحة'),
('SUV', 'سيارات رياضية متعددة الاستخدامات'),
('هاتشباك', 'سيارات صغيرة اقتصادية'),
('كوبيه', 'سيارات رياضية بمقعدين'),
('بيك أب', 'شاحنات صغيرة للعمل والترفيه'),
('فان', 'سيارات عائلية كبيرة'),
('كونفرتيبل', 'سيارات قابلة للطي'),
('كروس أوفر', 'سيارات متوسطة الحجم'),
('ميني فان', 'سيارات عائلية متوسطة'),
('رياضية', 'سيارات رياضية عالية الأداء');

-- Insert default admin user
INSERT INTO users (email, password_hash, first_name, last_name, role, permissions) VALUES
('admin@carshowroom.sa', '$2b$10$example_hash_here', 'مدير', 'النظام', 'admin', 
'{"users": "full", "cars": "full", "customers": "full", "sales": "full", "rentals": "full", "services": "full", "reports": "full"}');

-- Insert sample employee users
INSERT INTO users (email, password_hash, first_name, last_name, role, permissions) VALUES
('sales@carshowroom.sa', '$2b$10$example_hash_here', 'أحمد', 'المبيعات', 'sales_manager', 
'{"cars": "read", "customers": "full", "sales": "full", "rentals": "read"}'),
('rental@carshowroom.sa', '$2b$10$example_hash_here', 'محمد', 'التأجير', 'rental_manager', 
'{"cars": "read", "customers": "full", "rentals": "full", "services": "read"}'),
('service@carshowroom.sa', '$2b$10$example_hash_here', 'علي', 'الخدمات', 'service_manager', 
'{"cars": "read", "customers": "read", "services": "full", "appointments": "full"}');

-- Insert sample services
INSERT INTO services (name, category, description, base_price, estimated_duration, requires_appointment) VALUES
('تغيير زيت المحرك', 'maintenance', 'تغيير زيت المحرك والفلتر', 150.00, 60, true),
('فحص دوري شامل', 'inspection', 'فحص شامل لجميع أجزاء السيارة', 300.00, 120, true),
('إصلاح الفرامل', 'repair', 'فحص وإصلاح نظام الفرامل', 500.00, 180, true),
('تنظيف داخلي وخارجي', 'cleaning', 'تنظيف شامل للسيارة من الداخل والخارج', 80.00, 90, false),
('إصلاح التكييف', 'repair', 'فحص وإصلاح نظام التكييف', 400.00, 150, true),
('تغيير الإطارات', 'maintenance', 'تركيب إطارات جديدة', 800.00, 45, true),
('فحص ما قبل البيع', 'inspection', 'فحص شامل قبل بيع السيارة', 250.00, 90, true),
('صيانة دورية', 'maintenance', 'صيانة دورية حسب الكيلومترات', 200.00, 120, true),
('إصلاح المحرك', 'repair', 'تشخيص وإصلاح مشاكل المحرك', 1000.00, 300, true),
('تلميع وحماية الطلاء', 'cleaning', 'تلميع وحماية طلاء السيارة', 200.00, 180, false);

-- Insert sample technicians
INSERT INTO technicians (employee_id, first_name, last_name, phone, email, specializations, certification_level, years_experience, hourly_rate) VALUES
('TECH001', 'خالد', 'الفني', '+966501234567', 'khalid@carshowroom.sa', 
'["engine_repair", "transmission", "electrical"]', 'senior', 8, 75.00),
('TECH002', 'سعد', 'المحترف', '+966509876543', 'saad@carshowroom.sa', 
'["brakes", "suspension", "air_conditioning"]', 'intermediate', 5, 60.00),
('TECH003', 'عبدالله', 'الخبير', '+966512345678', 'abdullah@carshowroom.sa', 
'["bodywork", "painting", "detailing"]', 'expert', 12, 85.00),
('TECH004', 'فهد', 'المتخصص', '+966587654321', 'fahad@carshowroom.sa', 
'["diagnostics", "computer_systems", "hybrid"]', 'senior', 7, 80.00);

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, category) VALUES
('company_name', 'معرض السيارات المتميز', 'string', 'اسم الشركة', 'general'),
('company_phone', '+966 11 123 4567', 'string', 'رقم هاتف الشركة', 'contact'),
('company_email', 'info@carshowroom.sa', 'string', 'البريد الإلكتروني للشركة', 'contact'),
('company_address', 'طريق الملك فهد، الرياض، المملكة العربية السعودية', 'string', 'عنوان الشركة', 'contact'),
('default_currency', 'SAR', 'string', 'العملة الافتراضية', 'financial'),
('tax_rate', '15', 'number', 'معدل الضريبة المضافة (%)', 'financial'),
('rental_deposit_percentage', '20', 'number', 'نسبة التأمين من قيمة التأجير (%)', 'rental'),
('max_rental_days', '90', 'number', 'أقصى عدد أيام للتأجير', 'rental'),
('min_customer_age', '25', 'number', 'الحد الأدنى لعمر المستأجر', 'rental'),
('working_hours_start', '08:00', 'string', 'بداية ساعات العمل', 'general'),
('working_hours_end', '22:00', 'string', 'نهاية ساعات العمل', 'general'),
('weekend_days', '["friday"]', 'json', 'أيام نهاية الأسبوع', 'general'),
('notification_email', 'notifications@carshowroom.sa', 'string', 'بريد الإشعارات', 'notifications'),
('sms_enabled', 'true', 'boolean', 'تفعيل الرسائل النصية', 'notifications'),
('email_enabled', 'true', 'boolean', 'تفعيل البريد الإلكتروني', 'notifications');

-- Insert sample rental pricing
INSERT INTO rental_pricing (name, daily_rate, weekly_rate, monthly_rate, security_deposit, mileage_limit_daily, excess_mileage_rate) VALUES
('اقتصادية', 150.00, 900.00, 3500.00, 500.00, 300, 0.50),
('متوسطة', 250.00, 1500.00, 5500.00, 800.00, 300, 0.75),
('فاخرة', 400.00, 2400.00, 9000.00, 1500.00, 250, 1.00),
('رياضية', 600.00, 3600.00, 13500.00, 2500.00, 200, 1.50),
('SUV', 350.00, 2100.00, 7500.00, 1200.00, 300, 0.80);

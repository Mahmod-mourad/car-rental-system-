-- Car Dealership Management System Database Schema
-- Updated version with Rental, Services, and enhanced features

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- CORE TABLES
-- =============================================

-- Users table for system authentication and authorization
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL DEFAULT 'employee',
    permissions JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Brands/Categories for cars
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    logo_url VARCHAR(500),
    country VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Car categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- CARS MANAGEMENT
-- =============================================

-- Main cars table with enhanced fields
CREATE TABLE cars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID REFERENCES brands(id),
    category_id UUID REFERENCES categories(id),
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    color VARCHAR(50),
    vin VARCHAR(17) UNIQUE,
    license_plate VARCHAR(20),
    
    -- Engine and technical specs
    engine_type VARCHAR(100),
    engine_size VARCHAR(50),
    transmission VARCHAR(50),
    fuel_type VARCHAR(50),
    fuel_consumption DECIMAL(4,2),
    drivetrain VARCHAR(50),
    seats INTEGER,
    doors INTEGER,
    
    -- Performance specs
    horsepower INTEGER,
    torque INTEGER,
    top_speed INTEGER,
    acceleration DECIMAL(3,1), -- 0-100 km/h in seconds
    
    -- Condition and mileage
    condition VARCHAR(50) DEFAULT 'excellent',
    mileage INTEGER DEFAULT 0,
    
    -- Pricing
    purchase_price DECIMAL(12,2),
    sale_price DECIMAL(12,2),
    daily_rental_price DECIMAL(8,2),
    weekly_rental_price DECIMAL(8,2),
    monthly_rental_price DECIMAL(8,2),
    
    -- Availability and status
    availability VARCHAR(50) DEFAULT 'both', -- 'sale', 'rental', 'both', 'none'
    status VARCHAR(50) DEFAULT 'available', -- 'available', 'sold', 'rented', 'maintenance', 'reserved'
    
    -- Location and dealer info
    location VARCHAR(100),
    dealer_name VARCHAR(200),
    dealer_contact VARCHAR(500),
    
    -- Additional info
    description TEXT,
    features JSONB DEFAULT '[]',
    warranty_info TEXT,
    insurance_info TEXT,
    
    -- Metadata
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Car images table
CREATE TABLE car_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    image_type VARCHAR(50) DEFAULT 'exterior', -- 'exterior', 'interior', 'engine', 'other'
    is_primary BOOLEAN DEFAULT false,
    alt_text VARCHAR(200),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Car availability calendar for rentals
CREATE TABLE car_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'available', -- 'available', 'booked', 'maintenance', 'blocked'
    rental_id UUID, -- Will reference rentals table
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(car_id, date)
);

-- =============================================
-- CUSTOMERS MANAGEMENT
-- =============================================

-- Enhanced customers table
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Personal information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10),
    nationality VARCHAR(100),
    
    -- Address information
    address_line1 VARCHAR(200),
    address_line2 VARCHAR(200),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'Saudi Arabia',
    
    -- Driving license information
    license_number VARCHAR(50) UNIQUE,
    license_expiry DATE,
    license_country VARCHAR(100),
    license_class VARCHAR(50),
    
    -- Emergency contact
    emergency_contact_name VARCHAR(200),
    emergency_contact_phone VARCHAR(20),
    emergency_contact_relation VARCHAR(50),
    
    -- Customer preferences and history
    preferred_language VARCHAR(10) DEFAULT 'ar',
    communication_preferences JSONB DEFAULT '{}',
    customer_notes TEXT,
    credit_limit DECIMAL(12,2) DEFAULT 0,
    
    -- Rating and status
    customer_rating DECIMAL(2,1) DEFAULT 5.0,
    total_rentals INTEGER DEFAULT 0,
    total_purchases INTEGER DEFAULT 0,
    total_spent DECIMAL(12,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'inactive', 'blocked', 'vip'
    
    -- Metadata
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customer favorites (many-to-many relationship)
CREATE TABLE customer_favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(customer_id, car_id)
);

-- =============================================
-- SALES MANAGEMENT
-- =============================================

-- Sales transactions
CREATE TABLE sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sale_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id),
    salesperson_id UUID REFERENCES users(id),
    
    -- Sale details
    sale_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_amount DECIMAL(12,2) NOT NULL,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    final_amount DECIMAL(12,2) NOT NULL,
    
    -- Payment information
    payment_method VARCHAR(50), -- 'cash', 'card', 'bank_transfer', 'financing'
    payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid', 'partial', 'refunded'
    payment_terms TEXT,
    
    -- Financing details (if applicable)
    financing_company VARCHAR(200),
    down_payment DECIMAL(12,2),
    loan_amount DECIMAL(12,2),
    monthly_payment DECIMAL(8,2),
    loan_term_months INTEGER,
    
    -- Additional information
    notes TEXT,
    warranty_info TEXT,
    delivery_date DATE,
    delivery_address TEXT,
    
    -- Status and metadata
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'cancelled', 'refunded'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sale items (cars sold in each transaction)
CREATE TABLE sale_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sale_id UUID REFERENCES sales(id) ON DELETE CASCADE,
    car_id UUID REFERENCES cars(id),
    
    -- Item details
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(12,2) NOT NULL,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    total_price DECIMAL(12,2) NOT NULL,
    
    -- Additional services/accessories
    accessories JSONB DEFAULT '[]',
    extended_warranty BOOLEAN DEFAULT false,
    insurance_package VARCHAR(100),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- RENTAL MANAGEMENT
-- =============================================

-- Rental pricing templates
CREATE TABLE rental_pricing (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    car_category_id UUID REFERENCES categories(id),
    
    -- Pricing structure
    daily_rate DECIMAL(8,2),
    weekly_rate DECIMAL(8,2),
    monthly_rate DECIMAL(8,2),
    weekend_rate DECIMAL(8,2),
    holiday_rate DECIMAL(8,2),
    
    -- Additional charges
    security_deposit DECIMAL(8,2),
    mileage_limit_daily INTEGER DEFAULT 300,
    excess_mileage_rate DECIMAL(5,2),
    fuel_policy VARCHAR(50) DEFAULT 'full_to_full',
    
    -- Validity
    valid_from DATE,
    valid_to DATE,
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Main rentals table
CREATE TABLE rentals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rental_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id),
    car_id UUID REFERENCES cars(id),
    agent_id UUID REFERENCES users(id),
    
    -- Rental period
    pickup_date DATE NOT NULL,
    return_date DATE NOT NULL,
    actual_return_date DATE,
    pickup_time TIME,
    return_time TIME,
    
    -- Location details
    pickup_location VARCHAR(200),
    return_location VARCHAR(200),
    pickup_address TEXT,
    return_address TEXT,
    
    -- Pricing details
    rental_type VARCHAR(50), -- 'daily', 'weekly', 'monthly'
    daily_rate DECIMAL(8,2),
    total_days INTEGER,
    base_amount DECIMAL(12,2),
    additional_services_amount DECIMAL(12,2) DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    security_deposit DECIMAL(8,2),
    total_amount DECIMAL(12,2),
    
    -- Mileage tracking
    pickup_mileage INTEGER,
    return_mileage INTEGER,
    mileage_limit INTEGER,
    excess_mileage INTEGER DEFAULT 0,
    excess_mileage_charge DECIMAL(8,2) DEFAULT 0,
    
    -- Fuel information
    fuel_level_pickup VARCHAR(20), -- 'empty', 'quarter', 'half', 'three_quarters', 'full'
    fuel_level_return VARCHAR(20),
    fuel_charge DECIMAL(8,2) DEFAULT 0,
    
    -- Additional information
    special_instructions TEXT,
    terms_accepted BOOLEAN DEFAULT false,
    contract_signed BOOLEAN DEFAULT false,
    
    -- Status tracking
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'active', 'completed', 'cancelled', 'overdue'
    payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid', 'partial', 'refunded'
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rental additional services/items
CREATE TABLE rental_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rental_id UUID REFERENCES rentals(id) ON DELETE CASCADE,
    
    -- Service details
    item_type VARCHAR(50), -- 'gps', 'child_seat', 'driver', 'insurance', 'equipment'
    item_name VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Pricing
    unit_price DECIMAL(8,2),
    quantity INTEGER DEFAULT 1,
    total_price DECIMAL(8,2),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rental payments tracking
CREATE TABLE rental_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rental_id UUID REFERENCES rentals(id) ON DELETE CASCADE,
    
    -- Payment details
    payment_date DATE DEFAULT CURRENT_DATE,
    amount DECIMAL(12,2) NOT NULL,
    payment_type VARCHAR(50), -- 'deposit', 'rental_fee', 'additional_charges', 'refund'
    payment_method VARCHAR(50), -- 'cash', 'card', 'bank_transfer'
    
    -- Transaction information
    transaction_id VARCHAR(100),
    reference_number VARCHAR(100),
    payment_gateway VARCHAR(50),
    
    -- Status
    status VARCHAR(50) DEFAULT 'completed', -- 'pending', 'completed', 'failed', 'refunded'
    notes TEXT,
    
    -- Metadata
    processed_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SERVICES MANAGEMENT
-- =============================================

-- Service types and categories
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50), -- 'maintenance', 'repair', 'inspection', 'cleaning', 'customization'
    description TEXT,
    
    -- Pricing and duration
    base_price DECIMAL(8,2),
    estimated_duration INTEGER, -- in minutes
    
    -- Requirements
    requires_appointment BOOLEAN DEFAULT true,
    requires_car_drop_off BOOLEAN DEFAULT false,
    
    -- Availability
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service pricing based on car category or specific conditions
CREATE TABLE service_pricing (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    car_category_id UUID REFERENCES categories(id),
    
    -- Pricing details
    price DECIMAL(8,2) NOT NULL,
    labor_hours DECIMAL(4,2),
    parts_cost DECIMAL(8,2) DEFAULT 0,
    
    -- Validity
    valid_from DATE,
    valid_to DATE,
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Technicians information
CREATE TABLE technicians (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id VARCHAR(50) UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    
    -- Professional information
    specializations JSONB DEFAULT '[]', -- Array of specialization areas
    certification_level VARCHAR(50),
    years_experience INTEGER,
    hourly_rate DECIMAL(6,2),
    
    -- Availability
    working_hours JSONB DEFAULT '{}', -- Weekly schedule
    is_available BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    
    -- Metadata
    hired_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service appointments
CREATE TABLE service_appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id),
    car_id UUID REFERENCES cars(id),
    service_id UUID REFERENCES services(id),
    technician_id UUID REFERENCES technicians(id),
    
    -- Appointment details
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    estimated_completion TIMESTAMP,
    actual_start_time TIMESTAMP,
    actual_completion_time TIMESTAMP,
    
    -- Service details
    problem_description TEXT,
    diagnosis TEXT,
    work_performed TEXT,
    parts_used JSONB DEFAULT '[]',
    
    -- Pricing
    estimated_cost DECIMAL(8,2),
    labor_cost DECIMAL(8,2),
    parts_cost DECIMAL(8,2),
    additional_charges DECIMAL(8,2) DEFAULT 0,
    discount_amount DECIMAL(8,2) DEFAULT 0,
    total_cost DECIMAL(8,2),
    
    -- Status tracking
    status VARCHAR(50) DEFAULT 'scheduled', -- 'scheduled', 'in_progress', 'completed', 'cancelled', 'no_show'
    priority VARCHAR(20) DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
    
    -- Additional information
    customer_notes TEXT,
    internal_notes TEXT,
    warranty_work BOOLEAN DEFAULT false,
    follow_up_required BOOLEAN DEFAULT false,
    follow_up_date DATE,
    
    -- Metadata
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service items/tasks within an appointment
CREATE TABLE service_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID REFERENCES service_appointments(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id),
    
    -- Item details
    description TEXT,
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(8,2),
    total_price DECIMAL(8,2),
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'cancelled'
    completed_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service payments
CREATE TABLE service_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID REFERENCES service_appointments(id) ON DELETE CASCADE,
    
    -- Payment details
    payment_date DATE DEFAULT CURRENT_DATE,
    amount DECIMAL(8,2) NOT NULL,
    payment_method VARCHAR(50), -- 'cash', 'card', 'bank_transfer', 'warranty'
    
    -- Transaction information
    transaction_id VARCHAR(100),
    reference_number VARCHAR(100),
    
    -- Status
    status VARCHAR(50) DEFAULT 'completed', -- 'pending', 'completed', 'failed', 'refunded'
    notes TEXT,
    
    -- Metadata
    processed_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- SYSTEM CONFIGURATION
-- =============================================

-- System settings
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(50) DEFAULT 'string', -- 'string', 'number', 'boolean', 'json'
    description TEXT,
    category VARCHAR(50),
    is_public BOOLEAN DEFAULT false,
    updated_by UUID REFERENCES users(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit log for tracking changes
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    action VARCHAR(20) NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
    old_values JSONB,
    new_values JSONB,
    changed_by UUID REFERENCES users(id),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Cars table indexes
CREATE INDEX idx_cars_brand_id ON cars(brand_id);
CREATE INDEX idx_cars_category_id ON cars(category_id);
CREATE INDEX idx_cars_status ON cars(status);
CREATE INDEX idx_cars_availability ON cars(availability);
CREATE INDEX idx_cars_year ON cars(year);
CREATE INDEX idx_cars_price_range ON cars(sale_price);
CREATE INDEX idx_cars_rental_price ON cars(daily_rental_price);
CREATE INDEX idx_cars_location ON cars(location);
CREATE INDEX idx_cars_featured ON cars(is_featured) WHERE is_featured = true;

-- Customers table indexes
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_license ON customers(license_number);
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_customers_city ON customers(city);

-- Rentals table indexes
CREATE INDEX idx_rentals_customer_id ON rentals(customer_id);
CREATE INDEX idx_rentals_car_id ON rentals(car_id);
CREATE INDEX idx_rentals_status ON rentals(status);
CREATE INDEX idx_rentals_pickup_date ON rentals(pickup_date);
CREATE INDEX idx_rentals_return_date ON rentals(return_date);
CREATE INDEX idx_rentals_dates ON rentals(pickup_date, return_date);

-- Sales table indexes
CREATE INDEX idx_sales_customer_id ON sales(customer_id);
CREATE INDEX idx_sales_salesperson_id ON sales(salesperson_id);
CREATE INDEX idx_sales_date ON sales(sale_date);
CREATE INDEX idx_sales_status ON sales(status);

-- Service appointments indexes
CREATE INDEX idx_appointments_customer_id ON service_appointments(customer_id);
CREATE INDEX idx_appointments_car_id ON service_appointments(car_id);
CREATE INDEX idx_appointments_technician_id ON service_appointments(technician_id);
CREATE INDEX idx_appointments_date ON service_appointments(appointment_date);
CREATE INDEX idx_appointments_status ON service_appointments(status);

-- Car availability indexes
CREATE INDEX idx_car_availability_car_date ON car_availability(car_id, date);
CREATE INDEX idx_car_availability_date ON car_availability(date);
CREATE INDEX idx_car_availability_status ON car_availability(status);

-- Audit log indexes
CREATE INDEX idx_audit_log_table_record ON audit_log(table_name, record_id);
CREATE INDEX idx_audit_log_changed_at ON audit_log(changed_at);
CREATE INDEX idx_audit_log_changed_by ON audit_log(changed_by);

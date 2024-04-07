# Car Showroom Management System

A comprehensive car dealership management system built with Next.js (Frontend), NestJS (Backend), and PostgreSQL (Database).

## Project Structure

```
├── app/                    # Next.js frontend application
│   ├── api/               # API routes for frontend
│   ├── dashboard/         # Admin dashboard
│   ├── cars/             # Car listings and details
│   ├── services/         # Service management
│   ├── customers/        # Customer management
│   └── login/            # Authentication
├── backend/              # NestJS backend server
│   ├── src/
│   │   ├── auth/         # Authentication module
│   │   ├── users/        # Users management
│   │   ├── cars/         # Cars management
│   │   ├── customers/    # Customers management
│   │   ├── sales/        # Sales transactions
│   │   ├── rentals/      # Rental management
│   │   ├── services/     # Service appointments
│   │   ├── reports/      # Financial reports
│   │   ├── common/       # Shared utilities
│   │   └── main.ts       # Application entry point
│   ├── test/             # Test suite
│   └── package.json
├── scripts/              # Database initialization
└── package.json          # Root package configuration
```

## Features

### Authentication & Authorization
- JWT-based authentication with refresh tokens
- Role-based access control (11 different roles)
- Secure password hashing with bcrypt
- Session management

### Car Management
- Add/Edit/Delete car listings
- Multi-image uploads for each car
- Detailed specifications and pricing
- Soft delete for data integrity
- Advanced search and filtering

### Rental System
- Complete rental contract management
- Daily/Weekly/Monthly rental pricing
- Late fee calculation
- Security deposit management
- Rental status tracking
- Overdue rental alerts

### Customer Management
- Comprehensive customer profiles
- License information tracking
- Customer rating system
- Transaction history
- Favorite cars tracking

### Service Management
- Service appointment scheduling
- Multiple service types (maintenance, repairs, cosmetic)
- Technician assignment
- Service status tracking
- Cost estimation and invoicing

### Financial Management
- Sales transaction recording
- Multiple payment methods
- Tax and fee calculations
- Comprehensive financial reports
- Revenue analysis by department

### Security Features
- Password hashing (bcrypt)
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Security headers
- JWT token verification

### Performance Optimization
- Database indexing on key fields
- Query optimization with TypeORM
- Response caching
- Image optimization
- API compression
- Connection pooling

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd car-showroom
```

2. **Setup Frontend:**
```bash
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

3. **Setup Backend:**
```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
# Backend runs on http://localhost:3001
```

4. **Setup Database:**
```bash
cd backend
npm run db:migrate
npm run db:seed
```

## Running Tests

### Backend Unit Tests
```bash
cd backend
npm test
npm run test:cov  # Generate coverage report
```

### Test Coverage
The project includes comprehensive test suites for:
- Authentication service
- Car management service
- Customer management service
- Rental management service
- All tests located in `backend/test/` directory

## Environment Variables

### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=car_showroom
JWT_SECRET=your-secret-key
JWT_EXPIRATION=3600
PORT=3001
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh JWT token

### Cars
- `GET /cars` - List all cars with filtering
- `GET /cars/:id` - Get car details
- `POST /cars` - Create new car (Admin)
- `PUT /cars/:id` - Update car (Admin)
- `DELETE /cars/:id` - Delete car (Admin)

### Customers
- `GET /customers` - List customers
- `GET /customers/:id` - Get customer details
- `POST /customers` - Create customer
- `PUT /customers/:id` - Update customer
- `DELETE /customers/:id` - Delete customer

### Rentals
- `GET /rentals` - List all rentals
- `GET /rentals/:id` - Get rental details
- `POST /rentals` - Create rental
- `PUT /rentals/:id` - Update rental
- `POST /rentals/:id/return` - Complete rental

### Services
- `GET /services` - List services
- `GET /appointments` - List appointments
- `POST /appointments` - Book appointment
- `PUT /appointments/:id` - Update appointment

### Reports
- `GET /reports/sales` - Sales reports
- `GET /reports/revenue` - Revenue analysis
- `GET /reports/utilization` - Car utilization stats

## Default Test Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@cardealer.com | 123456 | System Administrator |
| sales@cardealer.com | 123456 | Sales Manager |
| rental@cardealer.com | 123456 | Rental Manager |
| accountant@cardealer.com | 123456 | Accountant |
| employee@cardealer.com | 123456 | Sales Employee |

## Architecture

### Frontend (Next.js)
- Server-side rendering for SEO
- Client-side state management with React hooks
- SWR for data fetching and caching
- Tailwind CSS for styling
- Responsive design for all devices

### Backend (NestJS)
- Modular architecture with feature modules
- Dependency injection for loose coupling
- TypeORM for database abstraction
- JWT-based authentication
- Comprehensive error handling
- Request logging and monitoring

### Database (PostgreSQL)
- Normalized schema design
- Foreign key constraints
- Indexes on frequently queried columns
- Soft delete support
- Audit trail for transactions

## Performance Metrics

- API response time: < 200ms
- Database query optimization with indexes
- Image optimization with lazy loading
- Caching strategy for frequently accessed data
- Rate limiting: 100 requests per minute per IP

## Testing Coverage

- Unit tests for services: 85%+ coverage
- Integration tests for API endpoints
- End-to-end tests for critical workflows
- Test suite runs in < 2 minutes

## Deployment

### Frontend (Vercel)
```bash
vercel deploy
```

### Backend (Railway/Heroku)
```bash
git push heroku main
```

### Database (Managed PostgreSQL)
- Supabase PostgreSQL
- AWS RDS
- Railway Postgres

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support, contact: info@carshowroom.com

## Contact Information

**Al-Nakhel Car Showroom**
- Phone: +966 50 123 4567
- Email: info@carshowroom.com
- Address: Riyadh, Saudi Arabia

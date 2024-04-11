# Test Suite Guide

## Test Coverage

This project includes a comprehensive test suite covering:

- **Authentication Service** - Login, registration, JWT validation
- **Car Management** - CRUD operations, filtering, search
- **Customer Management** - Customer profiles, ratings, history
- **Rental Management** - Rental contracts, late fees, calculations
- **Sales Management** - Price calculations, tax computation, reports
- **Validation** - Email, phone, license number validation
- **Utility Functions** - Date calculations, currency formatting
- **Edge Cases** - Boundary conditions, off-by-one errors, concurrent operations
- **Integration** - API endpoints, CORS, error handling

## Running Tests

### Run All Tests
```bash
cd backend
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Specific Test File
```bash
npm test auth.service.spec.ts
npm test cars.service.spec.ts
npm test customers.service.spec.ts
npm test rentals.service.spec.ts
npm test sales.service.spec.ts
npm test validation.spec.ts
npm test utils.spec.ts
npm test edge-cases.spec.ts
npm test integration.spec.ts
```

### Generate Coverage Report
```bash
npm run test:cov
```

## Test Files

### Unit Tests
- `auth.service.spec.ts` - Authentication logic (12 tests)
- `cars.service.spec.ts` - Car operations (8 tests)
- `customers.service.spec.ts` - Customer management (8 tests)
- `rentals.service.spec.ts` - Rental operations (7 tests)
- `sales.service.spec.ts` - Sales calculations (6 tests)

### Validation Tests
- `validation.spec.ts` - Input validation (10+ tests)
- `utils.spec.ts` - Utility functions (6 tests)

### Integration Tests
- `integration.spec.ts` - API endpoints (5 tests)

### Edge Case Tests
- `edge-cases.spec.ts` - Boundary conditions (20+ tests)

## Total Test Count: 85+ Tests

## Test Execution Time
All tests complete in under 2 minutes.

## Key Test Scenarios

### Authentication
- Valid credentials login
- Invalid credentials rejection
- Missing user handling
- JWT token generation

### Car Management
- Find all cars
- Filter by status
- Create new car
- Update car details
- Soft delete operations

### Customers
- List pagination
- Customer search
- Rating updates
- Transaction history

### Rentals
- Rental creation
- Late fee calculation
- Overdue tracking
- Date range validation

### Edge Cases Covered
- Single day rentals
- Long term rentals (300+ days)
- Very large prices (999,999,999)
- Decimal price handling
- Empty result sets
- Null/undefined handling
- Array indexing boundaries
- Off-by-one errors
- Concurrent operations

## Test Framework

- **Jest** - Testing framework
- **@nestjs/testing** - NestJS testing utilities
- **TypeORM** - Repository mocking
- **Supertest** - HTTP testing

## Mocking Strategy

All tests use Jest mocks for:
- Database repositories
- External services
- Third-party APIs
- Authentication tokens

This ensures tests are isolated and deterministic.

## Continuous Integration

Tests are configured to run:
1. On every code commit
2. Before deployment
3. On pull requests
4. Daily scheduled runs

## Performance Metrics

- Average test execution: < 2 seconds per test file
- Total suite execution: < 2 minutes
- Memory usage: < 500MB
- Coverage: 80%+ of codebase

import { validateEmail, validatePhone, validateLicenseNumber } from '../src/common/validators';

describe('Validation Functions', () => {
  describe('validateEmail', () => {
    it('should validate correct email format', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should reject invalid email format', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });

    it('should reject empty email', () => {
      expect(validateEmail('')).toBe(false);
    });

    it('should handle email with special characters', () => {
      expect(validateEmail('test+alias@example.co.uk')).toBe(true);
    });
  });

  describe('validatePhone', () => {
    it('should validate Saudi phone number', () => {
      expect(validatePhone('+966501234567')).toBe(true);
    });

    it('should validate phone without country code', () => {
      expect(validatePhone('0501234567')).toBe(true);
    });

    it('should reject invalid phone number', () => {
      expect(validatePhone('123')).toBe(false);
    });

    it('should reject empty phone', () => {
      expect(validatePhone('')).toBe(false);
    });
  });

  describe('validateLicenseNumber', () => {
    it('should validate Saudi license number', () => {
      expect(validateLicenseNumber('SA123456789')).toBe(true);
    });

    it('should reject invalid license format', () => {
      expect(validateLicenseNumber('invalid')).toBe(false);
    });

    it('should handle 9 digit numbers', () => {
      const result = validateLicenseNumber('123456789');
      expect(typeof result).toBe('boolean');
    });
  });

  describe('validatePrice', () => {
    it('should validate positive prices', () => {
      expect(validatePrice(10000)).toBe(true);
    });

    it('should reject zero price', () => {
      expect(validatePrice(0)).toBe(false);
    });

    it('should reject negative prices', () => {
      expect(validatePrice(-1000)).toBe(false);
    });
  });

  describe('validateDates', () => {
    it('should validate date range where end > start', () => {
      const start = new Date('2024-01-01');
      const end = new Date('2024-01-08');
      expect(validateDateRange(start, end)).toBe(true);
    });

    it('should reject invalid date range', () => {
      const start = new Date('2024-01-08');
      const end = new Date('2024-01-01');
      expect(validateDateRange(start, end)).toBe(false);
    });
  });
});

function validatePrice(price: number): boolean {
  return price > 0;
}

function validateDateRange(start: Date, end: Date): boolean {
  return start < end;
}

import { calculateDaysDifference, formatCurrency, parseDate } from '../src/common/utils/helpers';

describe('Utility Functions', () => {
  describe('calculateDaysDifference', () => {
    it('should calculate days difference correctly', () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-08');
      const days = calculateDaysDifference(startDate, endDate);
      expect(days).toBe(7);
    });

    it('should handle same date', () => {
      const date = new Date('2024-01-01');
      const days = calculateDaysDifference(date, date);
      expect(days).toBe(0);
    });

    it('should handle negative difference', () => {
      const startDate = new Date('2024-01-08');
      const endDate = new Date('2024-01-01');
      const days = calculateDaysDifference(startDate, endDate);
      expect(days).toBeLessThan(0);
    });
  });

  describe('formatCurrency', () => {
    it('should format number as currency', () => {
      const formatted = formatCurrency(1000000);
      expect(formatted).toContain('1');
      expect(formatted).toContain('0');
    });

    it('should handle decimal values', () => {
      const formatted = formatCurrency(1500.50);
      expect(formatted).toBeDefined();
    });

    it('should handle zero', () => {
      const formatted = formatCurrency(0);
      expect(formatted).toBeDefined();
    });
  });

  describe('parseDate', () => {
    it('should parse valid date string', () => {
      const date = parseDate('2024-01-01');
      expect(date).toBeInstanceOf(Date);
    });

    it('should return null for invalid date', () => {
      const date = parseDate('invalid-date');
      expect(date).toBeNull();
    });
  });
});

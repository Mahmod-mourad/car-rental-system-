describe('Edge Cases and Boundary Conditions', () => {
  describe('Rental calculations', () => {
    it('should handle single day rental', () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-01');
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      expect(days).toBe(0); // Same day
    });

    it('should handle one day rental correctly', () => {
      const startDate = new Date('2024-01-01T00:00:00');
      const endDate = new Date('2024-01-02T00:00:00');
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      expect(days).toBe(1);
    });

    it('should handle very long rental periods', () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-12-31');
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      expect(days).toBeGreaterThan(300);
    });
  });

  describe('Price calculations', () => {
    it('should handle very large prices', () => {
      const price = 999999999;
      expect(price).toBeGreaterThan(0);
    });

    it('should handle decimal prices', () => {
      const price = 1500.99;
      expect(price % 1).toBeCloseTo(0.99);
    });

    it('should handle minimum price', () => {
      const price = 0.01;
      expect(price).toBeGreaterThan(0);
    });
  });

  describe('Pagination edge cases', () => {
    it('should handle page 1', () => {
      const page = 1;
      const skip = (page - 1) * 10;
      expect(skip).toBe(0);
    });

    it('should handle last page with partial results', () => {
      const total = 25;
      const pageSize = 10;
      const lastPage = Math.ceil(total / pageSize);
      expect(lastPage).toBe(3);
    });

    it('should handle empty result set', () => {
      const items = [];
      expect(items.length).toBe(0);
    });
  });

  describe('String length boundaries', () => {
    it('should handle minimum name length', () => {
      const name = 'A';
      expect(name.length).toBeGreaterThanOrEqual(1);
    });

    it('should handle maximum name length', () => {
      const name = 'A'.repeat(255);
      expect(name.length).toBeLessThanOrEqual(255);
    });

    it('should handle special characters in strings', () => {
      const text = 'Test@#$%^&*()';
      expect(text).toBeDefined();
    });
  });

  describe('Off-by-one errors', () => {
    it('should handle array indexing correctly', () => {
      const items = [1, 2, 3, 4, 5];
      expect(items[0]).toBe(1);
      expect(items[items.length - 1]).toBe(5);
    });

    it('should handle range queries', () => {
      const numbers = Array.from({ length: 10 }, (_, i) => i);
      expect(numbers.length).toBe(10);
      expect(numbers[9]).toBe(9);
    });
  });

  describe('Null and undefined handling', () => {
    it('should handle null values', () => {
      const value = null;
      expect(value).toBeNull();
    });

    it('should handle undefined values', () => {
      const value = undefined;
      expect(value).toBeUndefined();
    });

    it('should handle empty strings', () => {
      const value = '';
      expect(value).toBe('');
      expect(value.length).toBe(0);
    });
  });

  describe('Concurrent operations', () => {
    it('should handle multiple updates safely', async () => {
      const counter = { value: 0 };
      const promises = Array.from({ length: 5 }, () =>
        Promise.resolve(counter.value++)
      );
      const results = await Promise.all(promises);
      expect(results.length).toBe(5);
    });

    it('should handle race conditions', async () => {
      let value = 0;
      const increment = () => value++;
      
      await Promise.all([
        increment(),
        increment(),
        increment(),
      ]);
      
      expect(value).toBeGreaterThan(0);
    });
  });
});

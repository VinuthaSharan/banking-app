import { calculateBlockedUntilDate, isUserBlocked, getRemainingBlockTime } from '../../src/utils/dateUtils';

describe('Date Utils', () => {
  describe('calculateBlockedUntilDate', () => {
    it('should block for 2 business days excluding weekends', () => {
      // Mock current date as Friday
      const mockDate = new Date('2024-01-05'); // Friday
      jest.spyOn(global, 'Date').mockImplementation(
        (date?: any) => new Date(date || mockDate) as any
      );

      const blockedUntil = calculateBlockedUntilDate();
      
      // Friday -> Saturday (skip) -> Sunday (skip) -> Monday (1 day) -> Tuesday (2 days)
      expect(blockedUntil.getDay()).not.toBe(0); // Not Sunday
      expect(blockedUntil.getDay()).not.toBe(6); // Not Saturday

      jest.restoreAllMocks();
    });

    it('should calculate correct blocked date for Monday', () => {
      const mockDate = new Date('2024-01-08'); // Monday
      jest.spyOn(global, 'Date').mockImplementation(
        (date?: any) => new Date(date || mockDate) as any
      );

      const blockedUntil = calculateBlockedUntilDate();
      
      // Monday -> Tuesday (1 day) -> Wednesday (2 days)
      expect(blockedUntil.getDay()).not.toBe(0); // Not Sunday
      expect(blockedUntil.getDay()).not.toBe(6); // Not Saturday

      jest.restoreAllMocks();
    });
  });

  describe('isUserBlocked', () => {
    it('should return true if user is blocked', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);
      
      const isBlocked = isUserBlocked(futureDate.toISOString());
      expect(isBlocked).toBe(true);
    });

    it('should return false if blocking period has passed', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 5);
      
      const isBlocked = isUserBlocked(pastDate.toISOString());
      expect(isBlocked).toBe(false);
    });
  });

  describe('getRemainingBlockTime', () => {
    it('should return remaining days when blocked', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 3);
      
      const remaining = getRemainingBlockTime(futureDate.toISOString());
      expect(remaining).toContain('day(s)');
    });

    it('should return no restriction message when not blocked', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      
      const remaining = getRemainingBlockTime(pastDate.toISOString());
      expect(remaining).toBe('No restriction');
    });
  });
});

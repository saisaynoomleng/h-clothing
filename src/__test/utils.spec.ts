import { formatDate, formatPrice, formatTitle } from '@/lib/utils';
import { describe, it, expect } from 'vitest';

describe('test util functions', () => {
  it('should capitalize every word in the sentence', () => {
    expect(formatTitle('hi hi')).toBe('Hi Hi');
  });

  it('should generate USD from number', () => {
    expect(formatPrice(20)).toBe('$20.00');
  });

  it('should generate US format Date', () => {
    expect(formatDate('2025-12-12')).toBe('Dec 11, 2025');
    expect(formatDate('1995, 12, 12')).toBe('Dec 12, 1995');
  });
});

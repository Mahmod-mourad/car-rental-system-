export function calculateDaysDifference(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'SAR' });
}

export function parseDate(dateStr: string): Date | null {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return null;
  return date;
}

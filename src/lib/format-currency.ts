const currencyFormatter = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export function formatCurrency(amount: number | undefined): string {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) return '';
  return currencyFormatter.format(amount);
}

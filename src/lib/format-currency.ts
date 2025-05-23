const currencyFormatter = new Intl.NumberFormat('jp', {
  style: 'currency',
  currency: 'JPY',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

export function formatCurrency(amount: number | undefined): string {
  if (!Number.isFinite(amount)) return '';
  return currencyFormatter.format(amount ?? 'Infinity');
}

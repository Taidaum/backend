export function formatCurrency(value: number, currency: string, locale = 'pt-br') {
  return value.toLocaleString(locale, {
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

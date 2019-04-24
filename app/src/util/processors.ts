/* eslint-disable @typescript-eslint/no-explicit-any */
export function toCurrency(value: any): string {
  const result = parseFloat(value).toFixed(2);
  return `R$ ${result}`;
}

export function toLocaleDate(text: string, locale?: string): string {
  const dateObject = new Date(text);
  const toLocale = locale || "pt-br";
  const date = dateObject.toLocaleDateString(toLocale);
  const time = dateObject.toLocaleTimeString(toLocale);
  return [date, time].join(" ");
}

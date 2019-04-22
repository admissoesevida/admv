export default function getValue(
  obj: Record<string, any>,
  query: string
): string {
  const [prop, ...others] = query.split(".");

  let value = obj[prop];

  if (value && others && typeof value === "object") {
    value = getValue(value, others.join("."));
  }

  return value;
}

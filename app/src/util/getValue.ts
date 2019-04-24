/* eslint-disable @typescript-eslint/no-explicit-any */
export default function getValue(
  obj: Record<string, any>,
  query: string,
  processor?: Function
): any {
  const [prop, ...others] = query.split(".");

  let value = obj[prop];

  if (value && others && typeof value === "object") {
    value = getValue(value, others.join("."));
  }

  if (processor) {
    value = processor(value);
  }

  return value;
}

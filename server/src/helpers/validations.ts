export function isNumeric(value: any): boolean {
  return /^-?\d+(\.\d+)?$/.test(value);
}

export function isString(value: any): boolean {
  if (typeof value === "string" && value !== "") return true;

  return false;
}

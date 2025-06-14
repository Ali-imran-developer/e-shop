export function ensureArray(input: any): any[] {
  return Array.isArray(input) ? input : [];
}

export const ensureObject = (input: any): any => {
  return typeof input === "object" ? input : {};
};

export const trimObjectValues = <T extends Record<string, any>>(data: T): T => {
  if (!data || typeof data !== "object") return data;

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim() : value,
    ])
  ) as T;
};

export const sanitizePhone = (phone: string) => {
  if (phone?.startsWith("+92")) return "0" + phone?.slice(3);
  if (phone?.startsWith("92")) return "0" + phone?.slice(2);
  return phone;
};

export const formatPrice = (value: string | number) => {
  const numberValue =
    typeof value === "string" ? value?.replace(/,/g, "") : value;
  return Number(numberValue)?.toLocaleString("en-US");
};

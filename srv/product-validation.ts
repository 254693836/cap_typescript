export type ProductInput = {
  name?: unknown;
  price?: unknown;
  stock?: unknown;
};

export type ValidationError = {
  field: 'name' | 'price' | 'stock';
  message: string;
};

const isNonNegativeNumber = (value: unknown): boolean =>
  value !== '' && value !== null && value !== undefined && Number.isFinite(Number(value)) && Number(value) >= 0;

export function validateProductInput(data: ProductInput, isCreate: boolean): ValidationError | undefined {
  if (isCreate && (typeof data.name !== 'string' || data.name.trim().length === 0)) {
    return { field: 'name', message: '商品名は必須です' };
  }
  if (data.name !== undefined && (typeof data.name !== 'string' || data.name.trim().length === 0)) {
    return { field: 'name', message: '商品名を入力してください' };
  }
  if (data.price !== undefined && !isNonNegativeNumber(data.price)) {
    return { field: 'price', message: '価格は 0 以上の数値を入力してください' };
  }
  if (data.stock !== undefined && (!isNonNegativeNumber(data.stock) || !Number.isInteger(Number(data.stock)))) {
    return { field: 'stock', message: '在庫は 0 以上の整数を入力してください' };
  }
  return undefined;
}

export function isUuid(value: unknown): value is string {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

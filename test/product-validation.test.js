const assert = require('node:assert/strict');
const test = require('node:test');
const { isUuid, validateProductInput } = require('../srv/gen/product-validation.js');

test('新規登録では商品名が必須', () => {
  assert.deepEqual(validateProductInput({ price: 100, stock: 1 }, true), {
    field: 'name', message: '商品名は必須です'
  });
});

test('価格と在庫の値を実行時に検証する', () => {
  assert.deepEqual(validateProductInput({ name: '商品', price: -1 }, false), {
    field: 'price', message: '価格は 0 以上の数値を入力してください'
  });
  assert.deepEqual(validateProductInput({ name: '商品', stock: 1.5 }, false), {
    field: 'stock', message: '在庫は 0 以上の整数を入力してください'
  });
});

test('有効な UUID だけを Check アクションの入力として受け付ける', () => {
  assert.equal(isUuid('11111111-1111-1111-1111-111111111111'), true);
  assert.equal(isUuid('not-a-uuid'), false);
});

import cds from '@sap/cds';
import { isUuid, validateProductInput, type ProductInput } from './product-validation.js';

type CheckProductInput = { ID?: unknown };
type CheckResult = { found: boolean; message: string };

export default class CatalogService extends cds.ApplicationService {
  async init() {
    const { Products } = this.entities;

    this.before(['CREATE', 'UPDATE'], Products, (req) => {
      const validationError = validateProductInput(req.data as ProductInput, req.event === 'CREATE');
      if (validationError) req.error(400, validationError.message, validationError.field);
    });

    this.on('checkProduct', async (req) => {
      const { ID } = req.data as CheckProductInput;
      if (!isUuid(ID)) return req.error(400, '有効な ID は必須です', 'ID');

      const product = await cds.ql.SELECT.one.from(Products).where({ ID });
      const result: CheckResult = product
        ? { found: true, message: 'データは存在します' }
        : { found: false, message: 'データは存在しません' };
      return result;
    });

    return super.init();
  }
}

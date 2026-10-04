import cds from '@sap/cds';

export default class CatalogService extends cds.ApplicationService {
  async init() {
    const { Products } = this.entities;

    this.on('checkProduct', async (req) => {
      const ID = req.data.ID as string | undefined;
      if (!ID) return req.error(400, 'ID は必須です');

      const product = await cds.ql.SELECT.one.from(Products).where({ ID });
      return product
        ? { found: true, message: 'データは存在します' }
        : { found: false, message: 'データは存在しません' };
    });

    return super.init();
  }
}

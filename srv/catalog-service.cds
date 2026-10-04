using { sample.catalog as db } from '../db/schema';

@impl: './gen/catalog-service.js'
service CatalogService {
  entity Products as projection on db.Products;
  action checkProduct(ID : UUID) returns CheckResult;
}

type CheckResult {
  found   : Boolean;
  message : String;
}

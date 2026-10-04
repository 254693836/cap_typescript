namespace sample.catalog;

using { cuid, managed } from '@sap/cds/common';

entity Products : cuid, managed {
  name        : String(100) not null;
  description : String(500);
  price       : Decimal(9, 2);
  stock       : Integer;
}

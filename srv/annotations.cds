using CatalogService from './catalog-service';

annotate CatalogService.Products with @(
  UI.HeaderInfo : {
    TypeName       : '商品',
    TypeNamePlural : '商品',
    Title          : { Value : name },
    Description    : { Value : description }
  },
  UI.SelectionFields : [ name, stock ],
  UI.LineItem : [
    { Value : name,        Label : '商品名' },
    { Value : description, Label : '説明' },
    { Value : price,       Label : '価格' },
    { Value : stock,       Label : '在庫' }
  ],
  UI.Facets : [
    { $Type : 'UI.ReferenceFacet', Label : '商品情報', Target : '@UI.FieldGroup#General' }
  ],
  UI.FieldGroup #General : {
    Data : [
      { Value : name,        Label : '商品名' },
      { Value : description, Label : '説明' },
      { Value : price,       Label : '価格' },
      { Value : stock,       Label : '在庫' }
    ]
  }
);

# CAP TypeScript 商品管理サンプル

Node.js、TypeScript、SAP CAP、SQLite を使った商品管理のサンプルです。ブラウザ画面から一覧表示、新規登録、更新、明細の存在確認を行えます。

## ディレクトリ構成

- `db/schema.cds`: データベースモデル
- `db/data/sample.catalog-Products.csv`: SQLite に初期投入する仮データ
- `srv/`: OData サービスと TypeScript による `checkProduct` アクション
- `app/`: 一覧・登録・更新・明細画面を持つブラウザ UI

## 起動手順

```sh
npm install
npm run watch
```

`http://localhost:4004/` をブラウザで開きます。通常起動は `npm start`（SQLite の作成・CSV 読み込み後に起動）、本番用ビルドの確認は `npm run build` です。

## 操作と API

- 一覧の「詳細・編集」で明細を開き、保存すると `POST /PATCH /odata/v4/catalog/Products` を呼びます。
- 「新規登録」で商品を追加できます。
- 明細の「Check」は `POST /odata/v4/catalog/checkProduct` に ID を渡します。DB に存在すれば「データは存在します」、なければ「データは存在しません」とポップアップ表示します。
- 一覧は `GET /odata/v4/catalog/Products` から読み込みます。

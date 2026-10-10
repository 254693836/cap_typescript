# CAP TypeScript 商品管理サンプル

Node.js、TypeScript、SAP CAP、SQLite を使った商品管理のサンプルです。ブラウザ画面から一覧表示、新規登録、更新、明細の存在確認を行えます。

## ディレクトリ構成

- `db/schema.cds`: データベースモデル
- `db/data/sample.catalog-Products.csv`: SQLite に初期投入する仮データ
- `srv/`: OData サービスと TypeScript による `checkProduct` アクション
- `srv/annotations.cds`: Fiori elements 向けの一覧・明細・フィルタ annotation
- `app/`: 一覧・登録・更新・明細画面を持つブラウザ UI
- `test/`: 商品の入力検証を確認する Node.js テスト

## 起動手順

```sh
npm install
npm run watch
```

`http://localhost:4004/` をブラウザで開きます。通常起動は `npm start`（SQLite の作成・CSV 読み込み後に起動）、本番用ビルドの確認は `npm run build` です。

品質チェックは `npm run lint`、`npm test`、`npm run build` で実行できます。

## 操作と API

- 一覧の「詳細・編集」で明細を開き、保存すると `POST /PATCH /odata/v4/catalog/Products` を呼びます。
- 「新規登録」で商品を追加できます。
- 明細の「Check」は `POST /odata/v4/catalog/checkProduct` に ID を渡します。DB に存在すれば「データは存在します」、なければ「データは存在しません」とポップアップ表示します。
- 一覧は `GET /odata/v4/catalog/Products` から読み込みます。

## 実装方針

- 標準 CRUD は CAP の OData ハンドラを利用します。商品名・価格・在庫は TypeScript の runtime 検証で保護します。
- `checkProduct` は CDS action と TypeScript ハンドラで実装しています。読み取り専用の存在確認であるため、更新トランザクションは不要です。
- `srv/annotations.cds` は Fiori elements で List Report / Object Page を生成する際に再利用できます。現在の `app/` は同じ OData サービスを利用する軽量な独自 UI です。

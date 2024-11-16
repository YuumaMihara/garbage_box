//cloud datastoreのクライアントをインポート
const { Datastore, PropertyFilter } = require('@google-cloud/datastore');

// Datastore クライアントを作成
const datastore = new Datastore({
  projectId: 'web-photo-gallery-429509',
  keyFilename: '../key/cloud_strage_api_key.json'
});

// エンティティを取得するための関数
// name: datastore内のキー名
async function getEntity(name) {
  // テーブル(Kind)が'Contents'かつ、キーが一致するエンティティを検索
  const query = datastore
    .createQuery('Contents')
    .filter(
      new PropertyFilter("__key__", "=", datastore.key(["Contents", name]))
    );

  try {
    const entity = await datastore.runQuery(query);
    return entity;
    // console.log(JSON.stringify(entity));
  } catch (err) {
    console.error('エンティティの取得中にエラーが発生しました:', err);
  }
}

// すべてのURLを取得する関数
async function getAllEntities() {
  const query = datastore.createQuery('Contents');
  try {
    const [entities] = await datastore.runQuery(query);
    return entities;
  } catch {
    console.error('エンティティの取得中にエラーが発生しました:', err);
  }
}

// ラベルが一致するエンティティを取得する関数
// param: 検索条件のラベル名
async function getEntityByLabel(labels) {
  const entities = await getAllEntities();
  const labelList = labels.split(',');
  // cloudstoreのクエリに部分一致がないため、js内のfilterを使用
  return entities.filter(entity =>
    entity["label"] && entity["label"].includes(labelList)
  );
}

// 日付が一致するエンティティを取得する関数
// dete: 検索条件の日付
async function getUrlsByDate(date) {
  
}

exports.getEntity = getEntity;
exports.getEntityByLabel = getEntityByLabel;

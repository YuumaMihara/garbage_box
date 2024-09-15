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

exports.getEntity = getEntity;

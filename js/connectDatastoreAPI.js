//cloud datastoreのクライアントをインポート
const { Datastore } = require('@google-cloud/datastore');

// Datastore クライアントを作成
const datastore = new Datastore({
  projectId: 'web-photo-gallery-429509',
  keyFilename: '../key/cloud_strage_api_key.json'
});

// エンティティを取得するための関数
async function getEntities() {
  const query = datastore.createQuery('Contents'); // 'Contents'テーブル(Kind)

  try {
    const [entities] = await datastore.runQuery(query);
    console.log('Entities:');
    entities.forEach(entity => console.log(entity));
  } catch (err) {
    console.error('エンティティの取得中にエラーが発生しました:', err);
  }
}

// 関数を実行
getEntities();

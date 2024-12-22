//cloud datastoreのクライアントをインポート
const { Datastore, PropertyFilter } = require('@google-cloud/datastore')

// Datastore クライアントを作成
const datastore = new Datastore({
  projectId: 'web-photo-gallery-429509',
  keyFilename: '../key/cloud_strage_api_key.json'
})

/**
 * エンティティを取得するための関数
 * @param {string} name datastore内のキー名
 * @returns 
 */
async function getEntity(name) {
  // テーブル(Kind)が'Contents'かつ、キーが一致するエンティティを検索
  const query = datastore
    .createQuery('Contents')
    .filter(
      new PropertyFilter("__key__", "=", datastore.key(["Contents", name]))
    )

  try {
    const entity = await datastore.runQuery(query)
    return entity
    // console.log(JSON.stringify(entity))
  } catch (err) {
    console.error('エンティティの取得中にエラーが発生しました:', err)
  }
}

/**
 *  すべてのエンティティを取得する関数
 * */ 
async function getAllEntities() {
  const query = datastore.createQuery('Contents')
  try {
    const [entities] = await datastore.runQuery(query)
    return entities
  } catch {
    console.error('エンティティの取得中にエラーが発生しました:', err)
  }
}

/**
 * ラベルが一致するエンティティを取得する関数
 * @param {string} labels 検索条件のラベル
 * @returns 
 */
async function getEntityByLabel(labels) {
  const entities = await getAllEntities()
  const labelList = labels.split(',')
  // cloudstoreのクエリに部分一致がないため、js内のfilterを使用
  // 小文字、大文字関係なく一致するエンティティを返す
  return entities.filter(entity => {
    for (let i = 0; i < labelList.length; i++) {
      var labels = toHalfWidth(entity["label"]).toUpperCase()
      var targetLabel = toHalfWidth(labelList[i]).toUpperCase()
      if (labels.includes(targetLabel)) return true
    }
    return false
  })
}

async function getEntityByLocation(location) {
  const entities = await getAllEntities()
  var result = entities.filter(entity => entity["location"].includes(toHalfWidth(location).toUpperCase()))
  if (result.length === 0) {
    result = entities.filter(entity => entity["address"].includes(toHalfWidth(location).toUpperCase()))
  }
  return result
}

/**
 * 日付が一致するエンティティを取得する関数
 * @param {string} date 検索条件の日付
 */
async function getEntityByDate(date) {

}

function toHalfWidth(targetStr) {
  str = targetStr.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
  })
  return str
}

exports.getEntity = getEntity
exports.getEntityByLabel = getEntityByLabel
exports.getEntityByLocation = getEntityByLocation

async function fetchGetAllEntities() {
    return await fetcher('/api/getAllEntities')
}

async function fetchGetEntityByName(name) {
    return await fetcher('/api/getEntityByName?name=' + name)
}

/**
 * node.jsへラベルを引数にGETメソッドでリクエストを送信
 * @param {string} labels 検索をかけるラベル群 
 * @returns レスポンスで帰ってきた検索ラベルと一致するentityを返す
 */
async function fetchGetEntityByLabels(labels) {
    return await fetcher('/api/getEntityByLabel?label=' + labels)
}

/**
 * node.jsへロケーションを引数にGETメソッドでリクエストを送信
 * @param {string} location 
 * @returns 
 */
async function fetchGetEntityByLocation(location) {
    return await fetcher('/api/getEntityByLocation?location=' + location)
}

/**
 * node.jsへ日付(yyyyMM)を引数にGETメソッドでリクエストを送信
 * @param {string} date 
 * @returns 
 */
async function fetchGetEntityByDate(date) {
    return await fetcher('/api/getEntityByDate?date=' + date)
}

async function fetcher(URL) {
    const fetchResult = await fetch(URL)
    const json = await fetchResult.json()
    console.log("fetch result json: " + json)
    //stringで取得した結果をjsonへ変換
    return resultEnity = await JSON.parse(JSON.stringify(json))
}

window.fetchGetAllEntities = fetchGetAllEntities
window.fetchGetEntityByName = fetchGetEntityByName
window.fetchGetEntityByLabels = fetchGetEntityByLabels
window.fetchGetEntityByLocation = fetchGetEntityByLocation
window.fetchGetEntityByDate = fetchGetEntityByDate
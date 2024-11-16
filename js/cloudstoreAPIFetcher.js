async function fetchGetEntityByName(name) {
    const fetchResult = await fetch('http://localhost:3000/getEntity?name=' + name)
    const json = await fetchResult.json();
    console.log("fetch result json: " + json);
    //stringで取得した結果をjsonへ変換
    return resultEnity = await JSON.parse(JSON.stringify(json))[0][0];
}

async function fetchGetEntityByLabels(labels) {
    console.log(labels);
    const fetchResult = await fetch('http://localhost:3000/getEntityByLabel?label=' + labels)
    const json = await fetchResult.json();
    console.log("fetch result json: " + json);
    //stringで取得した結果をjsonへ変換
    return resultEnity = await JSON.parse(JSON.stringify(json));
}

window.fetchGetEntityByName = fetchGetEntityByName;
window.fetchGetEntityByLabels = fetchGetEntityByLabels;

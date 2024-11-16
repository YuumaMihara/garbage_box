var grid;

// muuri初期化処理
function initMuuri() {
    grid = new Muuri('.grid', {
        hideDuration: 1000,
        showDuration: 1000,
        showEasing: 'cubic-bezier(.1,.39,0,.99)'
    });
}

// webページの初期表示は画像を非表示にしておく
initMuuri();
hideImgNoAnim();

// imagesLoadedですべての画像の読み込みを確認したら画像を表示する
$('.garbage').imagesLoaded().always(function (instance) {
    showImg();
})
.progress(function (instance, image) {
    //TODO:ロード画面を追加
});

// 画像をすべて非表示(アニメーションなし)
function hideImgNoAnim() {
    grid.hide(grid.getItems(), {instant: true});
    console.log("hideImg()");
}

// 画像をすべて非表示(アニメーションあり)
function hideImg() {
    grid.hide(grid.getItems());
    console.log("hideImg()");
}

// 画像をすべて表示
function showImg() {
    grid.show(grid.getItems());
    console.log("showImg()");
}

// ラベル削除
async function deleteLabel(element) {
    var target = element.closest('li');
    target.remove();
    const entities = await window.fetchGetEntityByLabels(getSearchLabel());
    updateContents(entities);
}

function getSearchLabel() {
    var labelList = new Array();
    $('.label_for_search').each(function () {
        labelList.push($(this).text());
    });
    return labelList.join(',');
}

// 画面スクロールでタイトルを移動
$(window).scroll(function() {
    $(".top").toggleClass("moving", window.scrollY > 100);
});

// ソートボタンをどれか一つしか選択できないよう制御
$(function () {
    $('.sortBtn').on('click', async function () {
        if ($(this).prop('checked')) {
            $('.sortBtn').prop('checked', false);
            $(this).prop('checked', true);
        }
        //実際に押されたボタンのコンテナ要素
        searchBar = $(this).parent().parent();
        //すでに検索バーが開いている状態のとき
        if (searchBar.hasClass('open')) {
            searchBarCloseAnim(searchBar);
        } else {
            searchBarOpenAnim(searchBar);
            $('.open').each(function (index) {
                if (!searchBar.is($(this))) {
                    searchBarCloseAnim($(this));
                }    
            });
        }
    });
});

// 検索バークローズアニメーション
async function searchBarCloseAnim(searchBar) {
    searchBar.removeClass('open');
    searchBar.find('.input_box').removeClass('open');
    await wait(0.4);
    searchBar.find('.input_box').css('display', 'none');
}

// 検索バーオープンアニメーション
async function searchBarOpenAnim(searchBar) {
    searchBar.addClass('open');
    searchBar.find('.input_box').css('display', 'block');
    await wait(0.1);
    searchBar.find('.input_box').addClass('open');
}

// 表示画像を更新する
async function updateContents(entities) {
    hideImg();
    //非表示アニメーション用に1秒待機
    await wait(1);
    $('#grid-contents').children().remove();
    entities.forEach(entity => {
        $('#grid-contents').append('<div class="item"><div class="item-content"><a class="garbage-link" data-lightbox="garbage" href="' + entity['URL'] + '"><image class="garbage" src="' + entity['URL'] + '"></a></div></div>');
    });
    initMuuri();
    hideImgNoAnim();
    $('.garbage').imagesLoaded().always(async function (instance) {
        showImg();
    });
}

// 検索バーからラベル追加
$("#input_label").on('keyup', async function (event) {
    // Enterキーが押されたとき
    if (event.key == 'Enter') {
        var inputValue = $(this).val().trim();
        // 入力文字が空文字でない場合、ラベルを追加して表示画像を更新する
        if (inputValue) {
            $(".output_label").append('<li><img src="../contents/icon/cancel.png" onclick="deleteLabel(this)"><div><span class="label_for_search">' + inputValue + '</span></div></li>');
            const entities = await window.fetchGetEntityByLabels(getSearchLabel());
            updateContents(entities);
        }
        $(this).val('');
    }
})

// 待機処理
async function wait(second) {
    return new Promise(resolve => setTimeout(resolve, 1000 * second));
}

window.updateContents = updateContents;
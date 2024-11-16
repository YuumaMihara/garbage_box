var grid;

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

function initMuuri() {
    grid = new Muuri('.grid');
}

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

// 画面スクロールでタイトルを移動
$(window).scroll(function() {
    $(".top").toggleClass("moving", window.scrollY > 100);
});

// ソートボタンをどれか一つしか選択できないよう制御
$(function () {
    $('.sortBtn').on('click', function () {
        if ($(this).prop('checked')) {
            $('.sortBtn').prop('checked', false);
            $(this).prop('checked', true);
        }
    })
})

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

async function wait(second) {
    return new Promise(resolve => setTimeout(resolve, 1000 * second));
}

window.updateContents = updateContents;
var grid;

function initMuuri() {
    grid = new Muuri('.grid', {
        hideDuration: 1000,
        showDuration: 1000,
        showEasing: 'cubic-bezier(.1,.39,0,.99)'
    });
}

initMuuri();
hideImgNoAnim();

$('.garbage').imagesLoaded().always(function (instance) {
    showImg();
})
.progress(function (instance, image) {
    //TODO:ロード画面を追加
});

function initMuuri() {
    grid = new Muuri('.grid');
}

function hideImgNoAnim() {
    grid.hide(grid.getItems(), {instant: true});
    console.log("hideImg()");
}

function hideImg() {
    grid.hide(grid.getItems());
    console.log("hideImg()");
}

function showImg() {
    grid.show(grid.getItems());
    console.log("showImg()");
}

$(window).scroll(function() {
    $(".top").toggleClass("moving", window.scrollY > 100);
});

async function updateContents(entities) {
    hideImg();
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
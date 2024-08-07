var grid = new Muuri('.grid', {
    showDuration: 1000,
    showEasing: 'cubic-bezier(.1,.39,0,.99)'
});
hideImg();

$('#grid-contents').imagesLoaded().always(function (instance) {
    showImg();
})
.progress(function (instance, image) {
    
});

function initMuuri() {
    grid = new Muuri('.grid');
}

function hideImg() {
    grid.hide(grid.getItems(), { instant: true });
}

function showImg() {
    grid.show(grid.getItems());
}
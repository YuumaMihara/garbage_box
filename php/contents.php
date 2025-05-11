<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/contents.css">
    <script src="../js/contents.js"></script>
    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>
    <title>contents</title>
</head>

<body>
    <header>
        <div class="top">
            <span>GARBAGE BOX</span>
        </div>
        <nav class="menu">
            <input type="checkbox" href="#" class="menu-open" name="menu-open" id="menu-open">
            <label class="menu-open-button" for="menu-open">
                <span class="lines line-1"></span>
                <span class="lines line-2"></span>
                <span class="lines line-3"></span>
            </label>
            <ul class="menu_box">
                <li><a class="menu_item" href="/">TOP</a></li>
                <li><a class="menu_item" href="/php/contents.php">CONTENTS</a></li>
                <li><a class="menu_item" href="/php/about.php">ABOUT</a></li>
            </ul>
        </nav>
    </header>

    <div class="body">
        <p id="top2">other contents</p>
        <div class="contents">
            <div class="inner-contents">
                <model-viewer src="../contents/model/instagram.glb" camera-controls auto-rotate></model-viewer>
                <a href="https://www.instagram.com/ymyz0/">INSTAGRAM</a>
            </div>
            <div class="inner-contents">
                <model-viewer src="../contents/model/github.glb" camera-controls auto-rotate></model-viewer>
                <a href="https://github.com/YuumaMihara">GITHUB</a>
            </div>
            <div class="inner-contents">
                <model-viewer src="../contents/model/TheSickend.glb"
                    camera-controls
                    auto-rotate
                    exposure="0.25"
                    shadow-intensity="0.5"></model-viewer>
                <a href="">THE SICKEND</a>
            </div>
        </div>
</body>

</html>
<!DOCTYPE html>
<html lang="en">

<?php

require '../vendor/autoload.php';

use Google\Cloud\Datastore\DatastoreClient;

putenv('GOOGLE_APPLICATION_CREDENTIALS=../key/cloud_strage_api_key.json');

$projectId = 'web-photo-gallery-429509';

// Google Cloud Datastoreクライアントを作成
$datastore = new DatastoreClient([
    'projectId' => $projectId
]);

$query = $datastore->query()->kind('Contents');

$result = $datastore->runQuery($query);

?>


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css">
    <link rel="stylesheet" href="../css/index.css">
    <link href="../css/lightbox.css" rel="stylesheet" />
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script src="../js/lightbox.js"></script>
    <title>GARBAGE BOX</title>
</head>

<body>
    <script>
        lightbox.option({
            'disableScrolling': true,
            'showImageNumberLabel': false
        })
    </script>
    <header>
        <div class="top">
            <span>GARBAGE BOX</span>
        </div>
    </header>

    <div class="body">
        <div class="sidebar">
            <div class="sort">
                <p></p>
                <div class="container_searchbar">
                    <div class="container_icon">
                        <input class="sortBtn" id="sortBtnLabel" type="checkbox">
                        <label class="sortItem" for="sortBtnLabel"><img class="icon" src="../contents/icon/label.png" width="30px" height="30px"></label>
                    </div>
                    <input placeholder="label name" id="input_label" class="input_box" type="text">
                </div>

                <div class="container_searchbar">
                    <div class="container_icon">
                        <input class="sortBtn" id="sortBtnLocate" type="checkbox">
                        <label class="sortItem" for="sortBtnLocate"><img class="icon" src="../contents/icon/pin.png" width="30px" height="30px"></label>
                    </div>
                    <input placeholder="location name" id="input_location" class="input_box" type="text">
                </div>

                <div class="container_searchbar">
                    <div class="container_icon">
                        <input class="sortBtn" id="sortBtnDate" type="checkbox">
                        <label class="sortItem" for="sortBtnDate"><img class="icon" src="../contents/icon/calender.png" width="30px" height="30px"></label>
                    </div>
                    <input placeholder="selectDate" id="input_date" class="input_box" type="text">
                </div>
            </div>
        </div>

        <div class="output_label"></div>

        <div class="grid" id="grid-contents">

            <?php
            foreach ($result as $index => $entity) {
                echo "      <div class='item'>" . "\n";
                echo "          <div class='item-content'>" . "\n";
                echo "              <a class='garbage-link' data-lightbox='garbage' href='" . $entity['URL'] . "'>";
                echo "              <img class='garbage' src='" . $entity['URL'] . "'></img></a>" . "\n";
                echo '          </div>' . "\n";
                echo '      </div>' . "\n";
            }
            ?>

        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.1/web-animations.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/muuri/0.9.5/muuri.js" integrity="sha512-hFmxG/5TvZb0azjulqGPzLEP0LppyA1IyaidJBaDCwEvbBSQlTaUiQ453Tb2Af/3RGfV5A14raSxmIx3Oxz8mQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.js"></script>
    <script src="../js/index.js"></script>
    <script src="../js/cloudstoreAPIFetcher.js"></script>
    <script src="../js/lightbox.js"></script>
    <script>
        lightbox.option({
            'disableScrolling': true,
            'showImageNumberLabel': false
        })
    </script>
</body>

</html>
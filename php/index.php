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
        <div class="sort">
            <p></p>
            <span class="sortItem">category</span>
            <span class="sortItem">locate</span>
            <span class="sortItem">date</span>
        </div>
        <div class="grid" id="grid-contents">

            <?php
            foreach ($result as $index => $entity) {
                if ($index != 0) {
                    echo "      <div class='item'>" . "\n";
                    echo "          <div class='item-content'>" . "\n";
                    echo "              <a class='garbage-link' data-lightbox='garbage' href='" . $entity['URL'] . "'>";
                    echo "              <image class='garbage' src='". $entity['URL'] . "'></a>" . "\n";
                    echo '          </div>' . "\n";
                    echo '      </div>' . "\n";
                }
            }
            ?>

        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.1/web-animations.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/muuri/0.9.5/muuri.js" integrity="sha512-hFmxG/5TvZb0azjulqGPzLEP0LppyA1IyaidJBaDCwEvbBSQlTaUiQ453Tb2Af/3RGfV5A14raSxmIx3Oxz8mQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>
    <script src="../js/lightbox.js"></script>
    <script src="../js/index.js"></script>
</body>

</html>
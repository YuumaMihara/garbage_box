<!DOCTYPE html>
<html lang="en">

<?php

require '../vendor/autoload.php';

use Google\Cloud\Storage\StorageClient;
use Google\Cloud\Core\Exception\GoogleException;
use Google\Cloud\Core\Exception\NotFoundException;
use Google\Cloud\Core\Exception\ServiceException;

putenv('GOOGLE_APPLICATION_CREDENTIALS=../key/cloud_strage_api_key.json');

$projectId = 'web-photo-gallery-429509';
$bucketName = 'garbagebox';
$folderName = 'image/';
$storage;
$bucket;
$objects;

try {
    // Google Cloud Storageクライアントを作成
    $storage = new StorageClient([
        'projectId' => $projectId
    ]);

    // バケットを取得
    $bucket = $storage->bucket($bucketName);

    // フォルダ内のオブジェクトをリスト
    $objects = $bucket->objects([
        'prefix' => $folderName
    ]);
} catch (NotFoundException $e) {
    echo 'Error: Bucket or object not found: ' . $e->getMessage() . PHP_EOL;
} catch (ServiceException $e) {
    echo 'Error: Service exception: ' . $e->getMessage() . PHP_EOL;
} catch (GoogleException $e) {
    echo 'Error: Google API exception: ' . $e->getMessage() . PHP_EOL;
} catch (Exception $e) {
    echo 'Error: General exception: ' . $e->getMessage() . PHP_EOL;
}

?>


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css">
    <link rel="stylesheet" href="../css/index.css">
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <title>GARBAGE BOX</title>
</head>

<body>
    <header>
        <div class="top">
            <span>GARBAGE BOX</span>
        </div>
        <div class="sort">
            <p></p>
            <span class="sortItem">category</span>
            <span class="sortItem">locate</span>
            <span class="sortItem">date</span>
        </div>
    </header>

    <div class="grid" id="grid-contents">

        <?php
        foreach ($objects as $index => $object) {
            if ($index != 0) {
                echo "      <div class='item'>" . "\n";
                echo "          <div class='item-content'>" . "\n";
                echo "              <image class='garbage' src='" . "https://storage.googleapis.com/" . $bucketName . '/' . $object->name() . "'>" . "\n";
                echo '          </div>' . "\n";
                echo '      </div>' . "\n";
            }
        }
        ?>

    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.1/web-animations.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/muuri/0.9.5/muuri.js" integrity="sha512-hFmxG/5TvZb0azjulqGPzLEP0LppyA1IyaidJBaDCwEvbBSQlTaUiQ453Tb2Af/3RGfV5A14raSxmIx3Oxz8mQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>
    <script src="../js/index.js"></script>
</body>

</html>
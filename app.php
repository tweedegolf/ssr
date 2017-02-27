<?php
require_once __DIR__.'/./server/vendor/autoload.php';
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

$loader = new Twig_Loader_Filesystem( __DIR__.'/./twig');
$twig = new Twig_Environment($loader, array(
    // 'cache' =>  __DIR__.'/./twig/cache',
    'autoescape' => false,
));

function generateHTML() {
    // $path = __DIR__.'/../frontend/generate.js';
    $process = new Process('./node_modules/.bin/babel-node ./frontend/js/ssr/generate-html.js');
    $process->run();

    if (!$process->isSuccessful()) {
        throw new ProcessFailedException($process);
    }
    return $process->getOutput();
}

function generateJSON() {
    // $path = __DIR__.'/../frontend/generate.js';
    $process = new Process('./node_modules/.bin/babel-node ./frontend/js/ssr/generate-json.js');
    $process->run();

    if (!$process->isSuccessful()) {
        throw new ProcessFailedException($process);
    }
    return json_decode($process->getOutput(), true);
}

function generatePage($segment0 = 'animals', $segment1 = 'NA', $segment2 = 'NA', $segment3 = 'NA') {
    // echo "$segment0 $segment1 $segment2 $segment3";
    $process = new Process("./node_modules/.bin/babel-node ./frontend/js/ssr/generate-page.js $segment0 $segment1 $segment2 $segment3");
    $process->run();

    if (!$process->isSuccessful()) {
        throw new ProcessFailedException($process);
    }
    return json_decode($process->getOutput(), true);
}

$app = new Silex\Application();

// $app->get('/', function () use ($app, $twig) {
//     return $twig->render('index.html');
// });

// $app->get('/hello/{name}', function ($name) use ($app) {
//     return 'Hello '.$app->escape($name);
// });


// csr
$app->get('/csr', function ($segment0) use ($app, $twig) {
    return $twig->render('index.html');
});

// ssr
$app->get('/ssr/{segment0}', function ($segment0) use ($app, $twig) {
    return $twig->render('test1.html', generatePage($segment0));
});

$app->get('/ssr/{segment0}/{segment1}', function ($segment0, $segment1) use ($app, $twig) {
    return $twig->render('test1.html', generatePage($segment0, $segment1));
});

$app->get('/ssr/{segment0}/{segment1}/{segment2}', function ($segment0, $segment1, $segment2) use ($app, $twig) {
    return $twig->render('test1.html', generatePage($segment0, $segment1, $segment2));
});

$app->get('/ssr/{segment0}/{segment1}/{segment2}/{segment3}', function ($segment0, $segment1, $segment2, $segment3) use ($app, $twig) {
    return $twig->render('test1.html', generatePage($segment0, $segment1, $segment2, $segment3));
});

// test json
// $app->get('/ssr/json', function () use ($app, $twig) {
//     return  $twig->render('test1.html', generateJSON());
// });

// // test html
// $app->get('/ssr/html', function () use ($app) {
//     return generateHTML();
// });

$app->run();
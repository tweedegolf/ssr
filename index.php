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
    // $path = __DIR__.'/../client/generate.js';
    $process = new Process('./node_modules/.bin/babel-node ./client/js/generate/generate-html.js');
    $process->run();

    if (!$process->isSuccessful()) {
        throw new ProcessFailedException($process);
    }
    return $process->getOutput();
}

function generateJSON() {
    // $path = __DIR__.'/../client/generate.js';
    $process = new Process('./node_modules/.bin/babel-node ./client/js/generate/generate-json.js');
    $process->run();

    if (!$process->isSuccessful()) {
        throw new ProcessFailedException($process);
    }
    return json_decode($process->getOutput(), true);
}

$app = new Silex\Application();

$app->get('/', function () use ($app) {
    return 'Root';
});

$app->get('/hello/{name}', function ($name) use ($app) {
    return 'Hello '.$app->escape($name);
});

$app->get('/generate/html', function () use ($app) {
    return generateHTML();
});

$app->get('/generate/json', function () use ($app, $twig) {
    return  $twig->render('test1.html', generateJSON());
});

$app->run();
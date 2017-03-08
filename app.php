<?php
require_once __DIR__.'/vendor/autoload.php';
use Symfony\Component\HttpFoundation\Response;
// use Symfony\Component\Process\Process;
// use Symfony\Component\Process\Exception\ProcessFailedException;

/*
$loader = new Twig_Loader_Filesystem( __DIR__.'/./twig');
$twig = new Twig_Environment($loader, array(
    // 'cache' =>  __DIR__.'/./twig/cache',
    'autoescape' => false,
));
*/

$app = new Silex\Application();

$app->get('/assets/{file}', function ($file) use ($app) {
    error_log("[assets] $file \n", 3, __DIR__.'/php.log');
    // return $app->sendFile(__DIR__.'/assets/'.$file);
    $file = __DIR__.'/assets/'.$file;
    $stream = function () use ($file) {
        readfile($file);
    };
    $contentType;
    if (strpos($file, '.css') != False) {
        $contentType = 'text/css';
    } else if (strpos($file, '.js') != False) {
        $contentType = 'application/javascript';
    }
    return $app->stream($stream, 200, array('Content-Type' => $contentType));
});

$app->get('/{segment0}', function ($segment0) use ($app) {
    $path = "$segment0";
    error_log("[segments] $path \n", 3, __DIR__.'/php.log');
    $client = new \GuzzleHttp\Client();
    $res = $client->request('GET', "http://localhost:3000/$path");
    return $res->getBody();
})
->value('segment0', 'animals');

$app->get('/{segment0}/{segment1}', function ($segment0, $segment1) use ($app) {
    $path = "$segment0/$segment1";
    error_log("[segments] $path \n", 3, __DIR__.'/php.log');
    $client = new \GuzzleHttp\Client();
    $res = $client->request('GET', "http://localhost:3000/$path");
    return $res->getBody();
});

$app->get('/{segment0}/{segment1}/{segment2}', function ($segment0, $segment1, $segment2) use ($app) {
    $path = "$segment0/$segment1/$segment2";
    error_log("[segments] $path \n", 3, __DIR__.'/php.log');
    $client = new \GuzzleHttp\Client();
    $res = $client->request('GET', "http://localhost:3000/$path");
    return $res->getBody();
});

$app->get('/{segment0}/{segment1}/{segment2}/{segment3}', function ($segment0, $segment1, $segment2, $segment3) use ($app) {
    $path = "$segment0/$segment1/$segment2/$segment3";
    error_log("[segments] $path \n", 3, __DIR__.'/php.log');
    $client = new \GuzzleHttp\Client();
    $res = $client->request('GET', "http://localhost:3000/$path");
    return $res->getBody();
});

/*
// why doesn't this work?
$app->get('/{segment0}/{segment1}/{segment2}', function ($segment0, $segment1, $segment2) use ($app) {
    $client = new \GuzzleHttp\Client();
    $path = "/$segment0";
    if ($segment1 != 'segment1'){
        $path .= "/$segment1";
    }
    if ($segment2 != 'segment1'){
        $path .= "/$segment2";
    }
    // $res = $client->request('GET', 'http://localhost:3000/{path}');
    // echo $res->getBody();
    echo $path;

    // $request = new \GuzzleHttp\Psr7\Request('GET', 'http://httpbin.org/ip');
    // $promise = $client->sendAsync($request)->then(function ($response) {
    //     return 'I completed! ' . $response->getBody();
    // });
    // $promise->wait();
})
->value('segment0', 'animals')
->value('segment1', 'segment1')
->value('segment2', 'segment2');
*/

$app->run();
<?php
require_once __DIR__.'/./vendor/autoload.php';
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
    error_log("[assets] $file \n", 3, '/home/abudaan/workspace/ssr/php.log');
    return $app->sendFile(__DIR__.'/assets/'.$file);
});

$app->get('/{segment0}', function ($segment0) use ($app) {
    error_log("[segment0] $segment0 \n", 3, '/home/abudaan/workspace/ssr/php.log');
    $client = new \GuzzleHttp\Client();
    $path = "$segment0";
    $res = $client->request('GET', "http://localhost:3000/$path");
    echo $res->getBody();
})
->value('segment0', 'animals');

$app->get('/{segment0}/{segment1}', function ($segment0, $segment1) use ($app) {
    error_log("[segment0+1] $segment0 | $segment1 \n", 3, '/home/abudaan/workspace/ssr/php.log');
    // if ($segment0 === 'assets') {
    //     return $app->sendFile(__DIR__.'/assets/'.$segment1);
    // } else {
        $client = new \GuzzleHttp\Client();
        $path = "$segment0/$segment1";
        $res = $client->request('GET', "http://localhost:3000/$path");
        echo $res->getBody();
    // }
});

$app->get('/{segment0}/{segment1}/{segment2}', function ($segment0, $segment1, $segment2) use ($app) {
    error_log("[segment0+1+2] $segment0 | $segment1 | $segment2 \n", 3, '/home/abudaan/workspace/ssr/php.log');
    $client = new \GuzzleHttp\Client();
    $path = "$segment0/$segment1/$segment2";
    $res = $client->request('GET', "http://localhost:3000/$path");
    echo $res->getBody();
});

$app->get('/{segment0}/{segment1}/{segment2}/{segment3}', function ($segment0, $segment1, $segment2, $segment3) use ($app) {
    error_log("[segment0+1+2+3] $segment0 | $segment1 | $segment2 | $segment3 \n", 3, '/home/abudaan/workspace/ssr/php.log');
    $client = new \GuzzleHttp\Client();
    $path = "$segment0/$segment1/$segment2/$segment3";
    $res = $client->request('GET', "http://localhost:3000/$path");
    echo $res->getBody();
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
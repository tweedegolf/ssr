<?php

// web/index.php
require_once __DIR__.'/./server/vendor/autoload.php';
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;


function generate() {
  // $path = __DIR__.'/../client/generate.js';
  $process = new Process('./node_modules/.bin/babel-node ./client/generate.js');
  $process->run();

  // executes after the command finishes
  if (!$process->isSuccessful()) {
      throw new ProcessFailedException($process);
  }

  return $process->getOutput();
}

$app = new Silex\Application();

$app->get('/', function () use ($app) {
    return 'Root';
});

$app->get('/hello/{name}', function ($name) use ($app) {
    return 'Hello '.$app->escape($name);
});

$app->get('/generate', function () use ($app) {
    return generate();
});

$app->run();
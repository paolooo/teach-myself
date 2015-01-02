<?php

include_once 'Psr4AutoloaderClass.php';

$loader = new \Psr4AutoloaderClass;

// register the autolader
$loader->register();

// register the base directories for the namespace prefix
$loader->addNamespace('Di', __DIR__);
$loader->addNamespace('Dice', __DIR__);

$dice = new \Dice\Dice;

$b = $dice->create('Di\B');

var_dump($b);

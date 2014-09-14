<?php

function __autoload($className)
{
  echo '__autoload<br>';
  echo '$className: ', $className, "<br>";

  $className = ltrim($className, '\\');
  $fileName = '';
  $namespace = '';

  if ($lastNsPos = strrpos($className, '\\')) {
  }

  echo '$lastNsPos: ', $lastNsPos;
}

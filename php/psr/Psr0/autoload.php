<?php

function __autoload($classname)
{
  $classname = ltrim($classname, '\\');
  $filename = '';
  $namespace = '';
  if ($lastNsPos = strrpos($classname, '\\')) {
    $namespace = substr($classname, 0, $lastNsPos);
    $classname = substr($classname, $lastNsPos + 1);
    $filename = str_replace('\\', DIRECTORY_SEPRATOR, $namespace)
      . DIRECTORY_SEPRATOR;
  }
  $filename .= str_replace('_', DIRECTORY_SEPRATOR, $classname) . '.php';

  if (!file_exists($filename)) {
    throw new InvalidArgumentException('File not found.');
  }

  require $filename;
}

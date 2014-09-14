<?php

function autoload($classname)
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

  require $filename;
}

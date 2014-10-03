# PHP Standard Recommendation 0

This standard is more on naming namespace, autoloader, and built-in splautoloader

## PSR-0 rules and example

* A fully-qualified namespace and class must have the following structure:   
 `\<Vendor Name>\(<Namespace>\)*<Class Name>`
* Each namespace must have a top-level namespace `("Vendor Name")`.
* Each namespace can have as many sub-namespaces as it wishes.

  ```php
<?php namespace A\B\C; ...
<?php namespace \Paolo\Database\Mysql; ...
```

* Each namespace separator is converted to a `DIRECTORY_SEPARATOR` when loading from the file system.
* Each `_` character in the `CLASS NAME` is converted to a `DIRECTORY_SEPARATOR`. The `_` character has no special meaning in the namespace.
* The fully-qualified namespace and class is suffixed with .php when loading from the file system.
* Alphabetic characters in vendor names, namespaces, and class names may be of any combination of lower case and upper case.

| namespace | filename |
|--------|--------|
| \A\B   | A/B.php |
| \C\D\E_F | C/D/E/F.php |


## Autoloader

`__autoload` function attempts to load undefined class. Click [here](http://php.net/manual/en/function.autoload.php) for its docs.
`spl_autoload_register` function registers custome autoloader function or class. Click [here](http://php.net/manual/en/function.spl-autoload-register.php) for its docs.

```php
<?php

function autoload($className)
{
	$className = ltrim($className, '\\');
    $fileName = '';
    $namespace = '';
    if ($lastNsPos = strrpos($className, '\\')) {
    	$namespace = substr($className, 0, $lastNsPos);
        $className = substr($className, $lastNsPos + 1);
        $fileName = str_replace('\\', DIRECTORY_SEPARATOR, $namespace) . DIRECTORY_SEPARATOR;
    }
    $filaName .=  str_replace('_', DIRECTORY_SEPARATOR, $fileName) . '.php';

    require $fileName;
}

spl_autoload_register('autoload');
```

Or using `SplClassLoader` http://gist.github.com/221634

```php
# Usage of SplClassLoader
```

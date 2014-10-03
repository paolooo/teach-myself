# PHP Standard Recommendation 1 (PSR-1)

http://www.php-fig.org/psr/psr-1/

## PSR-1 rules and examples

* File MUST use only `<?php` and `<?=` tags.
* Files MUST use only UTF-8 without BOM for PHP code.
* Files SHOULD either declare symbols (classes, functions, constants, etc.) or cause side-effects (e.g. generate output, change .ini settings, etc.) but SHOULD NOT do both.
    - gin execute na logic na diri naman directly related han class or function itself.

* Namespaces and classes MUST follow PSR-0.  

    ```php
    <?php
    namespace Vendor\Baz;

    class Foo
    {
        // ...
    }
    ```

* Class names MUST be declared in `StudlyCaps`.

    ```php
    <?php
    class Foo
    {
        // ...
    }

    class FooBar
    {
        // ...
    }
    ```

* Class constants MUST be declared in all upper case with underscore separators.

    ```php
    <?php
    class Foo
    {
        const MY_CONSTANT = 'constant value';
    }
    ```

* Method names MUST be declared in camelCase.

    ```php
    <?php
    class Foo
    {
        const MY_CONSTANT = 'constant value';

        public function myMethodCamelCase() {
            // ...
        }
    }
    ```

* Class properties can have any type of styles. `$StudlyCaps`, `$camelCase`, or `$under_score`. Whatever naming convention is used SHOULD be applied consistently.
    - i-apply jd sa tanan kung unsa na decide.

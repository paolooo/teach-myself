# Delegation Pattern

Murag proxy ang concept pero ang parent class waray logic diretso la ha child. Dili pud mo gamit og `extends`.

* The delegate pattern provides a way of delegating behavior based on different criteria. 
* instead of performing one of its stated tasks, delegates that task to an associated helper object.

Example:

```php

class Parent
{
    protected $child;

    public function __construct(Child $child)
    {
        // Set delegate.
        $this->child = $child;
    }

    public function doDelegatedMethod(array $args)
    {
        $this->child->doDelegatedMethod($args);
    }
}

class Child
{
    public function doDelegatedMethod(array $args)
    {
        if ( ! is_array($array) ) {
            throw new \InvalidArgumentException('Expected array provided.');
        }

        // child logic here
    }

}

# Usage

$parent = new Parent(new Child());
$parent->doDelegatedMethod(['x'=>1, 'y'=>'2']);
```

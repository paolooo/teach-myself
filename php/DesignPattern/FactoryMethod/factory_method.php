<?php

abstract class Product
{
    protected $name;

    public function name()
    {
        echo 'Product name: ', $this->name, "\n";
    }
}

class ProductOne extends Product
{
    public function __construct()
    {
        $this->name = 'ProductOne';
    }
}
class ProductTwo extends Product
{
    public function __construct()
    {
        $this->name = 'ProductTwo';
    }

    public function appendSomethingOnName($str)
    {
        $this->name .= $str;
    }
}

/**
 * Factory Method
 */
abstract class FactoryMethod
{
    abstract public function make($type);
}

class ProductFactory extends FactoryMethod
{
    public function make($type)
    {
        if ($type == 1) {
            return new ProductOne;
        } else if ($type == 2) {
            $oProduct = new ProductTwo;
            $oProduct->appendSomethingOnName(' <<----');
            return $oProduct;
        } else {
            throw new \InvalidArgumentException('Argument must be 1 or 2.');
        }
    }
}

/**
 * Usage
 */
$factory = new ProductFactory;
$product = $factory->make(1);
$product->name();

$product = $factory->make(2);
$product->name();

<?php

abstract class AbstractProduct
{
    protected $name;

    public function make()
    {
        echo 'Making product name: ', $this->name, "\n";
    }
}

class ProductA extends AbstractProduct
{
    public function setName($name)
    {
        $this->name = $name;
    }
}

class ProductA1 extends ProductA
{
    public function __construct()
    {
        $this->setName('Product A1');
    }
}

class ProductA2 extends ProductA
{
    public function __construct()
    {
        $this->setName('Product A2');
    }

    public function appendSomethingOnName($str)
    {
        $this->name .= $str;
    }
}

class ProductB extends AbstractProduct
{
    public function setName($name)
    {
        $this->name = $name;
    }
}

class ProductB1 extends ProductB
{
    public function __construct()
    {
        $this->setName('Product B1');
    }

    public function appendSomethingOnName($str)
    {
        $this->name .= $str;
    }
}

class ProductB2 extends ProductB
{
    public function __construct()
    {
        $this->setName('Product B2');
    }
}

/**
 * Abstract Factory
 */
abstract class AbstractFactory
{
    abstract public function makeProductA();
    abstract public function makeProductB();
}

class ProductFactory1 extends AbstractFactory
{
    public function makeProductA()
    {
        return new ProductA1;
    }

    public function makeProductB()
    {
        $product = new ProductB1;
        $product->appendSomethingOnName(' <<----');
        return $product;
    }
}

class ProductFactory2 extends AbstractFactory
{
    public function makeProductA()
    {
        $product = new ProductA2();
        $product->appendSomethingOnName(' <<<===');
        return $product;
    }

    public function makeProductB()
    {
        return new ProductB2();
    }
}

/**
 * Factory Creator
 */
class FactoryCreator
{
    public static function make($type)
    {
        if ($type == 'A') {
            return new ProductFactory1;
        } elseif ($type == 'B') {
            return new ProductFactory2;
        } else {
            throw new \InvalidArgumentException('Type argument must be "A" or "B"');
        }
    }
}

/**
 * Client
 */
class Client
{
    public function __construct()
    {
        $factory = FactoryCreator::make('A');
        $product = $factory->makeProductA();
        $product->make();
        $product = $factory->makeProductB();
        $product->make();

        $factory = FactoryCreator::make('B');
        $product = $factory->makeProductA();
        $product->make();
        $product = $factory->makeProductB();
        $product->make();
    }
}

new Client;

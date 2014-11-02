<?php namespace Php\DesignPattern\Strategy;

interface StrategyInterface
{
    public function printName();
}

class ConcreteStrategy1 implements StrategyInterface
{
    public function printName()
    {
        echo "Name: ConcreteStrategy1\n";
    }
}

class ConcreteStrategy2 implements StrategyInterface
{
    public function printName()
    {
        echo "Name: ConcreteStrategy2\n";
    }
}

class Context
{
    private $strategy;

    public function __construct($type)
    {
        if ($type == 1) {
            $this->strategy = new ConcreteStrategy1;
        } elseif ($type == 2) {
            $this->strategy = new ConcreteStrategy2;
        } else {
            throw new \InvalidArgumentException('Type must be 1 or 2. Otherwise, it\'s false.');
        }
    }

    public function setStrategy(StrategyInterface $strategy)
    {
        $this->strategy = $strategy;
    }

    public function printName()
    {
        $this->strategy->printName();
    }
}

/**
 * Usage
 */
$context = new Context(1);
$context->printName();

// or if you want to pass as an argument
$context->setStrategy(new ConcreteStrategy2);
$context->printName();

$context->setStrategy(new ConcreteStrategy1);
$context->printName();


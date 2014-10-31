<?php

/**
 *
 */
abstract class Abstract_Type
{
    protected $name;

    public function methodX()
    {
        echo 'print methodX() on ', $this->name, "\n";
    }
}

/**
 *
 */
class Concrete_Type_One extends Abstract_Type
{
    public function __construct()
    {
        $this->name = "\Concrete_Type_One";
    }
}

/**
 *
 */
class Concrete_Type_Two extends Abstract_Type
{
    public function __construct()
    {
        $this->name = "\Concrete_Type_Two";
    }

    public function append_something_on_name($str)
    {
        $this->name .= $str;
    }

}

/**
 * Abstract_Concrete_Creator_Type
 */
abstract class Abstract_Concrete_Creator_Type
{
    public abstract function factory_method_make($type);
}

/**
 * Factory
 *
 * Responsible of creating subclass.
 */
class Concrete_Creator_Type extends Abstract_Concrete_Creator_Type
{
    public function factory_method_make($type)
    {
        if ($type == 'one') {
            return new Concrete_Type_One();
        } else if ($type == 'two') {
            $concreteTypeTwo = new Concrete_Type_Two;
            $concreteTypeTwo->append_something_on_name(' <----');
            return $concreteTypeTwo;
        } else {
            throw new InvalidArgumentException(
                'Argument must be "one" or "two" only.'
            );
        }
    }
}

$creator = new Concrete_Creator_Type();
$oType = $creator->factory_method_make('one');
$oType->methodX(); // prints "print methodX() on \Concrete_Type_One"

$oType = $creator->factory_method_make('two');
$oType->methodX(); // prints "print methodX() on \Concrete_Type_Two <----"

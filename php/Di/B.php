<?php namespace Di;

class B
{
    public $a;

    public function __construct(A $a)
    {
        $this->a = $a;
    }

}


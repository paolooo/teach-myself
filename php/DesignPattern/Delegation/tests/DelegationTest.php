<?php namespace Delegation\Tests;

use Delegation\Delegation as Delegate;

class DelegationTests extends \PHPUnit_Framework_TestCase
{
    public function testInstantiable()
    {
        $delegate = new Delegate();
        $this->assertInstanceOf('Delegation\Delegation', $delegate);
    }

    // // test instantiate delegate with param object
    // public function testConstructAcceptsObjectParam()
    // {
    //     $logger = $this->getMock('Logger');
    //     $this->assertInstanceOf('Logger', $logger);
    // }
}

<?php namespace Php\Psr\Psr0\Test;

class AutoloadTest extends \PHPUnit_Framework_TestCase
{

  public function testAutoloadExists()
  {
    $class = new \A\B();
    $this->assertInstanceOf('A\\B', $class);
  }

  /**
   * @expectedException InvalidArgumentException
   * @expectedExceptionMessage not found
   */
  public function testFileDoesntExists()
  {
    new \C\D();
  }
}

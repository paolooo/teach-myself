# Association

This has the ability of one instance to send a message to another instance.
When two classes are connected to each other in any way, an association relation is established.

There are four different types of association: **bi-directional**, **uni-directional**, **Aggregation** (includes Composition aggregation) and **Reflexive**.

## Unidirectional Association

The `class A` has an instance or reference of `class B`.

**UML**

```
+---+                      +---+
| A |  ------------------> | B |
+---+                      +---+
|___|                      |___|
|___|                      |___|
```

**PHP**

```php
<?php

class A
{
    private $_b;

    public function __construct()
    {
        $this->_b = new B();
    }
}
```

## Bidirectional Association

The `class A` has an instance or reference of `class B` and vice-versa.
Double-headed arrow or number..* can be used to describe bidirectional association.

**UML**

```
+---+  0..*           0..* +---+
| A |  ------------------- | B |
+---+         or           +---+
|___| <------------------> |___|
|___|                      |___|
```

**PHP**

```php
<?php

class A
{
    private $_b;

    public function __construct(B $b)
    {
        $this->_b = $b;
    }
}

class B
{
    protected $a;

    public function setA(A $a)
    {
        $this->a = $a;
    }
}

# Usage 

$b = new B;
$a = new A($b);
$b->setA($a);
```

## Aggregation

Aggregation is a variant of the **"has a"** association relationship.
It is an association that represents a _part-whole_ or _part-of_ relationship.

> **Optional** association. Dili required ang mga sub classes.

**UML**

```
+---+  0..1           0..* +---+
| A |  <>----------------> | B |
+---+                      +---+
|___|                      |___|
|___|                      |___|
```

**PHP**

```PHP
<?PHP

class A
{
    private $_b;

    public function __construct(B $b)
    {
        $this->_b = $b;
    }
}

class B
{
}

# Usage

$b = new B;
$a = new A($b);
```

## Composition

In composite aggregation the whole is composed of parts which lifecycles are dependant on the whole. It is also called "has a" relation.

> **Required** association. Required jd ang mga sub classes or part. Pareha sa `cellphone` has a `LCD` screen.
Dili ma-compose and whole if ang parts wala. Usually daw, i-initialize ang mga parts sa __constructor mismo.

**UML**

```
+---+  0..1           1..1 +---+
| A |  <*>-----+---------> | B |
+---+          |           +---+
|___|          |           |___|
|___|          |           |___|
               |
               |      1..1 +---+
               +---------> | C |
                           +---+
                           |___|
                           |___|
```

**PHP**

```php
<?php

class
{
    protected $b;
    protected $b2;

    /**
     * A is the owner of B and B2.
     * B and B2 is created when A is created,
     * it is also destroyed when A is destroyed.
     */
    public function __construct()
    {
        $this->b = new B();
        $this->c = new C();
    }
}

# Usage

$a = new A();
```

## Reflexive Association

**TODO:** We don't have an idea yet about this.

The reflexive association is used when objects in the same class can be associated.

**UML**

```
           0..1 +---+
    +---------- | A |
    |           +---+
    |           |___|
    |           |___|
    |             | 0..*
    +-------------+
```

**PHP**

```php
<?php

class A
{
    protected $children = [];

    public function appendChild(A $a)
    {
        $this->children[] = $a;
    }
}
```

## Inheritance / Generalization

Also called an **"is a"** relationship, because the child class is a type of the parent class. Generalization is the basic type of relationship used to define reusable elements in the class diagram. Literally, the child classes "inherit" the common functionality defined in the parent class.

**UML**

```
    +---+
    | A |
    +---+
    |___|
    |___|
      ^
      -
      |
  +-------+
  |       |
+---+   +---+
| B |   | C |
+---+   +---+
|___|   |___|
|___|   |___|

```

**PHP**

```php
class A { }
class B extends A { }
class C extends A { }
```

## Realization

http://www.hiteshagrawal.com/uml/realization-in-uml/

In a realization relationship, one entity (normally an interface) defines a set of functionalities as a contract and the other entity (normally a class) "realizes" the contract by implementing the functionality defined in the contract.

**UML**

```
    +---+
    | <<interface>> |
    | A |
    +---+
    |___|
    |___|
      ^
      -
      :
      :
  +-------+
  :       :
  :       :
+---+   +---+
| B |   | C |
+---+   +---+
|___|   |___|
|___|   |___|
```

**PHP**

```php
<?php

interface A { }
class B implements A { }
class C implements A { }
```

## Dependency

is a relationship that shows that an element, or set of elements, requires other model elements for their specification or implementation.

**UML**

```
 +---+
 | <<interface>> |
 | A |
 +---+
 |___|
 |___|
   ^
   -
   :
   :
   :
   :
 +---+
 | B |
 +---+
 |___|
 |___|
```

**PHP**

```
```


## Symbols

dependency class ................> dependent class
class A {}       ................> class B { protected $a; }

derived class ---------------|> Base class
class A { }   ---------------|> class B extends A {}

          Associate with
class a ------------------> class b
class A {} ---------------> class B { protected $a; }

child class ----------------<*> parent class
child class -----------------<> parent class

References:
http://alexatnet.com/articles/uml-class-diagrams
http://www.c-sharpcorner.com/UploadFile/b1df45/dependency-generalization-association-aggregation-compos/
http://digitalkaoz.net/yuml-php/

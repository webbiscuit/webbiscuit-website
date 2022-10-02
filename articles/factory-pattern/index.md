---
layout: layout.njk
title: Factory Pattern - Design Patterns
url: factory-pattern
date: 2010-02-07
description: Learn when and how to use the Factory Design Pattern
---

# Design Patterns 2

A series of articles exploring Design Patterns and creating useful examples in C#, where we put the pattern into practice. This series is aimed at the programmer with good object-oriented knowledge and a curiosity of Design Patterns, but no prior knowledge of these is assumed. This time out, we are working at the factory and encapsulating object creation.

## The Factory pattern

When using design patterns, you are encouraged to program against interfaces and avoid specific implementations like a broken biscuit. Alas, at some point in your program you do need to create a concrete object somewhere, otherwise the program cannot actually do anything. This is where the factory pattern excels, and as a result becomes a very common pattern and one you need to know.

The optional [source files accompanying this article can be found here.](/files/FactoryPattern.zip)

### Defined

An official definition is: 

> The factory method pattern defines an interface for creating an object, but lets subclasses 
> decide which class to instantiate.
> -- <cite>Gang of Four<sub>[1](#ref1)</sub></cite>

but as you will see if has become much broader than this. You will see many implementations of the factory pattern that do not strictly comply with this definition and we shall be looking at two variations in this article.

Basically, the factory patterns allows us to program against interfaces, letting us plug in the actual implementation only when we need to. As interface programming is to be encouraged, the factory pattern is a bread and butter design pattern and remains the real workhorse behind good software implementation.

## In Practice

In real world situations, requirements rarely remain static. That beautiful framework designed to support a particular system may end up supporting tasks it never envisaged to begin with; crowbar coding. Before our code base becomes a vast sprawling unworkable mess, a bit of forward thinking and design can help us immensely. Polymorphic coding can defend against polymorphic requirements, and here the factory pattern shines.

### The Problem

Our company, "Awesome Software With Biscuits Unlimited Ltd." has hit financial difficulties (partly due to stationary costs) and it is up to our boss, Bernie Hobnob to have an amazing idea. After tearing out his hair and scribbling on a notepad for three weeks solid, he comes up with something else. We are to temporarily stop selling biscuits on our website and to start selling dog clothes branded with our logo instead. While Bernie is on the phone to China, he tells us to get on with modifying the website. We have to support the selling of a brand new product.

### First Attempt

We crack open the source and find the following code, responsible for controlling the display of our website and printing out a few products to screen:<sub>[2](#ref2)</sub>

```csharp
protected void Page_Load(object sender, EventArgs e)
{
  lblTitle.Text = "Biscuits For Sale";
  lblTitle.BackColor = Color.LightCoral;

  IEnumerable<string> biscuits = new List<string>() {
    "Hob Nob",
    "Custard Creams",
    "Chocolate Digestives" };

  lstProducts.DataSource = biscuits;
  lstProducts.DataBind();

  IEnumerable<string> shippingLocations = new List<string>() {
    "England",
    "Australia",
    "Kazakhstan" };

  lstShipping.DataSource = shippingLocations;
  lstShipping.DataBind();
}
```

File Original.aspx.cs in the sourcecode.

The code seems straightforward enough. It’s changing a label, the labels colour, and them populating two list boxes; one with products and one with shipping destinations.

Bernie’s vague requirements suggest a new product type will have different titles, colours and products, so a decision and a branch need to appear somewhere.

Here is not what to do:

```csharp
// Attempt 1.  Don't do this!
protected void Page_Load(object sender, EventArgs e)
{
  string product = "clothing";

  if (product == "biscuit")
  {
    lblTitle.Text = "Biscuits For Sale";
    lblTitle.BackColor = Color.LightCoral;

    IEnumerable<string> biscuits = new List<string>() {
      "Hob Nob",
      "Custard Creams",
      "Chocolate Digestives" };

    lstProducts.DataSource = biscuits;
  }
  else if (product == "clothing")
  {
    lblTitle.Text = "Dog Clothes For Sale";
    lblTitle.BackColor = Color.LightGreen;

    IEnumerable<string> clothes = new List<string>() {
      "Branded cap",
      "Paw warmers",
      "Furry pants" };

    lstProducts.DataSource = clothes;
  }

  lstProducts.DataBind();

  IEnumerable<string> shippingLocations = new List<string>() {
    "England",
    "Australia",
    "Kazakhstan" };

  lstShipping.DataSource = shippingLocations;
  lstShipping.DataBind();
}
```

File Attempt1.aspx.cs in the sourcecode.

While this code works, and we can easily flip between the two product types by changing the string (or enum, or product id, or etc), seeing code like this should make you feel funny inside, like the having eaten too many biscuits feeling. Imagine when Bernie wants to try selling edible cutlery next week. The if/else branch grows another limb. And then he would like the foreground colour for text to depend on product type too. We have to add lblTitle.ForeColor to each of the branches, and our job has become the thankless task of dancing with the dreaded if/else octopus. Quick somebody call the keyboard doctor! Ctrl, C and V need replacing!

A design pattern gallops to the rescue.

### The factory pattern : First attempt

**Encapsulate code that changes** screams design pattern ideals, and here is our opportunity to do so. What is changing in our problem? The title, the background colour and the products. Encapsulate it. How? We don’t care at this moment, so this points to our old reliable (yet uncaring) friend, the interface:

```csharp
public interface IProduct
{
  string Title{ get; }
  Color BackgroundColour{ get; }
  IEnumerable<string> Products { get; }
}
```

It seems like the shipping locations may be suspect to change in future, but we ignore that for now. What is the worst that could happen?

So now we can move the changing data into their own subclasses, implementing the interface to suit their own particular needs:

```csharp
public class Biscuits : IProduct
{
  #region IProduct Members

  public string Title
  {
    get { return "Biscuits For Sale"; }
  }

  public Color BackgroundColour
  {
    get { return Color.LightCoral; }
  }

  public IEnumerable<string> Products
  {
    get
    {
      return new List<string>() {
        "Hob Nob",
        "Custard Creams",
        "Chocolate Digestives" };
    }
  }

  #endregion
}
public class Clothing : IProduct
{
  #region IProduct Members

  public string Title
  {
    get { return "Dog Clothes For Sale"; }
  }

  public Color BackgroundColour
  {
    get { return Color.LightGreen; }
  }

  public IEnumerable<string> Products
  {
    get
    {
      return new List<string>() {
        "Branded cap",
        "Paw warmers",
        "Furry pants" };
    }
  }

  #endregion
}
```

Our controlling class now becomes much simpler, bound to nothing more than the interface of IProduct:


```csharp
// Attempt 2.  Much better, but not yet perfect
protected void Page_Load(object sender, EventArgs e)
{
  IProduct product = GetProduct("clothing");

  lblTitle.Text = product.Title;
  lblTitle.BackColor = product.BackgroundColour;

  IEnumerable<string> products = product.Products;

  lstProducts.DataSource = products;
  lstProducts.DataBind();

  IEnumerable<string> shippingLocations = new List<string>() {
    "England",
    "Australia",
    "Kazakhstan" };

  lstShipping.DataSource = shippingLocations;
  lstShipping.DataBind();
}
```

The key line here is IProduct product = GetProduct(“clothing”). We have abstracted away all concrete data and removed all object instantiations from our main code. All that is left is the factory method itself:

```csharp
public IProduct GetProduct(string type)
{
  if (type == "biscuit")
  {
    return new Biscuits();
  }
  else if (type == "clothing")
  {
    return new Clothing();
  }
  else
  {
    // Returning a default
    // or throw exception, or panic
    return new Biscuits();
  }
}
```

File Attempt2.aspx.cs in the sourcecode.

This works because we are using the power of polymorphism, with the method signature guaranteeing we are returning objects of the type IProduct yet not saying exactly which ones. Inside the method, the objects created are specialisations of this interface, where we do create and return concrete Biscuits(yum!), or Clothing, or any other IProduct we decide to support in the future.

And this is usually where the discussion ends. Most people, and also at the time of writing, Wikipedia, state this as the factory design pattern. While it is a design pattern, and for most purposes quite adequate, it does not fit the original definition stated at the top of this page, and worst of all, breaks fundamental design pattern philosophy.

How is it adequate? Well, we have moved the changing code into this function. If a new product needs to be created, we add a new else if branch, create a new subclass and instantiate it. This works but breaks a key goal in creating reusable software: **Code should be open for extension but closed to modification.** Modifying code that works perfectly well always brings the danger of the code no longer working after the change. This code is definitely not closed to modifications. Imagine we sell our framework to other companies but we want to keep our source code protected. The company has no way of adding a new product type because they cannot get into our GetProduct function. We have no choice but to give away a core part of our source code, or modify it for them, neither of which is ideal.

If this does not convince you, then this might. An outbreak of chronic Biscuititis in Australia calls for an immediate ban of all imported biscuits. This forces us to change our shipping for one particular product, leading to code like this:

```csharp
...
IEnumerable<string> shippingLocations = GetShippingLocations("biscuit"); 
...
public IEnumerable<string> GetShippingLocations(string type)
{
  if (type == "biscuit")
  {
    return new List<string>() {
      "England",
      "Kazakhstan" };
  }
  else
  {   
    // Returning a default
    return new List<string>() {
      "England",
      "Australia",
      "Kazakhstan" };
  }
}
```

That’s right, now we have to feed and maintain two of these if/else monsters.

Let’s see what the factory pattern really is.

### The factory pattern: Final attempt

The factory pattern is actually an additional level of abstraction on top of what we have. We create an abstract class or an interface to define the factory, and then instantiate derived factories which state exactly how and which objects are created.

Here’s a factory wrapped around our problem, also with the helper function saying where we can ship products to:

```csharp
public abstract class ProductFactory
{
  public abstract IProduct CreateProduct();

  public virtual IEnumerable<string> ShippingLocations()
  {
    return new List<string> {
      "England",
      "Australia",
      "Kazakhstan" };
  }
}
```

And the easy implementation of the clothing factory returns the clothing products:

```
public class ClothingFactory : ProductFactory
{
  public override IProduct CreateProduct()
  {
    return new Clothing();
  }
}
```

For biscuits we can do something very similar, but remember some locations have banned our biscuits due to health risks.  
We can easily implement product specific behaviour by overriding base functions in the factory:

```
public class BiscuitFactory : ProductFactory
{
  public override IProduct CreateProduct()
  {
    return new Biscuits();
  }

  public override IEnumerable<string> ShippingLocations()
  {
    return new List<string> {
      "England",
      "Kazakhstan" };
  }
}
```

Our main function now removes the creator helper functions and instead delegates all product creation responsibility to a factory:

```csharp
protected void Page_Load(object sender, EventArgs e)
{
  ProductFactory factory = new BiscuitFactory();

  IProduct product = factory.CreateProduct();

  lblTitle.Text = product.Title;
  lblTitle.BackColor = product.BackgroundColour;

  IEnumerable<string> products = product.Products;

  lstProducts.DataSource = products;
  lstProducts.DataBind();

  // Use helper custom function within factory
  lstShipping.DataSource = factory.ShippingLocations();
  lstShipping.DataBind();
}
```

File Attempt3.aspx.cs in the sourcecode.

Maintaining this software is now a simple case of deriving a product from IProduct and deriving a product factory from ProductFactory to return this product. We are also offering the additional power of allowing the overriding of helper functions as needed.

### How does this help?

Astute readers may have realised we have returned to a fundamental problem. Look at this line:

```csharp
ProductFactory factory = new ClothingFactory();
```

We’re using the new keyword and instantiating an object! The very reason we’re creating factories is to remove the creation of concrete objects! Has this been a worthless exercise?

No. To make software work you cannot get around the fact you have to create a real object somewhere. There has to be an entry point into your code. Imagine we create a framework we want to lock down, yet want to allow other developers to extend. In our API, we can expose a function called SetFactory(…), taking in a class derived from AbstractFactory, which allows a developer to create a derivation of this very class and pass it into our closed framework. The framework then uses this unknown class via its known interface to create all of its objects. If you understand this you are well on the way to learning the open/closed principle – objects open to extension yet closed to modification.

Other benefits of using the factory pattern:

*   You can create a testing factory, for example a factory that creates and returns fake data instead of a factory that uses live data and modifies a live database. This way you can simulate tasks that traditionally are expensive and dangerous to perform – like the process of adding new users or testing the workflow of making a purchase. Swap in your mock factory to test the user interface and swap it back again when going live.
*   You can easily change the look, feel and behaviour of an application. You could write multiple front ends for your application. Use the factory pattern as a basis for skinning your GUI. You can also use the pattern to target different technologies; winforms, webforms and WPF for example.
*   A factory can wrap complex creation of an object. If a class’s constructor takes may parameters you can wrap the same class differently using different factories, giving you a much simpler API.
*   You can pass a factory class as function’s parameter to change its behaviour at run time. If this concept seems alien to you, you must have missed [Part one, the strategy pattern!](./articles/the-strategy-pattern/)

### Alternative Implementations

The factory pattern appears again and again in many guises. If you are subclassing to vary object creation in a program, then you have a factory. There are also abstract factories, which are worthy of having a design pattern all of their own. These are basically a further level of abstraction on top of the factory pattern, creating classes that have overridable methods defining factories to return. Very powerful indeed.

## Conclusion

The factory is a great pattern for protecting the internal workings of your source code. Write your code to work with interfaces, and then let the client define the factory responsible for creating the objects that conform to these interfaces. The levels of customisation and modability you then give to your application become practically infinite.

Soon after completing the website, Bernie has already placed the next product into production: Coffee flavoured paperclips. Horay for the factory pattern!

[Daniel Childs](mailto:daniel@webbiscuit.co.uk?subject=Factory+Pattern+Article)

7th February 2010

### Notes & References

<a id="ref1"></a>[1]: Design Patterns (the Gang of Four book), Factory Pattern, page 94

<a id="ref2"></a>[2]: In real life data may be read from a database or from XML. The design pattern still holds – instead of each factory hard-coding the return strings and collections there can be calls to your database or methods to read data from whatever file format you choose. It cannot be iterated enough that good design patterns truly are implementation agnostic.

### Further Reading

*   Gamma, Helm, Johnson & Vlissides (1994). Design Patterns (the Gang of Four book). Addison-Wesley. ISBN 0-201-63361-2
*   [Wikipedia’s article on the Factory Pattern](http://en.wikipedia.org/wiki/Factory_method_pattern)
*   [Design Patterns 1: The Strategy Pattern](./../strategy-pattern/)

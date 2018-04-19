---
layout: layout.njk
title: Strategy Pattern - Design Patterns
url: strategy-pattern
date: 2010-01-17
description: Learn when and how to use the Strategy Design Pattern
---

# Design Patterns 1

A series of articles exploring Design Patterns and creating useful examples in C#, putting the pattern into practice. This series is aimed at the programmer with good object-oriented knowledge and a curiousity of Design Patterns, but no prior knowledge of these is assumed. This week, we look at how separate operations from their algorithms and how to vary the algorithm easily, even at runtime!

## The Strategy pattern

The strategy design pattern is one of my favourites, quite easy to understand and will serve as a good introduction to the Design Patterns Series.

### Defined

The unofficially accepted definition for the Strategy Pattern is 
> Define a family of algorithms, encapsulate each one, and make them interchangeable. 
> Strategy lets the algorithm vary independently from clients that use it.
> -- <cite>Gang of Four<sub>[1](#ref1)</sub></cite>

The key phrases here are "Family of algorithms", "encapsulate" and "interchangeable". In other words, the strategy pattern encapsulates a collection of functions that do similar yet not identical jobs. For example, we might be reading in a file, but the file format is volatile. It could be we need to read XML format, or CSV format, or different versions of the file. We could be encrypting a document, but we would like to benchmark several encryption algorithms before deciding on a final one. We might create a game, but not tie the rendering to a particular version of DirectX, or even limit ourselves exclusively to DirectX at all.

In a nutshell, the strategy pattern helps us code without fear of making decisions that will negatively affect and bog down our codebase in future. It allows us to make grand sweeping changes with minimum effort. It yields solutions which are elegant, extensible and powerful. It can turn a project from spiralling defeat into a roaring success. Let’s look at an example.

## In Practice

Hashing a string is quite a common operation in programming. It is also highly variable, having more algorithms than I have  
underpants, even if I turn them inside out and wear them for an extra week. This makes a hashing function ideal for the strategy pattern.

### The problem

We are working for a company called "Awesome Software With Biscuits Unlimited Ltd." This is not the only problem. Our boss, Bernie Hobnob, tells you we need to retrieve MD5 hashes of strings for our range of security products.

### Testing

As model professionals, we decide to set up a test harness to verify our coding results. First, we need some verifiable data.

Let’s use the hash generator here to create our expected data:  
[http://www.whatsmyip.org/hash_generator/](http://www.whatsmyip.org/hash_generator/)

I am using "Web Biscuit" as the test string. The expected MD5 is

```no-highlight
md5: 26c6d2e0cfbbe42fff4bb9c1e8dece7d
sha256: 2072a868e8c5fa8331cad489bc63e6aff3ba8ccc057142c284ad0379e5becf8a
```

Now we need the test harness. We are using one helper function here:

```csharp
string ByteToString(Byte[] bytes)
{
	StringBuilder builder = new StringBuilder();

	// Loop through each byte of the data 
	// and format each one as a hexadecimal string.
	for (int i = 0; i < bytes.Length; i++)
	{
		builder.Append(bytes[i].ToString("x2"));
	}

	return builder.ToString();
}
```

And here is the test case:

```csharp
[TestMethod]
public void TestMd5()
{
	string md5WebBiscuit = "26c6d2e0cfbbe42fff4bb9c1e8dece7d";
	Assert.AreEqual(
		md5WebBiscuit,
		ByteToString(Hash("Web Biscuit")));	
}
```

### First Solution

We now implement an MD5 hashing function, and quickly come up with something similar to the following:

```csharp
public byte[] Hash(string input)
{
	MD5 hasher = MD5.Create();
	return hasher.ComputeHash(Encoding.Default.GetBytes(input));
}
```

We run the test case and it passes. Done! Works! Pub!

### Darkness Grows…

The problem with the first solution is we have created a system which is not extensible. Over the next few months, we distribute our Hash function in a dll used by millions of people, and the Hash("My crazy string") line finds its way into hundreds of products (we’re a very successful company).

And then something terrible happens. [MD5 hashing is found to be flawed.](http://www.esecurityplanet.com/patches/article.php/3446071/MD5-Flaw-Threatens-File-Integrity.htm)

Bernie Hobnob tells us we now need to use an SHA256 algorithm, but ultimately we are doomed. We still have to support an old API and we are not allowed to change any current behaviour for clients, so we are forced to write something like this:

```csharp
public byte[] Hash(string input, string type)
{
	if (type == "MD5")
	{
		MD5 hasher = MD5.Create();
		return hasher.ComputeHash(Encoding.Default.GetBytes(input));
	}
	else if (type == "SHA256")
	{
		SHA256 hasher = new SHA256Managed();
		return hasher.ComputeHash(Encoding.Default.GetBytes(input));
	}
	else
	{
		return input; // Or throw exception?
	}
}
```

And a default method:

```csharp
public byte[] Hash(string input)
{
	return Hash(input, "MD5");
}
```

With no way to recall our dll or force the rewrite hundreds of lines of code we are required to support an unsecure API forever. As time goes on, we need to implement more and more hashing algorithms. Before we know it, the Hash function turns into a giant if/ifelse statement, has babies and moves into your house. We find we need to change a core class everytime we discover a new hashing algorithm. A maintenance nightmare quickly develops. Within a few weeks the company collapses and one Monday morning we are standing in the dole queue talking to PHP developers.

### The Strategy Solution

As with all design patterns, the Golden Rule is that we _encapsulate the code that can change_. And what we have changing here is the hashing algorithm. If you are not used to design patterns and have a ‘classical’ object-oriented background (where you circle nouns to make classes and mark verbs as operations) you might not be used to thinking of algorithms as objects, but for our strategy pattern solution we are going to turn the algorithm into an object. Doing so will yield amazing flexibility.

We are abstracting an implementation from an action. When it comes down to it, the action needs to know _what_ it needs to do, but not exactly _how_ to do so. We are going to help this function by passing its algorithm as an extra parameter. Which algorithm do we support? All of them. Including the ones that have not been written yet. How do we do this? Have a think before letting your eyes wander down the page.

We use an interface! Correct. Top of the class for you. You will notice that design patterns make heavy use of abstract ideas, and interfaces are usually the epitome of abstraction, so the two walk hand-in-hand and date quite often. Let’s take a look at our new signature for the hash function:

```csharp
public byte[] Hash(string input, IHasher hasher)
```

You’ll notice it is not that much different to what we have, other than we pass in a hasher algorithm object. Now let’s look at the full revised function:

```csharp
public byte[] Hash(string input, IHasher hasher)
{
	return hasher.Hash(Encoding.Default.GetBytes(input));
}
```

It is different to what we had before, but not violently so. There is now no call to the MD5 classes in the .NET framework. This function knows nothing about MD5s at all. If you asked this function a question about an MD5 it would stare blankly back at you. This is because we have reprogrammed this function to hash a string via abstraction. The hasher object we pass in is concerned about MD5s, SHA256s and XYZ1248s, not the method managing the action.

The interface is very simply defined:

```csharp
public interface IHasher
{
	byte[] Hash(byte[] input);
}
```

With this reusable, extensible framework we can begin to create some concrete classes and use our new methods.

Here is an MD5 class using our new shiney interface:

```csharp
public class MD5Hasher : IHasher
{
	#region IHasher Members

	public byte[] Hash(byte[] input)
	{
		MD5 hasher = MD5.Create();
		return hasher.ComputeHash(input);
	}

	#endregion
}
```

And here is a SHA256 implementation:

```csharp
public class SHA256Hasher : IHasher
{
	#region IHasher Members

	public byte[] Hash(byte[] input)
	{
		SHA256 hasher = new SHA256Managed();
		return hasher.ComputeHash(input);
	}

	#endregion
}
```

And now one final important detail: how we use it. We modify our test harness to encompass the following:

```csharp
[TestMethod]
public void TestMd5StrategyPattern()
{
	string md5WebBiscuit = "26c6d2e0cfbbe42fff4bb9c1e8dece7d";

	Assert.AreEqual(
		md5WebBiscuit,
		ByteToString(Hash("Web Biscuit", new MD5Hasher())));
}
```

We use the hash generator webpage to generate data so we can verify SHA256 signatures. Notice the only bit of code that really changes in this test is the hashing object passed into the Hash function:

```csharp
[TestMethod]
public void TestSHA256StrategyPattern()
{
	string sha256WebBiscuit = "2072a868e8c5fa8331cad489bc63e6aff3ba8ccc057142c284ad0379e5becf8a";

	Assert.AreEqual(
		sha256WebBiscuit,
		ByteToString(Hash("Web Biscuit", new SHA256Hasher())));
}
```

And that is all there is to it. Well done, you have now learned the Strategy Pattern.

### How does this help?

What now? Has this actually helped us? We have replaced all these lines

```csharp
Hash("Web Biscuit");
```

with these lines:

```csharp
Hash("Web Biscuit", new MD5Hasher());
```

but has this solved anything? Don’t we still have a maintenance nightmare finding and replacing all those MD5Hasher() with SHA256Hasher() objects?

Firstly, we have eradicated the ever-growing if/ifelse problem. Our client code no longer needs omnipotent knowledge of every hash algorithm known to man. We do not need to change our code when we change the algorithm.

Furthermore, there is one more step we can take, and in the process we are going to take a sneak preview of the Factory Pattern. Look again at this line:

```csharp
Hash("Web Biscuit", new MD5Hasher());
```

Remember the Golden Rule? We have been breaking it. We are not encapsulating the code that changes. Here, we are coding against a concrete class which can most definitely change. There is an easy fix for this. Remembering that MD5Hasher is of the type IHasher, we can define a function as follows:

```csharp
public IHasher GetHashingType()
{
	return new MD5Hasher();
}
```

and replace our function calls as:

```csharp
Hash("Web Biscuit", GetHashingType());
```

Our concrete class is now defined in one place, which means one change when the hashing algorithm changes. This is a good thing.

Apart from maintenance benefits, look at the coding flexibility this has given us:

*   This function could sit on a server, so we can automatically control the algorithms of all our calling clients;
*   We could return different algorithms based on user settings;
*   We could return mock objects if we’re in debug mode, to aid debugging

### Alternative Implementations

We used interfaces and objects in the example above. You can also implement the strategy pattern using delegates, or, in C++, function pointers. This is left as an exercise for the reader.

## Conclusion

The strategy pattern is used to encapsulate changes and allows you to easily swap in and out alternative implementations, even at runtime. This makes it a great tool for benchmarking algorithms, responding to volatile requirements and quickly trying out new ideas.

The abstraction can be implemented indefinitely, either by the original author or 3rd parties, in known or unknown ways. The core libraries using these abstractions continue to be called with their internals unchanging and with minimum disruption to the system as a whole. These are good strong steps into robust software engineering.

Back at the office, Bernie Hobnob was so delighted with our hard work that he gave us a raise of two biscuits. Hooray!

[Daniel Childs](mailto:daniel@webbiscuit.co.uk?subject=Strategy+Pattern+Article)

17th January 2010

### References

<a id="ref1"></a>[1]: Design Patterns (the Gang of Four book), Strategy Pattern, page 267

### Further Reading

*   Gamma, Helm, Johnson & Vlissides (1994). Design Patterns (the Gang of Four book). Addison-Wesley. ISBN 0-201-63361-2
*   [Wikipedia’s article on the Strategy Pattern](http://en.wikipedia.org/wiki/Strategy_pattern)
*   [Design Patterns 2: The Factory Pattern](./../factory-pattern/)
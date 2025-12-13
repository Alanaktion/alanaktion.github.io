---
title: Applying SOLID principles to modern PHP
short_title: SOLID principles for modern PHP
description: SOLID principles are essential for modern PHP development, especially with frameworks like Laravel. This guide explains Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion – building better, more maintainable applications.
date: 2021-08-31
---

The SOLID principles are one of a few groups of software design principles that are often and easily applied to most modern software development. I work primarily in PHP development on the back-end, where object oriented programming is still the usual standard and SOLID is of particular relevancy.

In the modern PHP world, most new development is done in one of a few major frameworks. My framework of choice is Laravel, but each include some level of implied and explicit structure to your application which can determine a lot about how you plan the specifics of new feature implementations.

The SOLID principles include:

- Single responsibility — Each class should have one responsibility
- Open/closed — Objects should be open to extension, but closed for modification (private attributes, immutability, etc.)
- Liskov substitution — An extended object should behave the same as the object it extends for the behavior the original object exposes
- Interface segregation — Functionality should be split into small logical objects
- Dependency inversion — Rely on abstractions and interfaces when building common implementations, but don’t couple abstractions to an implementation

I personally find that these principles feel somewhat obvious once you’ve worked in OOP for a while, and that the SOLID acronym does little to help remember or educate (unlike, for example <abbr title="Don't Repeat Yourself">DRY</abbr>). However they’re still important to learn and truly understand, particularly when designing an application from early stages, to avoid running into major problems when trying to scale the application later.

Let’s take a look at how each one affects how I architect a PHP application.

## Single responsibility

One of the most common approaches to structuring a modern web application is the <abbr title="Model-View-Controller">MVC</abbr> pattern. Many variations of this pattern exist, but the basic concept is that you break an application into at least three major areas:

- Models, which represent the data objects (_e.g._ a record in a database table)
- Views, which represent the renderable representations of data
- Controllers, which connect the models and views for a given request

Within this simple architecture, there are a lot of things left open. Choices like where to put business logic, how to handle authorization, and many other common realities of an application are not predetermined.

To keep classes responsible for only their relevant behaviors, it is necessary to supplement MVC with additional areas. Common additions include Middleware and View-Models, which offer greater control over the different layers of the application.

In particular when building in a modern framework, splitting code into smaller logical areas within each MVC area is important to keeping things clean. As an example, putting everything related to a user login process in a single controller class may make sense when it only includes one or two routes to handle showing a login page and processing the POST action, but can quickly become too complex when you start including validation, two-factor flows, password resets, etc.

Instead of putting everything involved in a user logging in in a single controller class, splitting the behavior into several classes could include:

- A controller for each action (showing the form, handling the POST, etc.)
- A data transfer object for representing the form data, which performs validation
- A view model that ties the <abbr title="Data Transfer Object">DTO</abbr> values to the view

Each of those classes have one clearly defined role within the action the user is performing, and make it easy to find and change that behavior without affecting anything unexpected.

## Open/closed

When designing a class, it’s important to pay attention to which attributes are handled by the class internally, and which should be accessible to both outside accessors and child classes that extend the class. Failure to correctly enforce these conventions can have huge impacts on the quality of a codebase, and cause classes and behaviors to become entangled in very unpredictable and unmaintainable ways.

Various conventions and language constructs exist to both imply and enforce the open and closed nature of properties and methods on a class, including a very useful `readonly` keyword coming to class properties in PHP 8.1 later this year. I typically find that I make most class properties `protected`, and most methods `public`.

In cases where a class needs to perform some operation as an internal effect of a public method call, it often makes sense to put that behavior in a `protected function` within the class, especially if it is used in multiple places within the class.

When you _do_ need to share a property value with a class, most applications currently implement this indirectly through the use of getter functions, rather than exposing the property publicly. PHP 8.1’s addition of the `readonly` keyword will change this in many cases, as it will be safe to set a value once within a class constructor, and make it accessible publicly without allowing external behavior to mutate the property.

Using `protected` instead of `private` when declaring properties and methods is particularly helpful down the road when you need to extend a class to modify or wrap some portion of its original behavior. It is possible to override private class members, but doing so often requires completely reimplementing a large amount of the original class’s behavior, which can be error-prone and introduce many side effects, as well as making it more difficult to maintain.

## Liskov substitution

When extending classes, it’s important to keep in mind that the class may be used in a variety of ways, especially when building a library that’s used in multiple projects. To avoid breaking implementations, keeping the public behavior consistent is critical.

A common point of concern is method signatures. Given a method that expects a certain list of parameters, extending that class should not change the order, type, or structure of the parameters. When it is necessary to supplement the parameters, ensure that behavior when called with parameters designed for the original implementation still behave as the parent class does.

Here is a simple example of extending a class while preserving the initial behavior:

```php
class ObjectA
{
    public function updateCount(int $count): void
}

class NotifiableObjectA extends ObjectA
{
    public function updateCount(int $count, bool $notify = false): void
}
```

The default value on `$notify` is required to prevent callers from

One of the best ways to avoid accidentally changing method signatures is to ensure that strict types are used for arguments and return values whenever possible. PHP will enforce types being identical between implementations.

Without defined types, we could easily break this behavior without the language enforcing anything:

```php
class ObjectB
{
    public function updateCount($count)
}

class NotifiableObjectB
{
    public function updateCount($notify, $count)
}
```

PHP 8 introduced [named arguments](https://wiki.php.net/rfc/named_params) which, when used, mean that the _name_ of each argument in your method definition must also stay unchanged in new implementations. It’s also a good idea to avoid changing argument names entirely for any public methods when using PHP 8, as this can easily break functionality anywhere in an application.

There are many more complex things to be aware of to safely extend a class, but they are often more implementation-specific, and a result of poor design of the initial class. In those cases, it’s often necessary to find where the class is being used and manually verify that the behavior is not changed unexpectedly.

## Interface segregation

Segregation of code goes along well with both the Single Responsibility and Dependency Inversion principles. In particular, it’s important to keep classes and interfaces small, splitting common behavior into separate interfaces.

This is particularly helpful to avoid requiring an implementer to add definitions for behavior that is not supported or is unrelated to an implementation of an interface.

For example, let’s define an interface of common features of a YouTube channel:

```php
interface Channel
{
    public string $id;
    public string $name;

    public function listVideos(): array;
    public function listPlaylists(): array;
    public function listPlaylistItems(string $playlistId): array;
}
```

This works fine for YouTube, but later on if it’s necessary to support another video platform that doesn’t include playlists for example, the expected behavior of the playlist-related methods becomes a lot more complicated.

You could simply return an empty array when `listPlaylists` is called, but what about `listPlaylistItems`? Do you throw a generic exception? Do you introduce a new exception type and hope other implementations also throw the same exception? All of these options have negative side effects and can break the application and result in widely varied implementations, which is exactly what we’re trying to avoid by using an interface!

Instead, it’s best to define interfaces in a way that is more flexible for future implementations:

```php
interface Channel
{
    public string $id;
    public string $name;

    public function listVideos(): array;
}

interface ChannelWithPlaylists extends Channel
{
    public function listPlaylists(): array;
    public function listPlaylistItems(string $playlistId): array;
}
```

If you architect the application this way from the beginning, code that’s aware of the playlist functionality and needs to work with playlists can easily check if it’s supported by the platform via `$channel instanceof ChannelWithPlaylists`.

This principle can be hard to implement effectively since you never _really_ know what’s going to happen to your application in the long-term, but doing what you can to get this right early on can be very impactful.

## Dependency inversion

Correctly structuring the layers of an application is important to avoid making things too tightly coupled and dangerous to change. For example, it is common to have a Controller that connects a DTO to a View-Model.

A View should not be accessing an HTTP request directly, for many reasons including security, validation, and extensibility, so additional layers to facilitate that flow are necessary to ensure all aspects of the HTTP request can be handled in an intuitive and maintainable way.

It is also important to use interfaces and abstract classes whenever there is a chance that an object will need to be implemented differently in another context. Doing this _before_ you have a need for multiple implementations is important, as it’s harder to restructure an existing application than it is to design with abstractions to begin with.

Having multiple implementations is particularly common in unit testing, as testing directly against an implementation of a class may require additional things like a database, web server, or external API access. For example if a a typical implementation of a class requires accessing a third-party API, it can be undesirable for many reasons (rate limits, credential sharing, performance) to trigger those same API calls during automated testing.

Instead, it’s best to make a mock implementation of the interface, matching the behavior of the external API with hard-coded or procedurally-generated responses, and handling data in a similar way to the actual API. Changing which implementation is used in the testing context can depend on how you’re running tests and which framework you use, but if the choice is between mocking API responses and not testing API integrations at all, it’s definitely best to test them.

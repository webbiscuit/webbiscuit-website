---
title: Enterprise Software for Vampires and Werewolves
tags:
  - enterprise software
  - event based architecture
  - vampires
  - werewolves
date: 2021-01-29 22:30:00
---

![A Vampire @imgur](https://i.imgur.com/VDSeZZ9.jpg "A Vampire @imgur")

Problems with enterprise systems usually fall into two categories:

1. There's a bunch of software systems that are all doing their own thing but need to talk to each other
2. There's this monolithic system that is hard to change and tries to do everything but we want smaller things that are more focused

If you solve these problems badly you can get into a vicious cycle where one causes the other, forever more. This is great news for the consultancy you've brought in but as an enterprise you probably want to get to the root of the problem. Let's see what it is.

Here's a typical business: Doctor Frankenstein's Extra Bodyparts Limited. It's an online service to order spare parts for your monsters. To outsiders, it's a perfectly successful and respectful business. Internally however, it's turmoil and the business is having to hire more and more creatures to handle its processes.

The sales department is exclusively manned by vampires. The vampires hate the werewolves that run the HR department. Goblins are in finance, they don't like werewolves at all and vampires only visit to terrorise them. Harpy hags in marketing enjoy vampire and werewolf sandwiches, sprinkled with goblin. Everyone hates the ghouls in IT for obvious reasons. These toxic relationships are seen all over, even in human companies. Departments don't like interacting with each other. The business is run in silos and everyone had their own system for managing things. Silos aren't desirable, but often emerge naturally as they follow management lines or project budgets.

An issue is if someone new joins the company they have to be added to the system in HR and the system in finance. When a customer makes a purchase, that has to be written to the system in sales, and someone has to type that into a finance system. It's a massive synchronisation effort that non-computers are really bad at. Because communication between departments is poor, lots of things go wrong and systems have multiple versions of the truth, which everybody swears is true, and there are many fights and unnecessary deaths. Maybe you've worked somewhere like this.

So the solution is to have this one unifying system that supports everybody right? You can have a sales module, a finance module, a misc module and it's all backed by this universal database, the One True Datasource. It will be expensive, it's enterprise software. You will interview each department, capture their requirements and build this new software system. You will try your best, but Conway's Law will emerge and enforce that interactions between your modules will be crap, and the only unifying feature will be that everyone hates it with a passion. Doctor Frankenstein has spent a lot of money on this system so will force everybody to use it, but secretly everyone will go back to their own systems and this will just become some additional admin headache containing some other version of truth. Oh, you also have a monolith.

What's the ideal solution then? Well, smashing down department boundaries may be impossible (although a consultant is in a unique position to suggest this) but I believe there's an architectural technique that transcends silos and unique ways of working. Events! Not like a christmas party where you vomit on your boss or make career-limiting decisions on the dance floor, but tiny something-has-happened-in-the-business events. There's a new starter -> New starter event. There's a sale -> Sales event. All of these events are posted to an event hub sitting at the heart of your organisation. It's the backbone that all of your systems will hang off. The event hub broadcasts all the events it is sent. Everybody's system listens to events on the event hub and handles them if they want to. New sale? Yeah, we want that. New starter? Boring, throw that one away. The idea is everyone gets to use systems they like and enjoy, and these systems generate and consume events not in isolation, but attached to the rest of the organisation.

Sadly, most systems aren't open to be used this way. All those systems are going to need adapter layers that will generate and consume events to turn them into actions. This is an ongoing software effort - and why every business is a software business, even if you don't sell software. Ghouls win. But this system may be non-modifiable. In the future, I hope software will be built with a pluggable future in mind. We sometimes see APIs and data exports, but it usually feels like an afterthought. Automation is actually more important than the UI, but barely gets a fraction of the attention. Until software is regulated and a standardised industry, we'll continue to see a stream of terrible software barely holding up behind a pretty front. When robots are writing software, of course all of that software will speak to each other, if nothing else but to taunt human developers. This is how it's done. Honestly, robots writing software is more likely to happen before software is regulated or standardised. We can't even agree on how to use white space, nevermind end ancient wars between vampires and werewolves.

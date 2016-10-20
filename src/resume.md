---
layout: layout.html
title: Resumé
url: resume
cat_cv: true
---

# Daniel Robert Childs

Email: <mailto:daniel@webbiscuit.co.uk>  
Website: [www.webbiscuit.co.uk](http://www.webbiscuit.co.uk)  
LinkedIn: [www.linkedin.com/in/daniel-childs](https://www.linkedin.com/in/daniel-childs-4719ba3b)  
GitHub: [github.com/webbiscuit](https://github.com/webbiscuit)

## Experience

### Software Lead  
**Romax Technology**  
**March 2016 – Present**  

I became software team lead in March 2016.  The biggest change I have made so far is to move to a Kanban planning schedule, and to move us from a 6-month release cycle 
to a weekly one.  I lead a small but talented team, with an objective to integrate more closely with the other software teams in our company.

I have identified the biggest problems in our codebase and have adopted Angular 2 as our frontend framework.

I am moving us away from the monolithic application methodology and breaking this down into smaller, reusable components - the microservices model.  
This is currently a work in progress, but I am seeing this is allowing better collaboration between teams.

I am currently working on a web application in Angular 2 that will bring in summarised data from our various products.  Everyone is excited about this and this will
prove out the microservice model for us to go forward with.

Technologies used:
- As below, plus
- Angular2, Typescript

### Senior Software Developer
**Romax Technology**  
**January 2014 – March 2016**  

Fleet Monitor is a web software package used by wind monitoring engineers to analyse and report on the state of wind turbines.

When I first joined Romax, the Fleet Monitor front-end was a C# application.  The back-end was a python application running on Linux.  I began as a dev-ops role, with my initial
responsibilities to simplify the packaging and installation of the program and to simplify and automate the processing of new data.  The data sources were very varied, and here 
a variety of techniques were used, from simply reading from FTP and calling REST Apis, to more complex screen scraping, and byte parsing.  This all had to be managed by a scheduling 
system, which needed to be completely transparent and usable by monitoring engineers.  I wrote this and this was a success.

During my time here I introduced GIT to the team and migrated existing source code from SVN.  I built GIT and Jenkins servers which were adopted by other teams in the company.
The C# app was rewritten not long after I joined and became a web application.  I maintained the C# application while the rewrite was taking place, and worked on scripts to ensure
our customers had a good upgrade path and no data was lost.
I became software team lead in March 2016.

Technologies used:
- Python, Django, Javascript, Linux (Centos, Fedora), Bash, Postgres
- Amazon Web Services (AWS)
- Jenkins, GIT, Jira

### Senior Software Developer
**Nikon Metrology UK**  
**February 2010 – December 2013**  

I was brought into Nikon on a 3-month contract to help upgrade their software and fix Windows 7 compatibility issues.  My preliminary task was to move an existing MSDE 2000 
database to Sql Server 2008.  I wrote update scripts, improved the installation and troubleshooting process and replaced deprecated libraries.  They were legacy data corruption 
issues so I introduced transactions and improved the database structure.  I built a robust templated ADO wrapper and on top of this I built a data access layer for the product, 
centralising the data access for the entire product range.  Later, I built a data caching layer.

The product historically had a lot of installation issues at industrial sites which typically involve secure systems locked down tightly.  I fixed a lot of installation problems 
and wrote an installation troubleshooting guide for on site engineers to describe fixes for common issue which was well received.

As a full time senior developer I worked on Nikon Metrology’s flagship product - a CAD oriented package written primarily in C++, which drove industrial robotic arms and 
collected data using lasers and touch probes.  The scanning paths of the robots could be programmed using the software, or the software could measure parts using existing programs.  
Once data was captured, it was then analysed using complex mathematical equations, mainly for fault tolerancing and passing off parts.   
It is a large product used by industry leaders, especially in the automotive industry.  It contains millions of lines of code written over the last 20 years.  
To improve our workflow, I introduced Boost and unit testing to the development team.
I worked in even more core areas;  
I redesigned a twin/multi-column feature, which involved two or more machines speaking to one other, transferring and synchronising data between machines.  This involved 
extensive multi-threading and WinSock.  
I also rewrote the database administrator tool using C#, opening up more options for backup, restoration and viewing of customer data.  
I worked on a reporting package aimed to unify the family of products from Nikon Metrology.  There were three core products maintained by my team in the UK, one 
in Belgium and one in the US.  The foundation of the unification came from a common database and careful design of highly reusable components.  I replaced deprecated COM 
libraries and made the changes to make the software 64-bit ready.

Technologies used:
- C++, STL, MFC, Boost, C#, SQL Server 2008 R2, T-SQL, COM
(Other)
- Subversion, Jira

### Software Developer (Junior-Senior)
**DriveSentry Inc.**  
**August 2005 – November 2009**

DriveSentry was a personal data protection company.  The main product was anti-virus, encryption and anti-rootkit software.  
There was also a smaller stand-alone USB version of the main product (DriveSentry GoAnywhere).
DriveSentry was a startup company and this was a brand new product, designed and written from scratch.  
I was at DriveSentry from the first day to the last, becoming a valued member of the team with knowledge of the entire system from top to bottom.

We used a variety of languages from C# to C++, moving more to C++ as the program became more mature.

I was primarily responsible for the UI throughout its iterations, from C# to C++.  I was also responsible for the rules library (database of which programs are allowed 
to write where) and the lookup engine (asynchronously responding to notifications from the custom driver, looking up rules, performing security checks on the target and 
source files, and finally notifying the GUI).  This was thread-heavy and a good learning experience of Windows as an operating system.  We had to be creative to get around 
a lot of problems at the lower level.  We were technically successful with the product appearing on the shelves in PC World and we were also on the cover disk of PC Pro. It was
also a challenge to solve the increased traffic spike at these time.
I was heavily involved on the server side, designing a complex advisor database and the client’s advisor library which communicated to the servers.  
We were putting our customers in the cloud before I knew what this word meant!  We were early pioneers of whitelisting (storing signatures of known good programs) and
handled tens of thousands of transactions per day.  I am proud of that database.

I later reworked the encryption and licensing modules, and wrote the data synchronisation library.

Technologies used:
- C++, STL, MFC, SOAP, XML
- C#, SQL Server, IIS, SQL, XHTML, CSS
- Perforce, Source Safe, Mantis

### Junior Software Developer
**Bitarts**  
**December 2003 – July 2005**  

Bitarts was a software security firm, specialising in copy protection and anti-piracy software wrappers.
As a graduate, my main task here was to create a web front end (PHP) for an Oracle database, which provided administrative support for online software activation.

Technologies used:
- PHP 5, Apache, Oracle, C++, Perforce, Solaris, SQL

#### Earlier Work
PHP and MySql websites for small companies.  I wrote a couple of games using C++ and DirectX 8.0.
 
#### Self employment

I am running and selling a product online to help people write and visualise interactive stories or choose your own adventure games.  This can be found at 
[www.crumblyheadgames.co.uk](http://www.crumblyheadgames.co.uk).
The product uses the latest features of C++11, MFC, Boost, GraphViz and Crypto++.

I love this product because I have taken it from an idea on scrap of paper all the way through design, coding, marketing and even a few sales!  
I have learned a lot in this process, mostly about the commercial side of a business which I now appreciate a lot more.
The next evolution of this product is to take it from the desktop to online, which I will when time permits.

## Education
### Nottingham Trent University 2001-2003
BSC Computer Science (2:2)  
Final Year Dissertation: The Simulation of Genetic Inheritance

### West Nottinghamshire College 1999-2001
HND Computer Studies (MERIT)

### The Manor Comprehensive School 1992-1999
4 A-Levels:
- Maths (D)
- Biology (D)
- Physics (E)
- General Studies (B)
Nine GCSEs

## Interests
I am a keen self-taught guitarist and enjoy watching live bands.  Working at a sub-company of Nikon gave me access to a lot of high quality camera equipment, so I 
enjoyed the discounts on the products and in June 2012 finished a part-time photography course with a distinction.  I like reading (not just technical manuals!)  
I also enjoy cooking and socialising.

I love programming and keep up-to-date with the latest technologies and techniques.  I managed to negotiate a subscription to Safari Books online with my current company, which
is an incredible resource.  I love getting feedback from people who use my software.

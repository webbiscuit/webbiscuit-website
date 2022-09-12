---
title: Why will AI have to ruin software development before making it better?
tags:
  - chess
  - programming
  - AI
date: 2020-11-29 19:40:00
---

![How my chess games end @imgur](https://i.imgur.com/gMTa7TU.png "How my chess games end @imgur")

The TV has been working overtime this year. If the highlight of lockdown #1 was The Tiger King, lockdown #2 has to be The Queen’s Gambit, pulling off the impossible by making chess cool and sexy. I imagine in lockdown #3 we’ll watching a tv series about a monkey princess bashing out C++ code with a hammer, and it will be awesome.
But let's talk about chess and the rise of AI, because it’s a nice small sandbox with some interesting developments. We can then wildly speculate about what AI can teach us about writing software.

# Chess & AI

In 1996 a machine was beating the best chess playing human. Chess AI works by scoring the current position, calculating the scores of its next moves and picking the best one. Each piece has a value, and each engine will weight various positions differently - the number of squares a bishop can see gives bonus points, pawns linked to each other give bonus points, stuff like this. Given enough value tweaking and processing power the AI can calculate moves a lot better than a human can. This isn't really intelligence, it is a minmax algorithm which lots of computer games use when it has to do something which doesn't look like a random move. Chess is a very well studied game, and so the pieces and board can be scored pretty accurately. This means the computer makes very solid moves. For many years the goal of mastering chess was to learn the move the computer would make. Overnight, AI had made chess boring for everyone.

Stockfish is currently the strongest chess engine which uses the min/max method. It has a chess rating of around 3500. For comparison, the current highest rating human chess player is 2840.

AlphaZero is an AI engine which appeared in 2017 and does things differently. If Stockfish is the respectable chess scholar, AlphaZero enters a chess tournament by kicking the back doors in, smokes, swears and drinks as it beats you at chess, then rides off on a motorbike with your girlfriend. Because AlphaZero doesn't know anything about the value of pieces or how to point positions, all of which are human inventions. AlphaZero was told the rules of chess and the objective (checkmate the king) and then went off to play thousands of games with itself. To begin with, it played randomly, but after each game it played again, reusing parts from games it won and discarding ideas from games it lost.

After 24 hours of training, it was ready to play Stockfish. What happens when an unstoppable force hits an immovable object? Well,AlphaZero, obviously. AlphaZero plays better than the flawless Stockfish because Stockfish plays like the perfect human - AlphaZero has no such limitations. It makes wild sacrifices to force the opposition into bad situations and shows that chess should be played as a positional game rather than an arbitrary point game - because the objective of chess is not to score the most points but to checkmate the king. Chess becomes interesting again because it's tearing up the theory books and teaching everyone new ways to play.

# Software & AI

Here's our awkward segue into the future of software. There's an idea that given enough processing power and clever algorithms, much like the Stockfish engine did for chess, AI will eventually be able to write software. We're already attaching points to our software development (story points, gantt charts), and maybe the early AI engines will use these values to evaluate its performance and determine if the software it's generating is correct. And yes, this will sap all the joy out of software development and be really boring for a while. Software development no longer being a technical creative pursuit but instead an activity of trying to figure out weird code written by somebody else and clicking buttons. Like now but worse. Many software developers will leave the field, and having no practical skills and little social experience will be dead within a week.

The next generation of AI written software will appear in order to address end-user concerns that all software seems to be a copy of what has come before, and their user needs aren't actually being met. This will be the AlphaZero stage, which will approach software by disregarding story points and requirements and other silly human generated artefacts. Instead, it will be objective based. It will generate the software that truly solves problems in unique, incredible ways and teach everyone how we should really be writing software.

Here's where things get really interesting. All this is some years away, but in the meantime maybe we can jump to the lessons learned that the second wave of AI problem solving will show us. In chess, AI has shown us the best way to play is to be focussed of the goal to checkmate the king, and not to have the most points or the best pieces on the board. In software, we should be focussed on that end goal of solving the user need the best way - I believe this means writing software as lots of small throwaway experiments, creative iterations and true MVPs. We can optimise story point delivery but this is wrong - AI will show that this is not the right way to deliver the best software. Some methodologies are on the right lines, with some agile techniques and #nostorypoint ideas but I'm sure there's still a lot to learn and we can go a lot further.

Maybe if TV hadn't been so good maybe someone would have figured it all out by now.

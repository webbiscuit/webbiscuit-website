---
layout: post.njk
title: Debugging memory leaks in Visual C++
url: cpp-memory-leaks
date: 2010-02-07
description: Learn how to debug memory leaks in C++
---
# Debugging memory leaks in Visual C++

In modern C++, you should not really be seeing any memory leaks. However, not all C++ is modern, and you will see them crop up from time to time. Find out how to deal with them if they appear.

Sometimes, at the end of a program, Visual Studio will detect memory leaks and dump out blocks of memory which have not been deallocated correctly:

```
  Detected memory leaks!
  Dumping objects ->
  {103674} normal block at 0x12EF01E0, 100 bytes long.
   Data: <ÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍÍ> CD CD CD CD CD CD CD CD CD CD CD CD CD CD CD CD
```

If you are lucky the leaked memory block will have a filename and line number, and double clicking will take you straight to the line of code which caused the memory leak. Other times, like this, this information has not been recorded. But there are ways to trace leaks like this.

The leak will always report a number in curly brackets, in this case 103674\. You can add the following line to your code, and rerun the program.

```
    _CrtSetBreakAlloc(103674);
```

When the program allocates this block of memory, it will be treated as a breakpoint. The program will halt and you will be able to look up the call stack and find where the leak has come from.

You need to put this line before the allocation takes place, so it needs to go in the code as early as possible. Main or DllMain are usually good candidates. If your programs uses dlls you have control of, try putting the line in the first dll which is loaded.

You can also set the allocation break point at runtime – break into the code as early as possible and go into your watch window. Type the following:

```
    {,,msvcr90d.dll}_crtBreakAlloc
```

and set the value to the leak number. You may need to change the dll to match your version of visual studio, for example msvcr70d.dll, msvcr71d.dll, msvcr80d.dll or even msvcr100dll.

## Tips & tricks for successful debugging

*   The leak may be reported in code that is impossible to view, for example a dll. In this case try the next one down in the list, it is possible they are related. Finding the one fixable leak and fixing it usually fixes loads.
*   If the program never actually breaks but the leak is still reported, you will need to set the allocation break point earlier in the program’s execution.
*   It is possible that the actual allocation block number changes in-between runs. If you find this happening, try to isolate the problem area if possible and try a range of values from lowest to highest around the suggested block number.

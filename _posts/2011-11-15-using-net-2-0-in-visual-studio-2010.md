---
layout: post
title: Using .NET 2.0 in Visual Studio 2010
date: 2011-11-15 17:26:48
---
Microsoft .NET Framework 4 introduces some nice new options, but if you want to more easily distribute your software, .NET 2.0 is the most widely used, as any computer running Windows XP Service Pack 3 or later will have it installed.  Changing an existing project or creating a new one uses the same method.

In the Solution Explorer, right click your project, and click Properties.  In the Compile tab, click Advanced Compile Options at the bottom.  In the window that opens, switch .NET Framework 4.0 to the desired framework version.

Existing projects may require some small code modifications in order to build correctly, but it is very beneficial to build your software on a more widely available framework.
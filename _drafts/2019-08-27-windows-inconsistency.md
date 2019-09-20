---
layout: post
title: Inconsistency in the Windows experience
date: 2019-08-27 18:58:00
excerpt: Comparing the UX of various aspects of Windows 10, and seeing how inconsistent the experience is.
---

I [still](/2017/06/20/windows-10-is-terrible/) don't like Windows 10. All of my original complaints are still issues, but there's so much more to the Windows experience that is just bad.

One thing I'm frequently frustrated by is application management. On Linux, if you use it correctly, every application (graphical and CLI), every library, and even your OS itself is installed and updated consistently via the package manager. macOS isn't quite as seamless, but applications are only really installed in three ways: the App Store, a .dmg image, and a package installer. You can use `brew` too if you want, which isn't perfect, but works well enough.

On Windows, applications come with infinite varieties of installers, and install all over the place. Microsoft tried to standardize this with MSI packages and the Program Files directory, but both of those have minor limitations that many developers work around by just not using them. Chrome, for example, installs to an unprotected directory in `%APPDATA%`, using a completely custom installer. Microsoft's own installers are incredibly inconsistent as well, with Office, Visual Studio, VS Code, and Teams all using completely different installers (none of them MSIs), though they at least all install the bulk of their executables in Program Files.

Microsoft's own first-party apps are also a great example of how inconsistent Microsoft is with visual styles. Even without installing anything extra, Windows 10 ships with WordPad, Calculator, and Paint, all of which look like they're running on completely different operating systems built by completely different companies. It gets even worse with applications like Visual Studio and Office, where they have very custom UIs that don't seem to use any of the native Windows UI.

The command-line experience on Windows is a mess too. Many things still rely on cmd, and that's where many users' knowledge of the Windows command-line will be, but with PowerShell being the default now it makes sense to want to transition. This shouldn't be *too* difficult, except that PowerShell is almost completely incompatible with cmd. It's also just bad 🙃

PowerShell is excessively verbose. Things like:

```cmd
MKLINK C:\src C:\dest
```

become:

```powershell
New-Item -Path C:\dest -ItemType SymbolicLink -Value C:\src
```

...for some reason. You can always use `cmd.exe /c ...` from PS, but it's incredibly stupid that that's necessary. It's also **incredibly ridiculous** that Windows by default doesn't even let you run scripts in PowerShell. I get that running scripts can potentially be insecure, but so is running any executable and those don't require any system configuration changes to enable (yet). PowerShell is decent for Windows system administration, but for development purposes where everyone's been using bash already for decades, it just feels so terribly implemented.

PC Settings is another great place to look if you want to see just how unfinished and pieced-together Windows 10 is. It's gotten a lot better over the years, but about 2/3 of the advanced options in PC Settings still just open Control Panel windows for things, and many of the things that have been migrated over are missing much of the functionality of the original control panel items. Control Panel was *really, really bad*, but at least it had everything you needed somewhere in there.

Windows 10's Dark Mode is a welcome new feature, but it needs so much more work to feel complete that it is only useable as a neat re-skin rather than something to actually change your whole OS to be dark. Linux has had fantastic theme support (including light/dark options) through GTK and QT for forever, and Apple went all-out on their dark theme in Mojave, completely updating all of their first-party apps and making a complete redesigned dark version of UIKit available to all third-party apps without their devs needing to do much at all to implement it.

Overall, Windows 10 has definitely improved over the years, but it still has a long way to go to be an OS I'd consider *good*.

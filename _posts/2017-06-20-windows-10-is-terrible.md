---
layout: post
title: Windows 10 is Terrible
date: 2017-06-20 08:44:00
excerpt: Windows 10 is still terrible. Especially on Surface hardware.
---

I frequently whine about not liking Windows 10, but often don't explain why. Usually that's because I'm ranting on Twitter and don't feel like breaking my rant into several tweets.

I think I need to just write a solid list of reasons Windows 10 sucks. Here we go...

- Pre-installs terrible mobile games even on paid installs and domain-joined computers
- Shows advertisements on lock screen and Start menu by default even though I paid $200 for a license and $3000 for a Surface Book. Apple doesn't do this and they've given OS updates for free for ages.
- The Start menu doesn't always open. This is much better now than when Windows 10 first launched, but it's still far more common than it should be.
- Cortana is no longer optional, I can't just have a classic Start menu search without all the tracking
- Explorer crashes nearly every time I do a file operation on more than 10,000 files.
- Connecting to a VPN takes far more steps than it should
- PC Settings is still missing most of the functionality from Control Panel
- Typing to search directly from Start doesn't work if you've interacted with the menu at all, even just scrolling. As a keyboard-heavy user, this behavior is quite frustrating.
- Estimated remaining time on battery is only visible in the tooltip, not the power menu that displays when you click the icon. This is impossible to access in Tablet Mode, where it is most useful.
- Windows 10 creates empty folders for Documents, Downloads, Pictures, and Videos in my user folder every time a major update is installed. I configured those special folders to use custom locations on different disks.
- Windows randomly does invisible background installations that often take nearly an hour, while claiming that all updates are installed.
- Defender is very slow when working with large numbers of small files, often taking 70% or more of my CPU when installing or updating software, or working with Git repositories.

Many of my issues with Windows 10 are from longstanding issues with Windows overall.

- Windows breaks really easily on deeply nested paths or files with long names. Almost all applications fail to use the files correctly, and even PowerShell can't access or delete files with long paths without using hacky syntax tricks. This is the case even if "Long path support" is enabled. NTFS doesn't care, only Windows filesystem libraries do.
- The Disk Management application refuses to work with some disks and partitions that are supported just fine in DISKPART
- Command Prompt and Powershell have very weird text selection, scrolling, and resizing behavior. You're better off using WSL with [a third-party terminal emulator](https://github.com/mintty/wsltty) purely because of how bad `cmd.exe` is.

Microsoft's own Surface products have even more issues than my other PCs. I've heavily used both the Surface Pro 4 and Surface Book with Performance Base and experienced similar issues on both.

- The trackpad frequently stops accepting scroll gestures and tap-to-click
- The Surface Pen sometimes disconnects completely
- The Surface Pen buttons frequently stop working, leaving only the pen tip usable.
- Touch input stops working intermittently
- Waking from sleep on the Surface Book by pressing a keyboard key only works about 10% of the time. The rest of the time, the keyboard base wakes, but the tablet stays off.
- The wireless network adapter sometimes disappears until a reboot
- The Type Cover on the Surface Pro 4 often stops working and needs to be physically reconnected. That's quite ridiculous for a $130 keyboard.

This is just the stuff I can think of off the top of my head. I'll probably add more as I think of it. Windows 10 has come a long way from the absolute pile of garbage it was the first year or so after RTM, but it still has a long way to go.

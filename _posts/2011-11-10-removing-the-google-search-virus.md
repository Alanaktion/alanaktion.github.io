---
layout: post
title: Removing the Google Search Virus
date: 2011-11-10 09:57:35
---
I've seen this one a lot lately.  Basically, it shows a fake version of the Google and Yahoo! search engines in the attempt to track all of your personal information that you enter into those sites. Even if you don't care about your information getting stolen, it prevents you from using Google Apps services such as Gmail, Google Voice, and in many situations, even the basic Google search engine will not work at all.

The biggest problem with repairing this virus is that it is technically not so much a virus as a setting. There is no malicious software causing it, no secret tracking cookie, no browser extension. It is simply caused by a Windows setting, not in the Internet Options, the Windows Registry, it is not found in the Control Panel, or even in the Network and Sharing Center or the Computer Management. Therefore no anti-virus software or registry cleaner will ever find it.

## Diagnosing the Problem
Obviously you need to see if you actually have this problem before trying to remove it. The easiest way to see the problem is to look at the <a href="http://www.google.com/" target="_blank">Google Home Page</a>. Check the **copyright date** at the bottom of the page. If the year is incorrect, you probably have the virus. Another method of checking it is to go to <a href="https://mail.google.com/" target="_blank">Gmail</a>. If the page returns a 404, 403, or 500 error, you've got the virus.

## Repairing the Problem

### Windows Vista/7
1. Open the Start Menu, click "All Programs", click Accessories, then right-click Notepad, and click "Run As Administrator".
2. Allow access if a confirmation message is shown.
2. In Notepad, click "File", then "Open...", then type `%SystemRoot%\system32\drivers\etc\hosts` and click "Open".
4. Remove any lines from the file containing `google` or `yahoo` and save the file. The virus should now be repaired!

### Windows NT/2000/XP
1. Open the Start Menu, click "All Programs", click Accessories, then right-click Notepad, and click "Run As..." and select "Administrator" or a user account with administrative privileges.
2. In Notepad, click "File", then "Open...", then type `%SystemRoot%\system32\drivers\etc\hosts` and click "Open".
3. Remove any lines from the file containing `google` or `yahoo` and save the file. The virus should now be repaired!

### Mac OS X
1. Open `/private/etc/` in Finder and open the `hosts` file in a text editor.
2. Remove any lines from the file containing `google` or `yahoo` and save the file. The virus should now be repaired!

### Other UNIX/Linux
1. Using a text editor as **root**, open `/etc/hosts`.
2. Remove any lines from the file containing `google` or `yahoo` and save the file. The virus should now be repaired!

### Android OS
1. Using a text editor with root access, open `/system/etc/hosts`.
2. Remove any lines from the file containing `google` or `yahoo` and save the file. The virus should now be repaired!

To verify that it worked, open a web browser and go to <a href="http://www.google.com/" target="_blank">Google</a> and follow the Diagnosing the Problem section of this guide.

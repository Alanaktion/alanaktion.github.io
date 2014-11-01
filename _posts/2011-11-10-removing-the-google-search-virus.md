---
layout: post
title: Removing the Google Search Virus
date: 2011-11-10 09:57:35
---
I've seen this one a lot lately.  Basically, it shows a fake version of the Google and Yahoo! search engines in the attempt to track all of your personal information that you enter into those sites. Even if you don't care about your information getting stolen, it prevents you from using Google Apps services such as Gmail, Google Voice, and in many situations, even the basic Google search engine will not work at all.

The biggest problem with repairing this virus is that it is technically not so much a virus as a setting. There is no malicious software causing it, no secret tracking cookie, no browser extension. It is simply caused by a Windows setting, not in the Internet Options, the Windows Registry, it is not found in the Control Panel, or even in the Network and Sharing Center or the Computer Management. Therefore no anti-virus software or registry cleaner will ever find it.
<h2>Diagnosing the Problem</h2>
Obviously you need to see if you actually have this problem before trying to remove it. The easiest way to see the problem is to look at the <a href="http://www.google.com/" target="_blank">Google Home Page</a>. Check the <strong>copyright date</strong> at the bottom of the page. If the year is incorrect, you probably have the virus. Another method of checking it is to go to <a href="https://mail.google.com/" target="_blank">Gmail</a>. If the page returns a 404, 403, or 500 error, you've got the virus.
<h2>Repairing the Problem</h2>
<h3>Windows Vista/7</h3>
Open the Start Menu, click "All Programs", click Accessories, then right-click Notepad, and click <strong>Run As Administrator</strong>.
Allow access if a confirmation message is shown.
In <strong>Notepad</strong>, click <strong>File</strong>, then <strong>Open...</strong>, then type <strong>%SystemRoot%system32driversetchosts</strong> and click <strong>Open</strong>.
<div id=":b6">Remove any lines from the file containing <em>google</em> or <em>yahoo</em> and save the file. The virus should now be repaired!</div>
<h3>Windows NT/2000/XP</h3>
Open the Start Menu, click "All Programs", click Accessories, then right-click Notepad, and click <strong>Run As...</strong> and select <strong>Administrator</strong> or a user account with administrative privileges.
Allow access if a confirmation message is shown.
In <strong>Notepad</strong>, click <strong>File</strong>, then <strong>Open...</strong>, then type <strong>%SystemRoot%system32driversetchosts</strong> and click <strong>Open</strong>.
<div id=":b6">Remove any lines from the file containing <em>google</em> or <em>yahoo</em> and save the file. The virus should now be repaired!</div>
<h3>Mac OS X</h3>
Open <strong>/private/etc/</strong> in <strong>Finder</strong> and open the <strong>hosts</strong> file in a text editor.

Remove any lines from the file containing <em>google</em> or <em>yahoo</em> and save the file. The virus should now be repaired!
<h3>Other UNIX/Linux</h3>
Using a text editor as <strong>root</strong>, open <strong>/etc/hosts</strong>.

Remove any lines from the file containing <em>google</em> or <em>yahoo</em> and save the file. The virus should now be repaired!
<h3>Android OS</h3>
Using a text editor as open <strong>/system/etc/hosts</strong>.

Remove any lines from the file containing <em>google</em> or <em>yahoo</em> and save the file. The virus should now be repaired!
<div>To verify that it worked, open a web browser and go to <a href="http://www.google.com/" target="_blank">Google</a> and follow the Diagnosing the Problem section of this guide.</div>
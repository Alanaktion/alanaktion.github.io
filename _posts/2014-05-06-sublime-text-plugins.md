---
layout: post
title: Sublime Text Plugins
date: 2014-05-06 18:45:37
---
I use several plugins every day in [Sublime Text 3](http://www.sublimetext.com/3) that I've grown very used to having, and now find I couldn't work without them. I last updated this list on September 25, 2014.

* [Package Control](https://sublime.wbond.net/installation)
	* This one is essential for any Sublime Text user, and makes installing other plugins very simple and fast.
* Git, SidebarGit, or SublimeGit (commercial) from Package Control
	* All can be used together, or just pick the one you prefer
* SublimeLinter - I use these sub-plugins:
	* SublimeLinter-php
    * SublimeLinter-jshint (Requires Node.js, `npm install -g jshint`)
* DocBlockr
* Markdown Preview
* XDebug Client

I use the Soda Dark theme, installable via Package Control, with a modified Monokai color scheme that increases the contrast.

Here's my User Preferences file:

	{
		"theme": "Soda Dark 3.sublime-theme",
		"color_scheme": "Packages/User/Monokai (SL).tmTheme",
		"auto_complete_commit_on_tab": true,
		"auto_find_in_selection": true,
		"auto_match_enabled": true,
		"copy_with_empty_selection": true,
		"default_line_ending": "unix",
		"ensure_newline_at_eof_on_save": true,
		"trim_trailing_white_space_on_save": true,
		"font_face": "ProFontWindows",
		"font_options": [
			"gray_antialias"
		],
		"font_size": 9,
		"highlight_line": true,
		"highlight_modified_tabs": true,
		"ignored_packages": [
			"Vintage"
		],
		"save_on_focus_lost": true,
		"shift_tab_unindent": true,
		"show_encoding": true,
		"show_full_path": false,
		"word_wrap": true
	}

This includes my absolute favorite code font, [ProFont](http://tobiasjung.name/profont/), designed to be incredibly readable at small sizes. Use `ProFontIIx` if you're on Mac, it's beautiful. Note the `save_on_focus_lost` option, which does exactly what it says it will.

I also have custom hotkeys for SublimeGit commands, which I have bound to G-keys on my Logitech keyboards.

Windows keymap:

	[
		{ "keys": ["ctrl+k", "ctrl+m"], "command": "toggle_minimap" },
		{ "keys": ["ctrl+shift+g", "l"], "command": "git_pull" },
		{ "keys": ["ctrl+shift+g", "p"], "command": "git_push" },
		{ "keys": ["ctrl+shift+g", "a"], "command": "git_add_current_file" }
	]

OS X keymap, including adjustments to Home and End keys:

	[
		{ "keys": ["super+k", "super+m"], "command": "toggle_minimap" },
		{ "keys": ["super+shift+g", "l"], "command": "git_pull" },
		{ "keys": ["super+shift+g", "p"], "command": "git_push" },
		{ "keys": ["super+shift+g", "a"], "command": "git_add_current_file" },
		{ "keys": ["home"], "command": "move_to", "args": {"to": "bol"} },
		{ "keys": ["end"], "command": "move_to", "args": {"to": "eol"} },
		{ "keys": ["shift+end"], "command": "move_to", "args": {"to": "eol", "extend": true} },
		{ "keys": ["shift+home"], "command": "move_to", "args": {"to": "bol", "extend": true } },
		{ "keys": ["super+home"], "command": "move_to", "args": {"to": "bof"} },
		{ "keys": ["super+end"], "command": "move_to", "args": {"to": "eof"} },
		{ "keys": ["super+shift+home"], "command": "move_to", "args": {"to": "bof", "extend": true} },
		{ "keys": ["super+shift+end"], "command": "move_to", "args": {"to": "eof", "extend": true} }
	]

Edit: I include [SublimeGit](https://sublimegit.net/) in this plugin list, but it's a commercial, closed-source option that has numerous issues on Windows and a few on OS X. Most issues have been fixed, but I always prefer to use open source software anyway.

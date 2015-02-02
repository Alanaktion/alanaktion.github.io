---
layout: post
title: Sublime Text Plugins
date: 2014-05-06 18:45:37
---
I use several plugins every day in [Sublime Text 3](http://www.sublimetext.com/3) that I've grown very used to having, and now find I couldn't work without them. I last updated this list on September 25, 2014.

* [Package Control](https://sublime.wbond.net/installation)
	* This one is essential for any Sublime Text user, and makes installing other plugins very simple and fast.
* Git or SidebarGit from Package Control
	* Both can be used together, or just pick the one you prefer
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

Edit: I used to include [SublimeGit](https://sublimegit.net/) in this plugin list, but it's a commercial, closed-source option that is no longer receiving any support. It barely works at all on OS X Yosemite, and has numerous issues on Windows as well. Stay away from it.

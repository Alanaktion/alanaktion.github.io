/**
 * LASHES - Lame Attempt at a Shell in ECMAScript
 *
 * @author Alan Hardman <alan@phpizza.com>
 */

/*jshint esversion: 6 */

// Commands are defined as anonymous functions with a return value sent to stdout
var Commands = {
	about: function() {
		return `
    __           _
   / /  __ _ ___| |__   ___  ___
  / /  / _\` / __| '_ \\ / _ \\/ __|
 / /__| (_| \\__ \\ | | |  __/\\__ \\
 \\____/\\__,_|___/_| |_|\\___||___/

Lame Attempt at a Shell in ECMAScript

By Alan Hardman, named after Kieran's cat\n`;
	},
	ls: function(params) {
		if(params && params.indexOf('l') != -1) {
			return 'total ' + (Object.keys(Directories).length * 4) + '\n' + Object.keys(Directories).join('\n');
		} else if(params && params.indexOf('bin') != -1) {
			if(params.indexOf('l') != -1) {
				return 'total ' + (Object.keys(Directories).length * 4) + '\n' + Object.keys(Directories).join('\n');
			} else {
				return Object.keys(Commands).join(' ');
			}
		} else {
			return Object.keys(Directories).join(' ');
		}
	},
	cd: function(params) {
		if(params && params in Directories) {
			window.location = Directories[params];
		} else if(params && params != '.') {
			return 'cd: ' + (params.split(' ', 1)[0]) + ': No such file or directory';
		}
	},
	pwd: function() {
		return '/home/guest';
	},
	cat: function() {
		return '<img src="assets/img/fluffly.jpg" style="width: 480px; height: 320px;" alt="Fluffly">';
	},
	whoami: function() {
		return 'guest';
	},
	hostname: function(params) {
		if(params && params.indexOf('-f') != -1) {
			return 'phpizza.com';
		}
		return 'phpizza';
	},
	echo: function(params) {
		return params.replace(/^[\s"']+|[\s"']+$/g, '');
	},
	vim: function(params) {
		return 'vim: Try nano.';
	},
	nano: function(params) {
		return 'nano: Try vim.';
	},
	login: function() {
		return 'login: Cannot possibly work without effective root';
	},
	logout: function() {
		return 'logout: not login shell: use `exit\'';
	},
	exit: function() {
		var w = document.getElementsByClassName('window')[0];
		w.className = 'window';
		setTimeout(function() {
			w.remove();
		}, 500);
	},
	js: function(params) {
		try {
			return eval(params);
		} catch (e) {
			return e.message;
		}
	},
	clear: function() {
		document.getElementsByClassName('content')[0].innerHTML = '';
	},
	sudo: function(params) {
		var pArray = params.split(' ');
		switch(pArray[0]) {
			case '':
				return 'Usage: sudo [command]';
			case 'reboot':
				window.location.reload();
				break;
			default:
				if(pArray[0] in Commands)
					return Commands[pArray[0]]();
				return 'sudo: ' + pArray[0] + ': command not found';
		}
	}
};

// Map directories for ls and cd to URLs
var Directories = {
	github: 'https://github.com/Alanaktion',
	twitter: 'https://twitter.com/alanaktion',
	blog: 'https://blog.phpizza.com',
	resume: 'https://blog.phpizza.com/resume/',
};

(function() {

	// Some handy aliases
	var d = document,
		w = window,
		b = d.body,
		p = d.getElementById('prompt'), // Input used to prompt for user text
		r = d.getElementById('prompt-content'), // Hidden span used to determine input size
		c = d.getElementsByClassName('content')[0], // Content box
		u = d.getElementsByClassName('cursor')[0], // Fake blinking cursor
		m = 'guest@phpizza:~$', // Prompt message
		t = false, // Records if last keyup was the tab key
		h = [], // command history
		s = -1; // history position

	/**
	 * Render stdout and a new prompt
	 * @param  {string} command
	 * @param  {string} str
	 * @return {void}
	 */
	var stdout = function(command, str) {
		// Display output
		if(!c.innerHTML) {
			c.innerHTML = m;
			return;
		}
		if(str === undefined) {
			c.innerHTML += ' ' + command + '\n' + m;
		} else if(str !== false) {
			c.innerHTML += ' ' + command + '\n' + str + '\n' + m;
		}

		p.scrollIntoView(false);
	};

	// Check browser support
	if(!('addEventListener' in b) || !('keys' in Object)) {
		d.getElementsByClassName('content')[0].innerHTML = 'Sorry, your browser is not supported :(';
		u.remove();
		return;
	}

	// Force focus on prompt
	b.addEventListener('click', function(e) {
		if(e.target.tagName != 'INPUT' && window.getSelection().toString() === '') {
			p.focus();
		}
	}, false);
	b.addEventListener('keydown', function(e) {
		if(e.target.tagName != 'INPUT' && !e.ctrlKey) {
			p.focus();
		}
	}, false);

	// Handle prompt key press for size changes and command running
	p.addEventListener('keypress', function(e) {
		switch(e.which) {
			case 13: // Enter
				// Run command
				var command = p.value,
					parts = command.split(' '),
					exe = parts.shift(),
					params = parts.join(' ');
				if(exe in Commands) {
					h.push(command);
					if('localStorage' in window && 'JSON' in window) {
						localStorage.history = JSON.stringify(h);
					}
					stdout(command, Commands[exe](params));
				} else {
					stdout(command, 'Command not found: ' + exe);
				}

				// Reset prompt
				s = -1;
				p.value = '';
				p.style.width = '1px';
				break;
			case 9: // Tab
				// Tab is handled in `keydown`
				break;
			default:
				r.textContent = p.value + 'x';
				p.style.width = (r.clientWidth || 1) + 'px';
		}
		w.scrollTo(0, b.scrollHeight);
	}, false);

	// Handle some non-alphanum keys
	p.addEventListener('keydown', function(e) {
		switch(e.which) {
			case 8: // Backspace
				t = false;
				r.textContent = p.value.slice(0,-1);
				p.style.width = (r.clientWidth || 1) + 'px';
				break;
			case 9: // Tab
				e.preventDefault();
				var command = p.value;
				var commandNames = Object.keys(Commands);

				// If prompt is empty, and tab has been pressed before, list all available commands
				if(!command.length && t) {
					stdout('', commandNames.sort().join(' '));
					return;
				}

				// Try to find `command` in Commands object
				if(command.length) {
					var matches = [];
					for(var i = 0; i < commandNames.length; i++) {
						if(commandNames[i].substr(0, command.length) == command) {
							matches.push(commandNames[i]);
						}
					}
					if (matches.length == 1) {
						// One command matches, autocomplete
						p.value = matches[0] + ' ';
						p.dispatchEvent(new Event('keypress'));
						r.textContent = p.value;
						p.style.width = (r.clientWidth || 1) + 'px';
					} else if (matches.length) {
						// Multiple commands match, list all
						stdout('', matches.sort().join(' '));
					}
				}

				t = true;
				break;
			case 38: // Up arrow
				t = false;
				if(s == -1) {
					s = h.length - 1;
				} else if(s > 0) {
					s--;
				}
				if(s != -1) {
					p.value = h[s];
					r.textContent = p.value + 'x';
					p.style.width = (r.clientWidth || 1) + 'px';
					window.setTimeout(function() {
						p.setSelectionRange(p.value.length, p.value.length);
					}, 1);
					console.log("Showing history item " + s);
				}
				break;
			case 40: // Down arrow
				t = false;
				if(s == -1) {
					return;
				}
				s++;
				if(s < h.length) {
					p.value = h[s];
					r.textContent = p.value + 'x';
					p.style.width = (r.clientWidth || 1) + 'px';
					window.setTimeout(function() {
						p.setSelectionRange(p.value.length, p.value.length);
					}, 1);
					console.log("Showing history item " + s + " of " + h.length);
				} else {
					s = -1;
					p.value = '';
					p.style.width = '1px';
					console.log("End of history reached");
				}
				break;
			default:
				t = false;
		}

	});

	/**
	 * Set the theme
	 * @param {string} name  Which theme to select
	 * @param {bool}   save  Whether to save the theme selection to LocalStorage
	 * @return {bool}  Success or failure
	 */
	var setTheme = function(name, save) {
		var radio = d.querySelector('input[name=theme][value=' + name + ']');
		if(radio) {
			b.className = name;
			radio.checked = true;
			if(save && 'localStorage' in window) {
				localStorage.theme = name;
			}
			return true;
		}
		console.log('no matchy :(');
		return false;
	};

	// Handle theme selection menu
	var o = d.getElementById('theme-select'),
		children = o.children,
		oListener = function(e) {
			setTheme(this.children[0].value, true);
		}, el;
	for (var i = 0; i < children.length; i++) {
		el = children[i];
		el.addEventListener('click', oListener);
	}

	// Restore saved history, if any
	if('localStorage' in window && localStorage.history) {
		h = JSON.parse(localStorage.history);
	}

	// Restore saved theme selection, if any
	if('localStorage' in window && localStorage.theme) {
		var themeRadio = d.querySelector('input[name=theme][value=' + localStorage.theme + ']');
		if(themeRadio) {
			themeRadio.checked = true;
			b.className = localStorage.theme;
		}
	} else {
		// If no saved theme is found, guess based on user agent
		if(navigator.userAgent.match(/Linux/)) {
			setTheme('xfce');
		} else if(navigator.userAgent.match(/Macintosh|OS X|Darwin/)) {
			setTheme('osx');
		} else if(navigator.userAgent.match(/Windows/)) {
			setTheme('win10');
		} else {
			// Default to Ubuntu I guess? That should annoy any BSD users :P
			setTheme('ubuntu');
		}
	}

	// Place the terminal window after themeing
	var tWindow = d.getElementsByClassName('window')[0],
		tWindowTitle = d.getElementsByClassName('window-title')[0];
		setWindowPos = function(x, y) {
			if(x < 0) x = 0;
			if(y < 0) y = 0;
			if(x > window.innerWidth - tWindow.offsetWidth) x = window.innerWidth - tWindow.offsetWidth;
			if(y > window.innerHeight - tWindow.offsetHeight) y = window.innerHeight - tWindow.offsetHeight;
			tWindow.style.top = y + 'px';
			tWindow.style.left = x + 'px';
			return [x, y];
		};
	tWindow.style.position = 'absolute';
	if('localStorage' in window && localStorage.winX) {
		setWindowPos(localStorage.winX, localStorage.winY);
	} else {
		tWindow.style.top = ((window.innerHeight - tWindow.offsetHeight) / 2) + 'px';
		tWindow.style.left = ((window.innerWidth - tWindow.offsetWidth) / 2) + 'px';
	}

	// Handle dragging the title bar
	var tWinX = null, tWinY = null,
		winX = null, winY = null;
	window.addEventListener('mousemove', function(e) {
		if (e.which == 1 && winX !== null) {
			winX = document.all ? window.event.clientX : e.pageX;
			winY = document.all ? window.event.clientY : e.pageY;
			var coords = setWindowPos(winX - tWinX, winY - tWinY);
			if('localStorage' in window) {
				localStorage.winX = coords[0];
				localStorage.winY = coords[1];
			}
		}
	});
	tWindowTitle.addEventListener('mousedown', function(e) {
		winX = document.all ? window.event.clientX : e.pageX;
		winY = document.all ? window.event.clientY : e.pageY;
		tWinX = winX - tWindow.offsetLeft;
		tWinY = winY - tWindow.offsetTop;
		e.preventDefault();
	});
	window.addEventListener('mouseup', function(e) {
		winX = null;
		winY = null;
	});

	// Display window
	tWindow.className = 'window in';

})();

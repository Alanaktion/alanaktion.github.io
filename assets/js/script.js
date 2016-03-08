// Commands are defined as anonymous functions with a return value sent to stdout
var Commands = {
	ls: function(params) {
		if(params && params.indexOf('-l') != -1) {
			return 'total ' + (Object.keys(Directories).length * 4) + '<br>' + Object.keys(Directories).join('<br>');
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
		return 'exit: now why would you want to do that?';
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
		h = []; // command history

	// Render stdout and a new prompt
	var stdout = function(command, str) {
		if(!c.innerHTML) {
			c.innerHTML = m;
			return;
		}
		if(str === undefined) {
			c.innerHTML += ' ' + command + '<br>' + m;
		} else {
			c.innerHTML += ' ' + command + '<br>' + str + '<br>' + m;
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
					stdout(command, Commands[exe](params));
				} else {
					stdout(command, 'Command not found: ' + exe);
				}

				// Reset prompt
				p.value = '';
				p.style.width = '1px';
				break;

			case 9: // Tab
				// Tab is handled in `keydown`
				break;
			default:
				console.log(p.value);
				r.textContent = p.value + 'x';
				console.log(r.textContent);
				console.log(r);
				p.style.width = (r.clientWidth ? r.clientWidth : 1) + 'px';
		}
		w.scrollTo(0, b.scrollHeight);
	}, false);

	// Handle some non-alphanum keys
	// TODO: Add arrow key history navigation
	p.addEventListener('keydown', function(e) {
		switch(e.which) {
			case 8:
				t = false;
				r.textContent = p.value.slice(0,-1);
				p.style.width = (r.clientWidth ? r.clientWidth : 1) + 'px';
				break;
			case 9:
				e.preventDefault();
				var command = p.value;
				var commandNames = Object.keys(Commands);

				// If prompt is empty, and tab has been pressed before, list all available commands
				if(!command.length && t) {
					stdout('', commandNames.join(' '));
					return;
				}

				// Try to find `command` in Commands object
				if(command.length) {
					for(var i = 0; i < commandNames.length; i++) {
						if(commandNames[i].substr(0, command.length) == command) {
							// Command matches, autocomplete
							p.value = commandNames[i] + ' ';
							p.dispatchEvent(new Event('keypress'));
							r.textContent = p.value;
							p.style.width = (r.clientWidth ? r.clientWidth : 1) + 'px';
						}
					}
				}

				t = true;
				break;
			default:
				t = false;
		}

		// Disable fade temporarily
		u.className = 'cursor';
		if(window.t) {
			clearTimeout(window.t);
		}
		window.t = setTimeout(function() {
			u.offsetWidth = u.offsetWidth; // Hack to reset animation timer; doesn't seem to work quite the way I wanted it to.
			u.className = 'cursor fade';
		}, 200);

	});

	// Handle OS selection menu
	var o = d.getElementById('os-select'),
		children = o.children;
	for (var i = 0; i < children.length; i++) {
		var el = children[i];
		el.addEventListener('click', function(e) {
			var theme = this.children[0].value;
			b.className = theme;
			if('localStorage' in window) {
				localStorage.theme = theme;
			}
		});
	}

	// Restore saved OS selection, if any
	if('localStorage' in window && localStorage.theme) {
		var themeRadio = d.querySelector('input[name=theme][value=' + localStorage.theme + ']');
		if(themeRadio) {
			themeRadio.checked = true;
			b.className = localStorage.theme;
		}
	}

})();

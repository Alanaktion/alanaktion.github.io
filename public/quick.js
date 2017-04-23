var quick = {
    initialState: {
        title: '',
        main: '',
        nav: ''
    },

    /**
     * Add popstate event listener and init page links
     * @return {void}
     */
    init: function() {
        window.addEventListener('popstate', this.onPopState);
        document.addEventListener('click', function (e) {
            if (e.button) {
                return;
            }

            var t = e.target;
            while (t && t !== this) {
                if (t.tagName == 'A') {
                    quick.onClick(t, e);
                    return;
                }
                t = t.parentNode;
            }
        });
        this.initialState.title = document.title;
        this.initialState.main = document.querySelector('main.content').innerHTML;
        this.initialState.nav = document.querySelector('nav.navbar').innerHTML;
    },

    /**
     * Restore page data on browser history change
     * @param  {Event} e
     * @return {void}
     */
    onPopState: function(e) {
        if (e.state) {
            document.title = e.state.title;
            document.querySelector('main.content').innerHTML = e.state.main;
            document.querySelector('nav.navbar').innerHTML = e.state.nav;
        } else {
            document.title = quick.initialState.title;
            document.querySelector('main.content').innerHTML = quick.initialState.main;
            document.querySelector('nav.navbar').innerHTML = quick.initialState.nav;
        }
    },

    /**
     * Handle anchor clicks and optionally trigger AJAX page loading
     * @param  {Element} target
     * @param  {Event} e
     * @return {void}
     */
    onClick: function(target, e) {
        if (target.hostname == location.hostname && !target.hasAttribute('target')) {
            this.loadPage(target.href);
            e.preventDefault();
        }
    },

    /**
     * Load a page via AJAX
     * @param {string} url
     * @return {XMLHttpRequest}
     */
    loadPage: function(url) {
        document.querySelector('main.content').style.opacity = .5;
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', this.loadPageComplete);
        xhr.open('GET', url);
        xhr.send();
        return xhr;
    },

    /**
     * Render page and push history state on AJAX call success
     * @param {Event} e
     * @return {void}
     */
    loadPageComplete: function(e) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(this.response, "text/html");

        document.title = doc.title;
        var mainHtml = doc.querySelector('main.content').innerHTML
        var navHtml = doc.querySelector('nav.navbar').innerHTML;
        document.querySelector('main.content').style.opacity = 1;
        document.querySelector('main.content').innerHTML = mainHtml;
        document.querySelector('nav.navbar').innerHTML = navHtml;

        window.scrollTo(0, 0);

        history.pushState(
            {
                title: doc.title,
                main: mainHtml,
                nav: navHtml
            },
            doc.title,
            this.responseURL
        );
    }

};

if (window.DOMParser && history.pushState) {
    quick.init();
}

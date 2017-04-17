var quick = {

    /**
     * Add popstate event listener and init page links
     * @return {void}
     */
    init: function() {
        window.addEventListener('popstate', this.onPopState);
        // @todo: add click event listener for relative hyperlinks
        // @todo: store initial document state to return to if navigated back
    },

    /**
     * Restore page data on browser history change
     * @param  {Event} e
     * @return {void}
     */
    onPopState: function(e) {
        // @todo: restore <main> contents from e.state
    },

    /**
     * Handle anchor clicks and optionally trigger AJAX page loading
     * @param  {Event} e
     * @return {void}
     */
    onAnchorClick: function(e) {
        // @todo: check if anchor has a relative href, and call this.loadPage
    },

    /**
     * Load a page via AJAX
     * @param {string} url
     * @return {XMLHttpRequest}
     */
    loadPage: function(url) {
        // @todo: make ajax call
    },

    /**
     * Render page and push history state on AJAX call success
     * @param {string} data
     * @return {void}
     */
    loadPageComplete: function(data) {
        // @todo: set page <main> contents
        // @todo: set document.title
        // @todo: trigger history.pushState with a state object
        // history.pushState({page: 1}, "Page Title", "/pageUrl");
    }

};

if (window.DOMParser && history.pushState) {
    quick.init();
}

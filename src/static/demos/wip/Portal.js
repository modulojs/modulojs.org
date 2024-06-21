modulo.registry.coreDefs.RouteMap = class RouteMap {
    // Used by 404.html
}
modulo.register('coreDef', modulo.registry.coreDefs.RouteMap);

modulo.register('util', function tryResolvingRouteMap() {
});

modulo.registry.cparts.Params = class Params {
    prepareCallback() {
        this.GET = this.GET || new URLSearchParams(window.location.search);
        if (!this.data) {
            this.data = { };
            for (const [ key, defValue ] of Object.entries(this.attrs)) {
                const meth = (this.conf.Plural || '').includes(key) ? 'getAll' : 'get';
                this.data[key] = this.GET[meth](key, defValue);
            }
        }
        return this.data;
    }
}
modulo.register('cpart', modulo.registry.cparts.Params);

modulo.config.portal = {
    autoNav: 'a[href],form',
    allowRefresh: false, // will just remount if same page
    target: false, // falsy  defaults to TagName
    //quickRefresh: false, // will allow rerender instead of swap
};

modulo.registry.cparts.Portal = class Portal {
    initializedCallback() {
        if (!window._lastModuloPortal) { // First time a portal mounting
            window._lastModuloPortal = this; // (prevent double firing)
            window.addEventListener('popstate', (ev) => { // Listener for "Back"
                if (ev && ev.state && 'moduloPortalText' in ev.state) {
                    window._lastModuloPortal.mountFragment(ev.state.moduloPortalText);
                }
            });
        }
        if (!this.attrs.allowRefresh) { // Stash the original outerHTML
            this.originalOuterHTML = this.element.outerHTML;
        }
    }

    navMount({ el, name, value }) {
        const navigateFunction = (ev) => {
            ev.preventDefault();
            const formData = el.tagName === 'FORM' ?
                new URLSearchParams(new FormData(el)).toString() : '';
            const url = el.getAttribute('action') || el.getAttribute('href');
            const method = (el.getAttribute('method') || '').toUpperCase()
            if (method !== 'GET') {
                this.navigate(url, method, formData); // Send as body
            } else {
                this.navigate(url + '?' + formData); // Send as GET
            }
        };
        const elemMethodName = el.tagName === 'FORM' ? 'onsubmit' : 'onclick';
        el[this.conf.NavEvent || elemMethodName] = navigateFunction;
        //el.addEentListener(evName, navigateFunction);
        //this.boundElems.push([ el, eventName, navigateFunction ]);
    }

    navUnmount({ el, name, value }) {
        for (const [ boundElem, eventName, func ] of this.boundElems) {
            if (el === boundElem) {
                el.removeEventListener(eventName, func);
            }
        }
    }

    updateCallback() {
        for (const el of this.element.querySelectorAll(this.attrs.autoNav || '')) {
            this.navMount({ el });
        }
        const { moduloPortalParent } = this.element;
        if (moduloPortalParent) { // We were "summoned" to replace something
            window._lastModuloPortal = this; // Since we're replacing, ensure self is portal for popstate
            delete this.element.moduloPortalParent; // prevent any double usage
            modulo.registry.utils.handlePortalMerge(moduloPortalParent, this.element);
        }
    }

    mountFragment(htmlFragment) {
        window._lastModuloPortal = this; // Always ensure self is last set (used by popstate)
        const div = document.createElement('div');
        div.innerHTML = htmlFragment;
        const replacement = div.querySelector(this.attrs.target || this.element.tagName);
        if (!replacement) {
            console.log('ERROR: Could not find replacement. Falling back to navigating.');
        } else if (!replacement.moduloMount) {
            console.log('ERROR: Invalid replacement (no .moduloMount). Falling back to navigating.');
        } else {
            replacement.moduloPortalParent = this.element; // Cause element to replace this one
            replacement.moduloMount(true); // ensure mounts outside of doc
        }
    }

    navigate(newURL, method = null, body = null) {
        const mount = moduloPortalText => {
            const moduloRequest = method ? { method, body } : 'GET';
            const statePayload = { moduloPortalText, moduloRequest };
            window.history.pushState(statePayload, '', newURL);
            this.mountFragment(text);
        };
        const resolve = relPath => (new URL(relPath, document.location)).pathname;
        if (this.originalOuterHTML && resolve(newURL) === resolve('')) {
            mount(this.originalOuterHTML); // Shortcut, immediately mount with HTML
        } else { // TODO: Add in Post Data here
            const headers = { "Content-Type": 'application/x-www-form-urlencoded' }
            const opts = method ? { method, body, headers } : undefined;
            window.fetch(newURL, opts)
                .then(response => response.text())
                .then(mount);
        }
    }
};

modulo.register('cpart', modulo.registry.cparts.Portal);

modulo.register('util', function handlePortalMerge(fromElem, toElem) {
    // Override to add custom logic animations, etc (e.g. state merge)
    fromElem.replaceWith(toElem);
});


/*
//const obj = { moduloPostData: postData };
if (this.attrs.lazyParams && newURL.startsWith('?') || !newURL) { // TODO: Resolve & parse URL and see if path is same as current
    window.history.pushState(obj, '', newURL);
    this.mountLazy(postData || '');
} else {
}
*/
/*
mountLazy(postData) {
this.postData = postData ? postData : null;
const paramsCPart = this.conf.params ? this.element.cparts[this.conf.params] : null;
if (paramsCPart) { // copy post data from before
    paramsCPart.PARAMS = new URLSearchParams(window.location.search); // get new location
    if (postData) { // Accumulate into PARAMS
        paramsCPart.PARAMS = new URLSearchParams({
            ...Object.fromEntries(paramsCPart.PARAMS),
            ...Object.fromEntries(new URLSearchParams(postData)),
        });
    }
    delete paramsCPart.data;
}
this.element.rerender();
}
*/

/*
else if (ev && ev.state && 'moduloPostData' in ev.state) {
    window._lastModuloPortal.mountLazy(ev.state.moduloPostData);
}
*/

/*
for (const form of this.element.querySelectorAll(this.attrs.formTarget)) {
    form.onsubmit = ev => {
        ev.preventDefault();
        const isPost = (form.getAttribute('method') || '').toUpperCase() === 'POST';
        let url = el.getAttribute('action') || el.getAttribute('href');
        const queryString = new URLSearchParams(new FormData(form)).toString();
        if (!isPost && queryString) {
            url = url + '?' + queryString; // Add in GET parameters, if they exist
        }
        this.navigate(url, isPost ? queryString : null);
    };
}
*/

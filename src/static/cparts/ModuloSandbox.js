/* Note: This CPart is a work in progress, and will eventually be split between
** a Script in DemoEditor that handles the UI, which in turn uses a general
** purpose "ModuloSandbox" CPart that handles the hard stuff. Right now, it's
** just all jammed in here. */

modulo.config.modulosandbox = {
    Src: '/static/js/Modulo.js', // Load "Modulo.js" as .Content conf
    Directives: [ 'editorMount' ],
    SourceCodeSuffix: `
        // A little hack to ensure stays (mostly) sandboxed
        const originalRerender = modulo.registry.coreDefs.Component.prototype.rerender;
        modulo.registry.coreDefs.Component.prototype.rerender = function (...args) {
            window.modulo = window.moduloSandbox;
            originalRerender.apply(this, args);
            window.modulo = window.globalModulo; // Ensure restored
        };
    `,
};

modulo.registry.cparts.ModuloSandbox = class ModuloSandbox {
    editorMount({ el }) {
        const state = this.element.cparts.state.data;
        this.element.editor = el;
        if (!this.element.editor.value && state.value) {
            this.element.editor.value = state.value; // Ensure starts with value
        }
        this.run(); // Ensure rerun on editor mount
    }

    initializedCallback() {
        return {
            open: this.open.bind(this),
            run: this.run.bind(this),
            save: this.save.bind(this),
            editorMount: this.editorMount.bind(this),
        }
    }

    updateCallback() {
        // TODO: Hack, should look for cleaner solution:
        if (!this.element.editor && this.element.querySelector('x-SyntaxEditor')) {
            this.editorMount({ el: this.element.querySelector('x-SyntaxEditor') });
        }
    }

    prepareCallback() {
        const state = this.element.cparts.state.data;
        const props = this.element.cparts.props.initializedCallback();
        if (props.collapsed === true || props.collapsed === false) {
            state.showEditor = !props.collapsed;
        } else {
            state.showEditor = true;
        }
        if (props.value && !state.value) {
            state.value = props.value;
        }
        if (this.element.hasAttribute('modulo-value') && !state.value) {
            state.value = this.element.getAttribute('modulo-value');
        }
        if (props.src && !state.value && state.isFetching === null) {
            state.isFetching = true;
            window.fetch(props.src)
                .then(response => response.text())
                .then(text => {
                    state.value = text;
                    state.isFetching = false;
                    this.element.setAttribute('modulo-value', text);
                    this.element.cparts.state.propagate('value', text);
                    if (!state.showEditor) {
                        this._run();
                    }
                });
        }
    }

    open() {
        this.element.cparts.state.data.value = this.element.editor.value;
        const fullText = this.toEmbed(this.element.cparts.state.data.value, this.getComponentName());
        this._openInEditor(fullText, this.getComponentName());
    }

    run() {
        const state = this.element.cparts.state.data;
        state.value = this.element.editor.value;
        this.hasRun = true;
        this._run();
    }

    save() {
        const state = this.element.cparts.state.data;
        state.value = this.element.editor.value;
        const fullText = this.toEmbed(state.value, this.getComponentName());
        this.modulo.registry.utils.saveFileAs(this.getComponentName() + '.html', fullText);
    }

    toEmbed(text, selected) {
        const props = this.element.cparts.props.initializedCallback();
        let includeStr = this.getCodeIncludes(props.includes);
        //const codeText = this.getCodeContent(text);
        const codeText = text; // Use the raw text for the embed, since we don't need demo=...
        const indentText = ('\n' + codeText.trim()).replace(/\n/g, '\n    ');
        if (includeStr) {
            includeStr = ('\n' + includeStr.trim()).replace(/\n/g, '\n  ');
            includeStr = includeStr.replace(new RegExp("/static/", "g"), "https://modulojs.org/static/");
            includeStr = includeStr.replace(new RegExp(' mode="shadow"', "g"), "");
            includeStr = includeStr.replace(new RegExp(' namespace="[^"]+"', "g"), "");
        }
        const componentName = selected || 'Demo';
        const fullText = `<!DOCTYPE html>\n<template Modulo>${ includeStr }\n` +
                          `  <Component name="${ componentName }">` + indentText + '\n' +
                          '  </Component>\n' +
                          '</template>\n' +
                          '<script src="https://unpkg.com/mdu.js"></script>\n' +
                          '<p>Example usage:</p><hr />\n' +
                          `<x-${componentName}></x-${componentName}>`;
        return fullText;
    }

    _openInEditor(fullText, selected) {
        const LS_PREFIX = 'mdufs-';
        const fn = (selected || 'example').replace(/[^a-zA-Z0-9_\.-]/g, '_') + '.html';
        const path = ('/home/demo/' + fn);
        localStorage.setItem(LS_PREFIX + path, fullText);
        window.location.href = '/static/demos/editor.html?ls=' + path;
        // Skip transition, since it messes with "Back"
        /*
        document.body.style.cursor = "wait";
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = 0.01;
        setTimeout(() => {
            window.location.href = '/static/demos/editor.html?ls=' + path;
        }, 500);
        */
    }

    _run() {
        const state = this.element.cparts.state.data;
        if (!window.moduloSandbox) {
            window.moduloSandbox = this.getSandboxedModulo();
            window.globalModulo = window.modulo;
        }
        const ns = 'demo' + this.nextId();

        const fullText = this.getCodePrefix(ns) + this.getCodeContent(state.value) + this.getCodeSuffix(ns);
        // NOTE: Currently, the ability to use includes for _run() is DEACTIVATED. It only affects toEmbed
        //const fullText = this.getCodePrefix(ns) + state.value + this.getCodeSuffix(ns);

        this.element.cparts.state.data.demo = '';
        window.modulo = window.moduloSandbox;
        /*
        window._infiniteCount = window._infiniteCount || 1;
        if (++window._infiniteCount > 5) {
            console.count('muting after 500');
            return;
        }
        */
        window.moduloSandbox.loadString(fullText); // Load the string, and when finished, apply
        window.moduloSandbox.preprocessAndDefine(() => {
            window.modulo = window.moduloSandbox;
            this.element.cparts.state.propagate('demo', this.getDemoCode(ns));
            this.element.rerender();
            window.modulo = window.globalModulo; // Ensure restored
        });
    }

    nextId() {
        if (window._moduloID < 1000) { // Always reset to 1000 
            window._moduloID = 1000;
        }
        return ++window._moduloID; // assign next modulo ID
    }

    getComponentName(src = false) {
        const props = this.element.cparts.props.initializedCallback();
        src = src || props.src;
        if (src) {
            return src.split('/').pop().split('.').shift();
        } else {
            return 'Demo';
        }
    }

    buildCallback() {
        const props = this.element.cparts.props.initializedCallback();
        const demoArea = this.element.querySelector('.demo-area');
        let preview = '';
        if (props.preview) {
            preview = props.preview;
        }
        if (demoArea && preview) {
            demoArea.innerHTML = preview;
        }
    }

    forceActivate() {
        // TODO: Hacky thing about ordering of mounting, should find more elegant solution
        if (this.forceActivated) {
            return;
        }
        this.forceActivated = true;
        const state = this.element.cparts.state.data;
        if (this.element.hasAttribute('modulo-value') && !state.value) {
            state.value = this.element.getAttribute('modulo-value');
        }
        this._run();
    }

    getCodePrefix(ns) {
        const props = this.element.cparts.props.initializedCallback();
        const cName = this.getComponentName();
        //const modeStr = props.regularMode ? '' : ' mode="shadow"';
        let modeStr = ' mode="shadow"';
        if ((props.includes || '').trim() && props.includes !== 'undefined') {
            modeStr = '';
        }
        const includeStr = this.getCodeIncludes(props.includes);
        return `<Modulo>${ includeStr }` +
                `<Component namespace="${ ns }" name="${ cName }"${ modeStr }>\n`;
    }

    getCodeIncludes(includeStr) {
        includeStr = (includeStr || '').trim();
        if (!includeStr) {
            return '';
        }
        if (includeStr.startsWith('<')) {
            // Assumed to be modulo code, use as is
            return includeStr;
        }
        this.includesNameMap = {};
        let s = '';
        // Assumed to be src= includes
        for (const src of includeStr.split(',')) {
            const cName = this.getComponentName(src);
            const ns = 'demo' + this.nextId();
            s += `<Component namespace="${ ns }" name="${ cName }" `;
            s += `-src="${ src }" mode="shadow"></Component>\n`;
            const key = `x-${ cName }`.toUpperCase(); // Case insensitive
            this.includesNameMap[key] = `${ ns }-${ cName }`;
        }
        return s;
    }

    getCodeContent(componentStr) {
        if (!this.includesNameMap || Object.keys(this.includesNameMap).length < 1) {
            return componentStr; // No op
        }
        // Need to hard-code name substitutions, until private namespace
        // feature is finished and documented:
        let tags = Object.keys(this.includesNameMap).join('|').toLowerCase();
        const regexp = new RegExp('<(\\s*/?\\s*)(' + tags + ')([^a-zA-Z-])', 'ig');
        componentStr = componentStr.replace(regexp, (match, m1, m2, m3) => {
            const newTag = this.includesNameMap[m2.toUpperCase()]; // </x-TagName to
            return `<${ m1 }${ newTag }${ m3 }`; // </demo123-TagName
        });
        this.includesNameMap = null; // clear so it can't be reused by accident
        return componentStr;
    }

    getCodeSuffix(ns) {
        return `\n</Component></Modulo>`;
    }

    getDemoCode(ns) {
        const tagName = ns + '-' + this.getComponentName();
        return `<${ tagName }></${ tagName }>`;
    }

    getSandboxedModulo() {
        // For the DemoEditor, we create a new sandboxed Modulo instance. This
        // prevents definitions from leaking. We have to re-run the Modulo source
        // code because built / optimized versions of this JS (e.g., window.Modulo
        // in prod) may skip inclusion of dev-related utilities, symbol names, etc.
        const sandboxWindow = {}; // Overriding window "sandboxes" modulo
        sandboxWindow.document = document; // Patch expected properties of window
        sandboxWindow.fetch = window.fetch.bind(window);
        sandboxWindow.URL = function fakeURL (a, b) {
            b = 'https://fake-modulojs.org'; // Hardcode the "origin" (later may support "src"?)
            this.href = (new window.URL(a, b)).href;
            this.href = this.href.replace(b, ''); // Force make relative
        };
        sandboxWindow.setTimeout = window.setTimeout.bind(window);
        const moduloSourceCode = this.conf.Content + this.conf.SourceCodeSuffix;
        (new Function([ 'window' ], moduloSourceCode))(sandboxWindow); // Run Modulo
        this.sandboxWindow = sandboxWindow;
        return sandboxWindow.modulo; // Retrieve new Modulo
    }
}

modulo.register('cpart', modulo.registry.cparts.ModuloSandbox);

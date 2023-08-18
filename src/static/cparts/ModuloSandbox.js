modulo.config.modulosandbox = {
    Src: '/static/js/Modulo.js',
    Directives: [ 'editorMount' ],
    SourceCodeSuffix: `
        const originalRerender = modulo.registry.coreDefs.Component.prototype.rerender;
        modulo.registry.coreDefs.Component.prototype.rerender = function (...args) {
            /*if (this.element.hasAttribute('modulo-original-html')) {
                this.element.removeAttribute('modulo-original-html');
                return;
            }*/
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
        if (this.element.hasAttribute('value-from-src') && !state.value) {
            state.value = this.element.getAttribute('value-from-src');
        }
        if (props.src && !state.value) {
            window.fetch(props.src)
                .then(response => response.text())
                .then(text => {
                    this.element.setAttribute('value-from-src', text);
                    this.element.cparts.state.propagate('value', text);
                    if (!state.showEditor) {
                        this._run();
                    }
                });
        }
    }

    renderCallback(renderObj) {
        if (this.element.getAttribute('modulo-original-html')) {
            renderObj.component.innerHTML = null; // Disable rerender on first load
            this.element.removeAttribute('modulo-original-html');
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
        this._run();
    }

    save() {
        const state = this.element.cparts.state.data;
        state.value = this.element.editor.value;
        const fullText = this.toEmbed(state.value, this.getComponentName());
        this.modulo.registry.utils.saveFileAs(this.getComponentName() + '.html', fullText);
    }

    toEmbed(text, selected) {
        const indentText = ('\n' + text.trim()).replace(/\n/g, '\n    ');
        const componentName = selected || 'Demo';
        let dependency = '';
        /* if () { dependency = '//modulojs.org/libraries/globalExamples.html'; } */
        const usage = `<p>Example usage:</p><hr />\n<x-${componentName}></x-${componentName}>`;
        const fullText = '<!DOCTYPE html>\n<template Modulo>\n' +
                          (dependency ? `  <Library -src="${ dependency }"></Library>\n` : '') +
                          `  <Component name="${ componentName }">` + indentText + '\n' +
                          '  </Component>\n' +
                          '</template>\n' +
                          '<script src="https://unpkg.com/mdu.js"></script>\n' + usage;
        return fullText;
    }

    _openInEditor(fullText, selected) {
        const LS_PREFIX = 'mdufs-';
        const fn = (selected || 'example').replace(/[^a-zA-Z0-9_\.-]/g, '_') + '.html';
        const path = ('/home/demo/' + fn);
        localStorage.setItem(LS_PREFIX + path, fullText);
        document.body.style.cursor = "wait";
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = 0.01;
        setTimeout(() => {
            window.location.href = '/static/demos/editor.html?ls=' + path;
        }, 500);
    }

    _run() {
        const state = this.element.cparts.state.data;
        if (!window.moduloSandbox) {
            window.moduloSandbox = this.getSandboxedModulo();
            window.globalModulo = window.modulo;
        }
        const ns = 'demo' + this.nextId();
        const fullText = this.getCodePrefix(ns) + state.value + this.getCodeSuffix(ns);
        this.element.cparts.state.data.demo = '';
        window.modulo = window.moduloSandbox;
        window.moduloSandbox.loadString(fullText); // Load the string, and when finished, apply
        window.moduloSandbox.preprocessAndDefine(() => {
            this.element.cparts.state.propagate('demo', this.getDemoCode(ns));
            this.element.rerender();
            window.modulo = window.globalModulo; // Ensure restored
        });
    }

    nextId() {
        if (window._moduloID < 10000) { // Always reset to 10,0000 
            window._moduloID = 10000;
        }
        return ++window._moduloID; // assign next modulo ID
    }

    getComponentName() {
        const props = this.element.cparts.props.initializedCallback();
        if (props.src) {
            const filename = props.src.split('/').pop();
            const bareName = filename.split('.').shift();
            return bareName;
        } else {
            return 'Demo';
        }
    }

    getCodePrefix(ns) {
        const cName = this.getComponentName();
        return `<Modulo>` +
                `<Component namespace="${ ns }" name="${ cName }" mode="shadow">\n`;
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
        };
        const moduloSourceCode = this.conf.Content + this.conf.SourceCodeSuffix;
        (new Function([ 'window' ], moduloSourceCode))(sandboxWindow); // Run Modulo
        return sandboxWindow.modulo; // Retrieve new Modulo
    }
}

modulo.register('cpart', modulo.registry.cparts.ModuloSandbox);

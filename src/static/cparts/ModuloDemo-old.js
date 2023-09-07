modulo.config.modulodemo = {
    Directives: [ 'demoMount', 'demoUnmount' ],
    name: 'props.name',
    value: 'props.value',
};


// TODO: Remove "INCLUDE" feature entirely

modulo.registry.cparts.ModuloDemo = class ModuloDemo {
    static toEmbed(codeText, componentName, includeStr = '') {
        const name = componentName || 'App';
        const indentText = ('\n' + codeText.trim()).replace(/\n/g, '\n    ');
        if (includeStr) {
            includeStr = ('\n' + includeStr.trim()).replace(/\n/g, '\n  ');
            includeStr = includeStr.replace(new RegExp("/static/", "g"), "https://modulojs.org/static/");
            includeStr = includeStr.replace(new RegExp(' mode="shadow"', "g"), "");
            includeStr = includeStr.replace(new RegExp(' namespace="[^"]+"', "g"), "");
        }
        const fullText = `<!DOCTYPE html>\n<template Modulo>${ includeStr }\n` +
                          `  <Component name="${ name }">` + indentText + '\n' +
                          '  </Component>\n' +
                          '</template>\n' +
                          '<script src="https://unpkg.com/mdu.js"></script>\n' +
                          //'<p>Example usage:</p><hr />\n' +
                          `\n\n<!-- Example usage: -->\n` +
                          `<x-${name}></x-${name}>`;
        return fullText;
    }

    demoMount({ el }) {
        this.demoElement = el;
        this.demoElement.innerHTML = ''; // Ensure blanked
    }

    demoUnmount() {
        this.demoElement = null;
    }

    domCallback(renderObj) {
        if (this.demoElement) { // When the demo is appearing, prevent this component from updating DOM
            renderObj.component.innerHTML = null;
            renderObj.component.innerDOM = null;
        }
    }

    updateCallback(renderObj) {
        if (!this.demoElement) {
            return; // No demo element
        }
        if (this.demoElement.offsetParent === null) {
            // TODO: Change to auto-run only when the screen goes over, to save CPU / fetch etc
            return; // Demo element is not visible, let's not try to render
        }
        this.value = this.modulo.registry.utils.get(renderObj, this.conf.value);
        this.componentName = this.modulo.registry.utils.get(renderObj, this.conf.component);
        this.example = this.modulo.registry.utils.get(renderObj, this.conf.example);
        this.checkForRun();
    }

    checkForRun() {
        this._lastDemoHTML = this.demoElement.innerHTML;
        if (typeof this.value === 'undefined') {
            return; // don't have a value assigned yet
        }
        if (!this._lastDemoHTML || this._lastValue !== this.value || this._lastExample !== this.example) {
            // Blank, or changed (either value or example): Record values to detect changes & run
            this._lastValue = this.value;
            this._lastExample = this.example;
            this.run().then(componentUseExample => { // Update demo element with HTML
                this.demoElement.innerHTML = componentUseExample;
            });
        }
    }

    getCodePrefix(ns) {
        const props = this.element.cparts.props.initializedCallback();
        const cName = this.getComponentName();
        let modeStr = ' mode="shadow"';
        if (this.autoInclude) {
            /*if ((props.includes || '').trim() && props.includes !== 'undefined') {
                modeStr = '';
            }*/
        }
        const includeStr = this.getCodeIncludes(props.includes);
        return `${ includeStr }` +
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
        return `\n</Component>`;
    }

    getComponentName(src = false) {
        if (this.componentName) {
            return this.componentName;
        }
        // TODO: Refactor this away
        const props = this.element.cparts.props.initializedCallback();
        src = src || props.src;
        if (src) {
            return src.split('/').pop().split('.').shift();
        } else {
            return 'App';
        }
    }

    nextId() {
        // Use a window-attached demo ID, since we want it to be globally
        // unique (e.g. for the namespace to never collide)
        if (!window._moduloDemoID || window._moduloDemoID < 1000) { // Always reset to 1000 
            window._moduloDemoID = 1000;
        }
        return ++window._moduloDemoID; // assign next modulo ID
    }

    getComponentUseExample(ns) {
        const tagName = ns + '-' + this.getComponentName();
        const placeholder = 'x-' + this.getComponentName();
        let text = this.example || `<${ placeholder }></${ placeholder }>`;
        text = text.replace(new RegExp('<' + placeholder, 'im'), '<' + tagName);
        text = text.replace(new RegExp('</' + placeholder, 'im'), '</' + tagName);
        return text;
    }

    getDefinitionCode() {
        const ns = 'd' + this.nextId();
        const definitionCode = this.getCodePrefix(ns) + this.getCodeContent(this.value) + this.getCodeSuffix(ns);
        const componentUseExample = this.getComponentUseExample(ns);
        return [ definitionCode, componentUseExample ];
    }

    run() {
        const [ definitionCode, componentUseExample ] = this.getDefinitionCode();
        const runCode = (resolve, reject) => {
            // Load under _component prefix, only allowing component defs
            try {
                window.modulo.loadString(definitionCode, '_component');
                window.modulo.preprocessAndDefine(() => {
                    resolve(componentUseExample);
                });
            } catch (error) {
                console.error('DEMO ERROR: loadString failed');
                console.log('DEMO ERROR: Could not load definition');
                console.log('---------------------------');
                console.log(error);
                reject(error);
            }
        };
        return new window.Promise(runCode);
    }
}

modulo.register('cpart', modulo.registry.cparts.ModuloDemo);

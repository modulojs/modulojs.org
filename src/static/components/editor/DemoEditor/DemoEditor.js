const LS_PREFIX = 'mdufs-';

function editorMount({ el }) {
    element.editor = el;
    if (!element.editor.value && state.value) {
        element.editor.value = state.value; // Ensure starts with value
    }
    run(); // Ensure rerun on editor mount
}

function prepareCallback() {
    if (props.collapsed === true || props.collapsed === false) {
        state.showEditor = !props.collapsed;
    } else {
        state.showEditor = true;
    }
    if (props.value && !state.value) {
        state.value = props.value;
    }
    if (props.src && !state.value) {
        // TODO: Refactor when Script isolation mode overhaul
        const stateCPart = element.cparts.state;
        const setAttr = element.setAttribute.bind(element);
        window.fetch(props.src)
            .then(response => response.text())
            .then(text => {
                setAttr('value', text); // sets own prop, so SSR friendly
                stateCPart.propagate('value', text);
                if (!state.showEditor) {
                    _run();
                }
            });
    }
}

function open() {
    state.value = element.editor.value;
    const fullText = toEmbed(state.value, getComponentName());
    _openInEditor(fullText, getComponentName());
}

function run() {
    state.value = element.editor.value;
    _run();
}

function save() {
    state.value = element.editor.value;
    const fullText = toEmbed(state.value, getComponentName());
    modulo.registry.utils.saveFileAs(getComponentName() + '.html', fullText);
}

function toEmbed(text, selected) {
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

function _openInEditor(fullText, selected) {
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

function _run() {
    if (!window.moduloSandbox) {
        window.moduloSandbox = getSandboxedModulo();
        window.globalModulo = window.modulo;
    }
    window.modulo = window.moduloSandbox;
    const ns = 'demo' + nextId();
    const fullText = getCodePrefix(ns) + state.value + getCodeSuffix(ns);
    state.demo = '';
    window.moduloSandbox.loadString(fullText); // Load the string, and when finished, apply
    // TODO: Refactor when Script isolation mode overhaul
    const stateCPart = element.cparts.state;
    const rerender = element.rerender.bind(element);
    window.moduloSandbox.preprocessAndDefine(() => {
        stateCPart.propagate('demo', getDemoCode(ns));
        rerender();
        window.modulo = window.globalModulo; // Ensure restored
    });
}

function nextId() {
    if (window._moduloID < 10000) { // Always reset to 10,0000 
        window._moduloID = 10000;
    }
    return ++window._moduloID; // assign next modulo ID
}

function getComponentName() {
    if (props.src) {
        const filename = props.src.split('/').pop();
        const bareName = filename.split('.').shift();
        return bareName;
    } else {
        return 'Demo';
    }
}

function getCodePrefix(ns) {
    const cName = getComponentName();
    return `<Modulo>` +
            `<Component namespace="${ ns }" name="${ cName }" mode="shadow">\n`;
}

function getCodeSuffix(ns) {
    return `\n</Component></Modulo>`;
}

function getDemoCode(ns) {
    const tagName = ns + '-' + getComponentName();
    return `<${ tagName }></${ tagName }>`;
}

function getSandboxedModulo() {
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
    (new Function([ 'window' ], modulo_source_code))(sandboxWindow); // Run Modulo
    return sandboxWindow.modulo; // Retrieve new Modulo
}


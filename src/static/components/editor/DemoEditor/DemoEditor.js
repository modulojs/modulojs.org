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
                    run(state.value);
                }
            });
    }
}

function nextId() {
    if (window._moduloID < 10000) { // Always reset to 10,0000 
        window._moduloID = 10000;
    }
    return ++window._moduloID; // assign next modulo ID
}

function getComponentName() {
    return 'TestingComponent';
}

function getCodePrefix(ns) {
    const cName = getComponentName();
    return `<Modulo -name="modulo${ ns }">` +
            `<Component namespace="${ ns }" name="${ cName }" mode="shadow">\n`;
}

function getCodeSuffix(ns) {
    return `\n</Component></Modulo>`;
}

function getDemoCode(ns) {
    const tagName = ns + '-' + getComponentName();
    return `<${ tagName }></${ tagName }>`;
}

function copyObjAtDepth(obj, depth = 0) {
    if (typeof obj !== 'object' && Array.isArray(obj) && obj === null) {
        return obj; // do not attempt copy
    }
    if (depth < 1) {
        return Object.assign({}, obj); // Simply flat duplicate
    }

    // Otherwise, loop through recursing one more level
    const newObj = {};
    for (const key of Object.keys(obj)) {
        newObj[key] = copyObjAtDepth(obj[key], depth - 1);
    }
    return newObj;
}

function getSandboxedModulo() {
    // For the DemoEditor, we create a new sandboxed Modulo instance. This
    // prevents definitions from leaking. We have to re-run the modulo source
    // code because built / optimized versions of this JS (e.g., window.Modulo
    // in prod) may skip inclusion of dev-related utilities, symbol names, etc.
    const sandboxWindow = {}; // Keep "window" as empty object (stop load head)
    (new Function([ 'window' ], modulo_source_code))(sandboxWindow);
    sandboxWindow.document = document; // Patch expected properties of window
    sandboxWindow.fetch = window.fetch;
    sandboxWindow.URL = window.URL;
    const sandbox = sandboxWindow.modulo; // Retrieve new Modulo
    /*
    //Object.assign(sandbox, window.modulo); // copy all props
    sandbox.id = nextId(); // Ensure Modulo keeps gets unique ID
    sandbox.registry = copyObjAtDepth(sandbox.registry, 1);
    sandbox.config = copyObjAtDepth(sandbox.config, 1);
    sandbox.definitions = copyObjAtDepth(sandbox.definitions, 1);
    sandbox._configSteps = 0;
    */
    return sandbox;
}

function run(newValue = undefined) {
    if (!window.moduloSandbox) {
        window.moduloSandbox = getSandboxedModulo();
        window.globalModulo = window.modulo;
        window.modulo = window.moduloSandbox;
    }
    const ns = 'demo' + nextId();
    state.value = newValue === undefined ? element.editor.value : newValue;
    const fullText = getCodePrefix(ns) + state.value + getCodeSuffix(ns);
    state.demo = '';
    window.moduloSandbox.loadString(fullText); // Load the string, and when finished, apply
    // TODO: Refactor when Script isolation mode overhaul
    const stateCPart = element.cparts.state;
    const rerender = element.rerender.bind(element);
    window.moduloSandbox.preprocessAndDefine(() => {
        stateCPart.propagate('demo', getDemoCode(ns));
        rerender();
    });
}

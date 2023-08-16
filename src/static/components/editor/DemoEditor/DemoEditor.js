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

function getSandboxedModulo() {
    if (!window.moduloSandbox) { // Register modulo as a function
        window.moduloSandbox = new Modulo();
        Object.assign(window.moduloSandbox, modulo);
        modulo.id = window._moduloID; // Ensure Modulo keeps gets unique ID
        window.moduloSandbox.registry = Object.assign({}, window.moduloSandbox.registry);
        window.moduloSandbox.config = Object.assign({}, window.moduloSandbox.config);
        /*
        element.head = document.createElement('fakehead');
        element.body = document.createElement('fakebody');
        element.createElement = document.createElement.bind(document);
        const fakeWindow = { fetch: window.fetch, document: element };
        fakeWindow.modulo = new Modulo();
        const makeModulo = new Function([ 'window', 'modulo', ], modulo_source_code);
        makeModulo(fakeWindow, null);
        */
    }
    return window.moduloSandbox;
}

function run(newValue = undefined) {
    const ns = 'demo' + nextId();
    state.value = newValue === undefined ? element.editor.value : newValue;
    const fullText = getCodePrefix(ns) + state.value + getCodeSuffix(ns);
    state.demo = '';
    const sandbox = getSandboxedModulo();
    sandbox.loadString(fullText); // Load the string, and when finished, apply
    // TODO: Refactor when Script isolation mode overhaul
    const stateCPart = element.cparts.state;
    const rerender = element.rerender.bind(element);
    sandbox.preprocessAndDefine(() => {
        stateCPart.propagate('demo', getDemoCode(ns));
        rerender();
    });
}

function editorMount({ el }) {
    element.editor = el;
    if (!element.editor.value && state.value) {
        element.editor.value = state.value; // Ensure starts with value
    }
    run(); // Ensure rerun on editor mount
}

function prepareCallback() {
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

function getDemo(ns) {
    const tagName = ns + '-' + getComponentName();
    return `<${ tagName }></${ tagName }>`;
}

function run() {
    const ns = 'demo' + nextId();
    state.value = element.editor.value;
    const fullText = getCodePrefix(ns) + state.value + getCodeSuffix(ns);
    state.demo = '';
    modulo.loadString(fullText);
    modulo.preprocessAndDefine(() => {
        state.demo = getDemo(ns);
        element.rerender();
    });
}


function editorMount({ el }) {
    element.editor = el;
    if (!element.editor.value && props.value) {
        element.editor.value = props.value; // Ensure starts with value
    }
    run(); // Ensure rerun on editor mount
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
            `<Component namespace="${ ns }" name="${ cName }">\n`;
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
    const text = element.editor.value;
    const fullText = getCodePrefix(ns) + text + getCodeSuffix(ns);
    state.demo = '';
    modulo.loadString(fullText);
    modulo.preprocessAndDefine(() => {
        state.demo = getDemo(ns);
        element.rerender();
    });
}


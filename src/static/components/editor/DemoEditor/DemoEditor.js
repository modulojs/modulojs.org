const EDITOR_LOCATION = '/static/demos/editor.html'
const LOCAL_STORAGE_PREFIX = 'mdufs-';
const { toEmbed } = modulo.registry.cparts.ModuloDemo; // Retrieve helper funcs
const { saveFileAs } = modulo.registry.utils;

function editorMount({ el }) {
    element.editor = el;
}

function exampleMount({ el }) {
    element.exampleEditor = el;
}

function _updateState() {
    if (element.editor) {
        state.value = element.editor.value;
    }
    if (props.value && !state.value) {
        state.value = props.value;
    }
    if (element.hasAttribute('modulo-value') && !state.value) {
        state.value = element.getAttribute('modulo-value');
    }
    state.showEditor = !props.collapsed;
    state.componentName = getComponentName();
    if (element.exampleEditor) {
        // Use user-supplied example code
        state.exampleCode = element.exampleEditor.value;
    } else {
        // Otherwise, use generic default
        state.exampleCode = `<x-${ state.componentName }></x-${ state.componentName }>`;
    }
}

function prepareCallback() {
    _updateState();
    const e = element; // TODO: Refactor
    if (props.src && !state.value && state.isFetching === null) {
        state.isFetching = true;
        window.fetch(props.src)
            .then(response => response.text())
            .then(text => {
                e.cparts.state.data.value = text;
                e.cparts.state.data.isFetching = false;
                e.setAttribute('modulo-value', text);
                e.cparts.state.propagate('value', text);
            });
    }
}

function getComponentName(src = false) {
    src = src || props.src;
    if (src) {
        return src.split('/').pop().split('.').shift();
    } else {
        return 'App';
    }
}

function toggleMenu() {
    state.showMenu = !state.showMenu;
}

function run() {
    _updateState(); // Will auto-rerender, which will auto run if changed
}

function save() {
    _updateState();
    const fullText = toEmbed(state.value, state.componentName);
    saveFileAs(`Modulo_${ state.componentName }.html`, fullText);
}

function open() {
    _updateState();
    const fullText = toEmbed(state.value, state.componentName);
    const path =`/demo/${ state.componentName }.html`
    localStorage.setItem(LOCAL_STORAGE_PREFIX + path, fullText);
    window.location.href = (EDITOR_LOCATION + '?ls=' + path);
}


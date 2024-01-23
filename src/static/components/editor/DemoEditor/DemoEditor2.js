const EDITOR_LOCATION = '/static/demos/editor.html'
const LOCAL_STORAGE_PREFIX = 'mdufs-';
const { toEmbed } = modulo.registry.cparts.ModuloDemo; // Retrieve helper funcs
const { saveFileAs } = modulo.registry.utils;

const DEFAULT_EXPORT_TEMPLATE = (`
<!DOCTYPE html>
<template Modulo>{{ includes|safe }}
  <Component name="{{ name }}">{{ indentText|safe }}
  </Component>
</template>
<script src="https://unpkg.com/mdu.js"></script>
{{ usage|safe }}
`).trim();

function editorMount({ el, value }) {
    element.bufferEditors = element.bufferEditors || {};
    element.bufferEditors[value] = el; // attach based on buffer index
    el._onEditorValueChange = bufferValue => {
        state.buffers[value].value = bufferValue;
    };
    console.log('bufferEditors',element.bufferEditors);
}

function newBuffersFromElement({ value, src, example, exptemplate }, elem) {
    let defaultBufferValue = value || ''; // Start as empty string (which is also falsy, so we can upgrade)
    let isFetching = false; // 
    if (elem.hasAttribute('modulo-value') && !defaultBufferValue) {
        defaultBufferValue = elem.getAttribute('modulo-value');
    }
    if (src && !defaultBufferValue) {
        isFetching = true;
        defaultBufferValue = null;
        window.fetch(src)
            .then(response => response.text())
            .then(text => {
                const b = elem.cparts.state.data.buffers[0];
                delete b.isFetching; // Clear fetching status
                delete b.isStale; // Clear stale status
                delete b.staleValue; // no need for this either
                b.value = text; // update the text with fetch results
                elem.setAttribute('modulo-value', text); // store in DOM for built page
                elem.rerender(); // Force container rerender
                const bEditor = elem.bufferEditors[0]; // Get the specific buffer editor element and force refresh
                bEditor.cparts.state.data.value = text; //  Force assign to editor's state
                bEditor.stateChangedCallback(null, text, null); // Force editor rerender
                bEditor.rerender(); // Force editor rerender
            });
    }
    return [
        {
            name: 'default',
            value: '',
            isStale: true, // mark all as stale by default
            isFetching: isFetching,
            staleValue: defaultBufferValue,
        },
        {
            title: 'Usage',
            name: 'usage',
            subpaneClass: true,
            bannerClass: true,
            value: example || `<x-${ state.componentName }></x-${ state.componentName }>`,
            //value: '',
            /*
            isStale: true,
            staleValue: example || `<x-${ state.componentName }></x-${ state.componentName }>`,
            */
        },
        {
            title: 'Export',
            name: 'export',
            subpaneClass: true,
            bannerClass: true,
            value: exptemplate || DEFAULT_EXPORT_TEMPLATE,
            /*
            isHidden: true, // prevent editing, by default
            value: '',
            isStale: true,
            staleValue: exptemplate || DEFAULT_EXPORT_TEMPLATE,
            */
        },
    ];
}

function readyBuffer(index, skipSet = false) {
    if (!skipSet) {
        state.selectedBuffer =  index;
    }

    // Non-null staleValues are "cached" values, and get "popped" into their
    // real value when the buffer gets "ready". This is a little hack to delay
    // rerendering or re-processing of a value (e.g. treat buffers as empty
    // strings until then)
    const buffer = state.buffers[index];
    /*
    if (buffer.isStale && ('staleValue' in buffer) && buffer.staleValue !== null) {
        buffer.value = buffer.staleValue; // "pop" stale value"
        delete buffer.staleValue; // delete old one to prevent using again
    }
    */

    // Now, prep demo stuff as necessary
    state.demoBox = {
        value: getDemoValue('value'),
        component: getDemoValue('component'),
        example: getDemoValue('example'),
    };

    if (!skipSet) {
        console.log('thsi si textarea', element.querySelectorAll('textarea'));
    }
}

function getDemoValue(name) {
    if (name === 'component') {
        return getComponentName(); // special one!
    }
    modulo.assert(state.buffers[0].name === 'default', '...');
    const i = ['value', 'example', 'export' ].indexOf(name);
    modulo.assert(i > -1, 'Not expected: ' + name);
    const buffer = state.buffers[i];
    return buffer.value || buffer.value.staleValue || '';
}

function _updateState() {
    state.showEditor = !props.collapsed;
    state.componentName = getComponentName();
    if (state.buffers.length === 0) { // No buffers! Populate from props and element
        state.buffers = newBuffersFromElement(props, element);
    }
    if (state.selectedBuffer === -1) {
        state.selectedBuffer =  0;
        readyBuffer(0, true); // No selected buffer! Default to 0
    } else {
        readyBuffer(state.selectedBuffer, true);
    }
}

function prepareCallback() {
    _updateState();
}

function getComponentName(src = false) {
    if (props.component) { // takes precedence
        return props.component;
    }
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
    // TODO: Issue with hydrating, need to figure out, but in built version need this:
    //element.editor = element.editor || element.querySelector('x-SyntaxEditor') || null;
    _updateState(); // Will auto-rerender, which will also auto run if changed
}

function save() {
    // Saves as HTML
    _updateState();
    const { component, value, example } = state.demoBox;
    const includesCode = '';
    const exportCode = getDemoValue('export');
    const fullText = toEmbed(value, component, example, includesCode, exportCode);
    saveFileAs(`Modulo_${ component }.html`, fullText);
}


function open() {
    // Opens in ACE editor
    _updateState();
    const { component, value, example } = state.demoBox;
    const includesCode = '';
    const exportCode = getDemoValue('export');
    const fullText = toEmbed(value, component, example, includesCode, exportCode);
    const path =`/demo/${ component }.html`
    localStorage.setItem(LOCAL_STORAGE_PREFIX + path, fullText);
    window.location.href = (EDITOR_LOCATION + '?ls=' + path);
}


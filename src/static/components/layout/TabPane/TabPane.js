function selectTab(payload) {
    state.value = payload;
}

function prepareCallback() {
    const tabElements = [];
    for (const child of element.originalChildren) {
        if (!child.hasAttribute || !child.hasAttribute('tab-title')) {
            continue; // Skip anything without "tab-title" attribute
        }
        child.tabTitle = child.getAttribute('tab-title');
        tabElements.push(child); // Valid tab, include in list
        child.isSelected = false;
        if (!child.tabKey) { // First mount, no ids set
            child.tabKey = child.getAttribute('tab-title').toLowerCase(); // assume is unique
        }
        if (state.value === null) { // First iteration, no tab selected
            state.value = child.tabKey; // Set first tab as default
        }
        if (state.value === child.tabKey) { // This tab is selected
            child.isSelected = true;
        }
    }
    return { tabElements };
}


function renderCallback() {
    /*
    if (element.hasAttribute('modulo-mount-html')) {
        element.removeAttribute('modulo-mount-html');
        component.innerHTML = null; // Lock first render when re-hydrating
    }
    */
}

function updateCallback() {
    /*
    setTimeout(() => {
        const editor = element.querySelector('.tab-region-inner--selected x-DemoEditor');
        const sandbox = editor && editor.cparts && editor.cparts.modulosandbox;
        if (sandbox) {
            sandbox.forceActivate();
        }
    }, 10);
    */
}



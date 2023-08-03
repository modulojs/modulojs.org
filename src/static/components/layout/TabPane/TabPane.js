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
        if (!child.id) { // First mount, no ids set
            child.id = ++window._moduloID;
        }
        if (state.value === null) { // First iteration, no tab selected
            state.value = child.id; // Set first tab as default
        }

        if (state.value === child.id) {
            child.isSelected = true;
            state.html = child.innerHTML;
        }
    }
    return { tabElements };
}

function updateCallback() {
    if (props.hadjust) {
        //console.log(element.clientHeight);
    }
}

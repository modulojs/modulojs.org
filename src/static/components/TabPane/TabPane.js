function selectTab(payload) {
    state.value = payload;
}

function prepareCallback() {
    const tabElements = [];
    const elems = element.originalChildren.filter(c => c.getAttribute);
    for (const child of elems) {
        child.isSelected = false;
        if (!child.id) {
            child.id = ++window._moduloID; // assign next modulo ID
        }
        if (state.value === null) {
            state.value = child.id; // Set first tab as default
        }

        if (state.value === child.id) {
            child.isSelected = true;
        }
        child.tabTitle = child.getAttribute('tab-title');
        if (child.tabTitle) {
            tabElements.push(child);
        }
    }
    return { tabElements };
}

function updateCallback() {
    if (props.hadjust) {
        console.log(element.clientHeight);
    }
}

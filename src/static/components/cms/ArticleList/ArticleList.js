function prepareCallback() {
    if (!'learn,random'.includes(props.show)) { // for now just specify tutorial
        console.error('invalid article list');
        return;
    }
    if (state.loading === null) {
        state.loading = true;
        state.ready = false;
        const retrieved = {};
        state.paths = [];
        state.results = [];
        const pathPart = props.show === 'random' ? 'learn' : props.show;
        for (const path of staticdata.split(/\s*\n\s*/g)) {
            if (!path.includes('/' + pathPart + '/')) {
                continue;
            }
            state.paths.push(path);
            const url = '/' + path.replace(/^src./, '');
            window.fetch(url)
                .then(response => response.text())
                .then(originalHTML => {
                    // Strip Modulo boilerplate
                    originalHTML = originalHTML.replace(/^.*<scri.t(.type=.?md.?)?>/i, '');
                    const data = modulo.registry.utils.getMarkdownData(originalHTML);
                    data.url = url;
                    retrieved[path] = data;
                    if (Object.keys(retrieved).length >= state.paths.length) {
                        state.loading = false;
                        state.ready = true;
                        state.results = Array.from(Object.values(retrieved));
                        if (props.show === 'random') {
                            _randomizeState();
                            _truncateState();
                        }
                        element.rerender(); // Refresh, we have loaded
                    }
                });
        }
    }
}

function _randomizeState() {
    // Now, randomly sort based on hash of name + this
    const myName = window.document.querySelector('title').textContent;
    state.results.sort((a, b) => {
        const aHash = modulo.registry.utils.hash(a.title + myName);
        const bHash = modulo.registry.utils.hash(b.title + myName);
        return aHash === bHash ? 0 : (aHash > bHash ? -1 : 1);
    });
}

function _truncateState() {
    state.results = state.results.slice(0, 3);
}

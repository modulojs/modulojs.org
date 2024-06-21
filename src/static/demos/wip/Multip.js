modulo.multipRegistry = modulo.multipRegistry || new WeakMap();

modulo.register('util', function setupWorker (modulo) {
    onmessage = (ch, method, args) => ch === 'M' && modulo[method](args);
    modulo.importScripts = (...args) => importScripts(...args); // Expose import
    modulo.clientMultip = (cid, methodName, args) =>
        postMessage('M', 'receiveMultipComponentSignal', [ cid, methodName, args ]);
});

modulo.register('util', function setupClient (modulo) {
    // Setup remote & worker RPC messaging
    modulo.worker = new Worker('/static/js/Modulo.js');
    modulo.remote = (method, args) => modulo.worker.postMessage('M', method, args);
    modulo.worker.onmessage = (ch, method, args) => ch === 'M' && modulo[method].apply(modulo, args);
    // TODO: Potentially have a modulo.config.jsImports, e.g. <Modulo
    // js-imports:='[ ... ]'> to keep standard, which just does force='file' imports of files
    modulo.remote('importScripts', [ '/static/js/VWindow.js', '/static/js/MultiProcessingCPart.js' ]);
    modulo.receiveMultipComponentSignal = (cid, methodName, args) => {
        const cpart = modulo.multipRegistry.get(cid);
        if (!cpart) {
            console.log(cid, methodName, args);
            console.error('Multip system weak ref expired:', cid);
        } else {
            cpart[methodName].apply(cpart, args);
        }
    };
});

modulo.registry.core.RemoteDOMLoader = class RemoteDOMLoader extends modulo.registry.core.DOMLoader {
    loadFromDOM(elem, parentName = null, quietErrors = false) {
        if (elem._multipSerialized) {
            elem = makeDiv(elem._multipSerialized.trim()).firstChild; // Turn into DOM (using, assumedly, VWindow)
            super(elem, parentName = null, quietErrors = false);
        } else {
            elem = { _multipSerialized: elem.outerHTML };
            this.modulo.remote('loadFromDOM', [ elem, parentName, quietErrors ]);
        }
    }
};
modulo.registry.core.DOMLoader = modulo.registry.core.RemoteDOMLoader;

modulo.registry.cparts.MultiProcessing = class MultiProcessing {
    initializedCallback() {
        this.cid = this.element.cparts.component.id;
        this.lcMode = this.attrs.lifecycle || 'reconcile';
        this.modulo.multipRegistry.set(this.cid, this); // add weak back reference
        this.isRemote = (typeof importScripts) === 'function'; // In a Worker script
        console.log('thsi is cid', this.cid);
    }

    /*
    getID(elem) {
        this._childID = 0;
      if (!elem.hasAttribute('modulo-multip-id')) {
          const multipID = ++this._childID;
          elem.setAttribute('modulo-multip-id', this.cid);
      }
      return elem.getAttribute('modulo-multip-id');
    }
    */

    serializePatches(patches) {
        // TODO: Move to reconciler & make system of type hooks
        for (const patch of patches) { // Simply loop through given iterable
            if (patch[0].nodeType) { // DOM Node
                const pNode = patch[0].parentNode;
                if (pNode === this.element) {
                    patch[0] = [ null, childIndex ]; // null means self
                } else if (this.element.contains(pNode)) { // child
                    // TODO: Write '0,2,3' type hierarchy
                    patch[0] = [ indexOf, childIndex ];
                }
            }
        }
    }

    hydrateSerializedPatches(patches) {
    }

    receiveRerender(sPatches, html) {
        // TODO: Move to extended reconciler class?
        // Allows
        const patches = sPatches !== null ? this.hydrateSerializedPatches(sPatches) : null;
        const innerDOM = html !== null ? this.hydrateSerializedDOM(html) : null;
        component._lifecycle([ 'reconcile', 'update' ], { patches, innerDOM });
    }

    prepareCallback(renderObj) {
        if (!this.isRemote) {
            // TODO: Make this a no-op - prevent rerender of this element
            // entirely, since it should only be "pupetted"
        }
    }

    reconcileCallback(renderObj) {
        if (this.isRemote && this.lcMode === 'reconcile') {
            const html = renderObj.innerDOM.innerHTML; // Simply retrieve innerHTML of innerDOM
            modulo.clientMultip(this.cid, 'receiveRerender', [ null, html ] );
        }
    }

    updateCallback(renderObj) {
        if (this.isRemote && this.lcMode === 'update') {
            const serializedPatches = this.serializePatches(renderObj.patches);
            modulo.clientMultip(this.cid, 'receiveRerender', [ serializedPatches, null ] );
        }
    }

};


if ((typeof importScripts) === 'function') { // In a Worker script, add "client" method
    modulo.registry.utils.setupWorker(modulo); // Call global setup for worker
} else {
    modulo.registry.utils.setupClient(modulo); // Call global setup for client
}

// TODO: Later, add two more modes: SharedSocketWorker and BackendWebWorker (run on Node.js)
// BE server is the "final say", while SharedSocketWorker and received patches from it, as such:
// - DOM modulo (not worker, acts the same)
//    -> SharedSocketWorker (purely go-between to keep interface consistent)
//    -> Web Socket transport layer
//    -> Backend Modulo on Node.js
//           - Implementation notes: Create backend "WebWorker-like" object
//           collection, with worker-state potentially serialized to shared
//           cache somehow (e.g. redis - will need for Web Sockets anyway)

// Finally... the dream of DOM patches over the network!!
// Far future implementations expanding on above:
//   -> Modulo.rs (Noooooooooooo)
//       -> Mostly for: TauriRustLayer (to avoid using network transport)
//       -> Modulo.js and VWindow.js re-implemented in Rust
// Then, "Modulo-Tauri-App" could be a super fast app container, where most
// templating, DOM stuff, etc happens in Rust, and only falling back to JS in
// WebWorker or DOM implementations when out of scope of "Modulo.rs"
// re-implementations


        /*
        // "Rename" the "mount" attribute to "multip" attribute
        const MOUNT_ATTR = 'modulo-mount-patches';
        const ATTR = 'modulo-multip-patches';
        for (const elem of this.element.querySelectorAll(`[${ ATTR }]`)) {
            for (const line of elem.getAttribute(ATTR).split('\n')) {
                const [ count, rawName ] = line.split(','); // Comma seperated
                const nodePath = '.parentNode'.repeat(count).substr(1);
                if (this.element === get(elem, nodePath)) { // It's me!
                    elem.setAttribute(ATTR, elem.getAttribute(MOUNT_ATTR));
                    elem.removeAttribute(MOUNT_ATTR);
                    const newVal = elem.getAttribute(ATTR).replace(line, '');
                    elem.setAttribute(ATTR, newVal); // "Consume" line from attr
                }
            }

        }
        */
        /*
        const ATTR = 'modulo-multip-patches'; // Attribute used
        const { get } = this.modulo.registry.utils;
        for (const elem of this.element.querySelectorAll(`[${ ATTR }]`)) {
            for (const line of elem.getAttribute(ATTR).split('\n')) {
                const [ count, rawName ] = line.split(','); // Comma seperated
                const nodePath = '.parentNode'.repeat(count).substr(1);
                if (this.element === get(elem, nodePath)) { // It's me!
                    this.reconciler.patchDirectives(elem, rawName, 'Mount');
                    const newVal = elem.getAttribute(ATTR).replace(line, '');
                    elem.setAttribute(ATTR, newVal); // "Consume" line from attr
                }
            }
        }


   _consumeMountCallbacks(attr, renameTo) { // Prepare the element, "hydrating" the "multip-patches"
        const { get } = this.modulo.registry.utils;
        for (const elem of this.element.querySelectorAll(`[${ attr }]`)) {
            for (const line of elem.getAttribute(attr).split('\n')) {
                const [ count, rawName ] = line.split(','); // Comma seperated
                const nodePath = '.parentNode'.repeat(count).substr(1);
                if (this.element === get(elem, nodePath)) { // It's me!
                    if (!renameTo) { // Should be doing the patch itself
                        this.reconciler.patchDirectives(elem, rawName, 'Mount');
                    } else { // should just be renaming
                        const existing = el.getAttribute(renameTo) || '';
                        if (!existing.includes(count + ',' + rawName)) { // Not a dupe
                            const value = existing + '\n' + count + ',' + rawName;
                            el.setAttribute(renameTo, value.trim());
                        }

                    }
                    const newVal = elem.getAttribute(attr).replace(line, '');
                    elem.setAttribute(attr, newVal); // "Consume" line from attr
                }
            }
        }
    }

    mountCallback() { // Prepare the element, "hydrating" the "multip-patches"
        this._consumeMountCallbacks('modulo-multip-patches', false);

    }

    buildCallback() { // Rename all of "my" mount-patches callbacks to multip-patches
        this._consumeMountCallbacks('modulo-mount-patches', 'modulo-multip-patches');
    }
        */

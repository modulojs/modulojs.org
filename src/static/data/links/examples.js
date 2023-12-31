{
    createModuloVersion: "0.0.37", // Update to change the version the .zip files are linked to
    starterTemplates: [
        {
            title: "Jamstack (Static Site with Markdown and CMS)",
            supports: [ "Graphical CMS (Decap / Netlify)", "3rd Party Auth (Decap / Netlify)", "Markdown (& more)" ],
            requires: "Server",
            file: "modulo-jamstack-cms.zip",
            image: "jamstack-cms.png",
        },
        {
            title: "Jamstack (Static Site with Markdown)",
            supports: [ "Markdown", "Components", "JSON-based Data", ],
            requires: "Server",
            file: "modulo-jamstack-cms.zip",
            image: "jamstack-md.png",
        },
        {
            title: "Jamstack (Static Site)",
            supports: [ "Components", "JSON-based Data", ],
            file: "modulo-jamstack.zip",
            requires: "Server",
            image: "jamstack.png",
        },
        {
            title: "Single Page App",
            file: "modulo-spa.zip",
            supports: [ "Components", "Example Custom CPart Integration", "Example REST API Usage" ],
            requires: "Server",
            image: "spa.png",
        },
        {
            title: "HTML Quick Start (with Markdown)",
            supports: [ "Write articles in Markdown", "Five example pages",  "Good for HTML beginners" ],
            file: "modulo-quick-pages-markdown.zip",
            image: "jamstack-md.png",
        },
        {
            title: "HTML Quick Start",
            supports: [ "Three example pages", "Easy to edit HTML", "Good for HTML beginners" ],
            file: "modulo-quick-pages.zip",
            image: "jamstack.png",
        },
    ],

    advanced: [
        {
            title: "Global Store",
            file: "/static/demos/advanced/global_store.html",
            description: "Use '-store' to let components share state and trigger refreshes",
        },
        {
            title: "Frontend: Adding CKeditor",
            file: "/static/demos/advanced/ckeditor.html",
            description: "Use '-src' to integrate a popular JavaScript rich text editor",
        },
        {
            title: "Custom CPart for APIs",
            file: "/static/demos/advanced/custom_cpart_for_api.html",
            description: "A typical use of custom CParts is to abstract away APIs.",
        },
        {
            title: "Custom CPart for legacy frontend",
            file: "/static/demos/advanced/custom_cpart_for_jquery_fittext.html",
            description: "Modulo is useful as a glue to integrate with legacy libraries (in this case, FitText.js).",
        },
        {
            title: "Handlebars Templating",
            file: "/static/demos/advanced/handlebars_templater.html",
            description: "Demonstrates integrating Modulo with a custom Template engine (in this case, Handlebars)",
        },
        {
            title: "JSX Templating",
            file: "/static/demos/advanced/jsx_template.html",
            description: "Demonstrates using Babel JS and a custom Template CPart to enable React-style JSX syntax in Modulo.",
        },
        {
            title: "Test Suite Example",
            file: "/static/demos/advanced/testsuite_example.html",
            description: "Demonstrates creating a TestSuite (Mostly Undocumented) ",
        },
        {
            title: "Modulo Synth with Tone.js",
            file: "/static/demos/advanced/tone_example.html",
            description: "A fully functional baseline synthesizer, with a simple step sequencer and ASDR.",
        },
    ],

    components: [
        {
            file: "/static/demos/eg/HelloModulo.html",
        },
        {
            file: "/static/demos/eg/SimpleStyle.html",
        },
        {
            file: "/static/demos/eg/ToDo.html",
        },
        /*
        // (Using JSONFile instead since it doesn't hang / use up API calls)
        {
            file: "/static/demos/eg/JSON.html",
        },
        {
            file: "/static/demos/eg/JSONFile.html",
        },
        */
        {
            file: "/static/demos/eg/SimpleTable.html",
        },
        /*
        {
            file: "/static/demos/eg/SimpleButton.html",
            usage: `
<x-SimpleButton>Example One</x-SimpleButton><br />
<x-SimpleButton>Example Two: The attack of the longer text</x-SimpleButton><br />
<x-SimpleButton>Three</x-SimpleButton><br />
            `
        },
        */

        {
            file: "/static/demos/eg/TablePushPop.html",
        },
        /*
        {
            file: "/static/demos/eg/DataTable.html",
        },
        */
        {
            file: "/static/demos/eg/CSVTable.html",
        },
        {
            file: "/static/demos/eg/JSONArray.html",
        },
        {
            file: "/static/demos/eg/GitHubAPI.html",
        },
        {
            file: "/static/demos/eg/ColorSelector.html",
        },
        {
            file: "/static/demos/eg/GradientPicker.html",
        },
        {
            file: "/static/demos/eg/BindingSliders.html",
        },
        {
            file: "/static/demos/eg/TextStyler.html",
        },
        /*
        {
            file: "/static/demos/eg/DateNumberPicker.html",
        },
        */
        {
            file: "/static/demos/eg/ToggleVisible.html",
        },
        {
            file: "/static/demos/eg/Accordion.html",
        },
        {
            file: "/static/demos/eg/PrimeSieve.html",
        },
        {
            file: "/static/demos/eg/Scatter.html",
        },
        {
            file: "/static/demos/eg/WorldMap.html",
        },
        {
            file: "/static/demos/eg/FlexibleForm.html",
        },
        {
            file: "/static/demos/eg/FlexibleFormWithAPI.html",
        },
        /*
        {
            file: "/static/demos/eg/Components.html",
            includes: "/static/demos/eg/DemoModal.html,/static/demos/eg/DemoChart.html",
        },
        {
            file: "/static/demos/eg/ComponentsLoop.html",
            includes: "/static/demos/eg/DemoModal.html",
        },
        {
            file: "/static/demos/eg/OscillatingGraph.html",
            includes: "/static/demos/eg/DemoChart.html",
        },
        */
        {
            file: "/static/demos/eg/SimpleTabs.html",
            usage: `
<x-SimpleTabs>
    <div slot="info">
        <p><strong>Peafowl</strong> is a common name for three bird species.</p>
    </div>
    <div slot="image">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Peacock.jpg/320px-Peacock.jpg"
          style="height: 100px"
        />
    </div>
    <div slot="link">
        <p><a href="https://en.wikipedia.org/wiki/Peafowl">Join the peafowl.</a></p>
        <p><em>Leave your worries behind, become one with the peafowl!</em></p>
    </div>
</x-SimpleTabs>
            `
        },
        {
            file: "/static/demos/eg/DemoModal.html",
            usage: `<x-DemoModal button="Example Button" title="Example Title">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Hippo_walking.jpg/320px-Hippo_walking.jpg" />
    <p>Example paragraph #1</p>
    <p>Example paragraph #2</p>
</x-DemoModal>`,
        },

        {
            file: "/static/demos/eg/DemoChart.html",
            usage: "<x-DemoChart data='[1, 2, 3, 5, 8]'></x-DemoChart>",
        },
        {
            file: "/static/demos/eg/Search.html",
        },
        {
            file: "/static/demos/eg/SearchBox.html",
        },
        {
            file: "/static/demos/eg/MarkdownPreview.html",
        },
        /*
        {
            file: "/static/demos/eg/CKEditor.html",
            usage: `<x-CKEditor>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Peacock.jpg/320px-Peacock.jpg" />
    <p>Example paragraph #1</p>
    <p>Example paragraph #2</p>
</x-CKEditor>`,
        },
        */
        {
            file: "/static/demos/eg/MirrorEditor.html",
            usage: `
<x-MirrorEditor 
    style="
        height: 200px;
        background-color: white;
        --outline-color: #888888EA;
        --outline-width: 3px;
        --text-color: #151515;
    "
    value="
# Syntax
**This** is a
[Modulo](#modulo)
_Component_

## Demonstration
Syntax highlighting
in a **textarea**
using a _mirror_
element.
"></x-MirrorEditor>
        `,
        },
        {
            file: "/static/demos/eg/MemoryGame.html",
        },
        {
            file: "/static/demos/eg/ConwayGameOfLife.html",
        },
    ],

}

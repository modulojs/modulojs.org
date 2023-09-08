{
    createModuloVersion: "0.0.34", // Update to change the version the .zip files are linked to
    starterTemplates: [
        {
            title: "JAMStack (Static Site with Markdown and CMS)",
            supports: [ "Graphical CMS (Decap / Netlify)", "3rd Party Auth (Decap / Netlify)", "Markdown (& more)" ],
            requires: "Server",
            file: "modulo-jamstack-cms.zip",
            image: "jamstack-cms.png",
        },
        {
            title: "JAMStack (Static Site with Markdown)",
            supports: [ "Markdown", "Components", "JSON-based Data", ],
            requires: "Server",
            file: "modulo-jamstack-cms.zip",
            image: "jamstack-md.png",
        },
        {
            title: "JAMStack (Static Site)",
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
            file: "/static/demos/eg/HelloCount.html",
        },
        {
            file: "/static/demos/eg/SimpleStyle.html",
        },
        {
            file: "/static/demos/eg/ToDo.html",
        },
        {
            file: "/static/demos/eg/JSON.html",
        },
        {
            file: "/static/demos/eg/JSONArray.html",
        },
        {
            file: "/static/demos/eg/SimpleTable.html",
        },
        {
            file: "/static/demos/eg/TablePushPop.html",
        },
        /*
        {
            file: "/static/demos/eg/DataTable.html",
        },
        */
        {
            file: "/static/demos/eg/GitHubAPI.html",
        },
        {
            file: "/static/demos/eg/BindingSliders.html",
        },
        {
            file: "/static/demos/eg/ColorSelector.html",
        },
        {
            file: "/static/demos/eg/GradientPicker.html",
        },
        /*
        {
            file: "/static/demos/eg/TextStyler.html",
        },
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
            includes: "/static/demos/usedby/DemoModal.html,/static/demos/usedby/DemoChart.html",
        },
        {
            file: "/static/demos/eg/ComponentsLoop.html",
            includes: "/static/demos/usedby/DemoModal.html",
        },
        {
            file: "/static/demos/eg/OscillatingGraph.html",
            includes: "/static/demos/usedby/DemoChart.html",
        },
        */
        {
            file: "/static/demos/usedby/DemoModal.html",
            usage: `<x-DemoModal button="Example Button" title="Example Title">
    <p>Example paragraph #1</p>
    <p>Example paragraph #2</p>
</x-DemoModal>`,
        },

        {
            file: "/static/demos/usedby/DemoChart.html",
            usage: "<x-DemoChart data='[1, 2, 3, 5, 8]'></x-DemoChart>",
        },
        {
            file: "/static/demos/eg/Search.html",
        },
        {
            file: "/static/demos/eg/MarkdownPreview.html",
        },
        {
            file: "/static/demos/eg/SearchBox.html",
        },
        {
            file: "/static/demos/eg/MemoryGame.html",
        },
        {
            file: "/static/demos/eg/ConwayGameOfLife.html",
        },
    ],

}

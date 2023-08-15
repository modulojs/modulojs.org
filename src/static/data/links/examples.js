{
    createModuloVersion: "0.0.32", // Update to change the version the .zip files are linked to
    starterTemplates: [
        {
            title: "JAMStack (Static Site with Markdown and CMS)",
            description: "A starter project with Modulo ready-to-go that features ",
            supports: [ "Graphical CMS (Decap / Netlify)", "3rd Party Auth (Decap / Netlify)", "Markdown (& more)" ],
            requires: "Server",
            file: "modulo-jamstack-cms.zip",
            image: "jamstack-cms.png",
        },
        {
            title: "JAMStack (Static Site with Markdown)",
            description: "A starter project with Modulo ready-to-go that features ",
            supports: [ "Markdown", "Components", "JSON-based Data", ],
            requires: "Server",
            file: "modulo-jamstack-cms.zip",
            image: "jamstack-md.png",
        },
        {
            title: "JAMStack (Static Site)",
            description: `A static site starter project with Modulo downloaded
            locally and ready to go. This project demonstrates directory
            structure, and features 3 example pages and 2 example components.`,
            supports: [ "Components", "JSON-based Data", ],
            file: "modulo-jamstack.zip",
            requires: "Server",
            image: "jamstack.png",
        },
        {
            title: "Single Page App",
            description: `A much more miminamalist starting project compared to
            the static-site variants above, choose this one if you want fewer
            examples and a clean slate that's similar to "create-react-app"`,
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
    components: [
        {
            file: "/static/demos/eg/Hello.html",
        },
        {
            file: "/static/demos/eg/Simple.html",
        },
        {
            file: "/static/demos/eg/ToDo.html",
        },
        {
            file: "/static/demos/eg/JSON.html",
        },
        {
            file: "/static/demos/eg/Scatter.html",
        },
        {
            file: "/static/demos/eg/Search.html",
        },
        /*{
            file: "/static/demos/eg/Components.html",
        },*/
        {
            file: "/static/demos/eg/MemoryGame.html",
        },
    ],
}

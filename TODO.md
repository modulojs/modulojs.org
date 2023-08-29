
Final list
---------------------------

- (DONE) Fix / Replace World Map Demo
- (DONE) Tutorial 1
- Tutorial 2
- Tutorial 3
- Finish news article of website launch
- Table of Contents - update keywords descriptions, tutorial name


Nice to haves
-------------
- Swap out Highlight.js for one that can handle Django + CSS
- Quick pages flat structure + config.js + site.css


Blocking
---------------------------

- Tutorial
    - TUTORIAL 1 - Ramping Up
        - HTML & CSS prereq, no need for li
        - How to start with a blank file and build from there
        - Part 1: Getting Started - starting with a CDN, Components, Re-use,
          and Slots
        - Part 2: CParts - Props, Style, and Templating
            - Show how to use "isolate" to only target what is immediately
              rendered
            - Introduce the concept of "template tags" and "template filters"
            - Show use of "if" to have optional parts
        - Part 3: Reactive Forms - Directives, Data Types, and Binding
            - Show use of state
    - TUTORIAL 2: Building Apps with Modulo
        - libraries, building, etc, and also what is now the beginning
            and end of Part3 - e.g. how to include JS / Script tag
        - Try to finish just some parts for now?
        - (?) Part 1: Data and Advanced Templating
            - Show use of for loop
            - Show use of StaticData
        - (?) Part 2: Building, Quick Pages Templates, and Launching
        - (?) Part 3: Libraries - Start a dev server, show 



- Project Templates
    - Quick Pages
        - Change to flat 5 or 3 page structure
        - Add in config.js (config logo etc, allows adding JS / extensions) and
          site.css (allows CSS variables)
    - All: Walk through each step again

- Examples
    - Replace or fix World Map example


Low prio
----------------------

- Article Idea:
    - Library / Framework development as "DSL-lite" (Which could lead to:
      Modulo as the basis for DSLs - if we can make "DSL-lite" / library / fw
      development easier, we have more robust codebases!)

misc
----------------------

YAML in progress:

    - label: "Core Pages"
        label_singular: "Page"
        name: "pages"
        folder: "/."
        extension: "html"
        format: "toml-frontmatter"
        identifier_field: "filename"
        slug: "{{dirname}}{{filename}}.{{extension}}"
        summary: "{{fields.src}}"
        frontmatter_delimiter: [
            "<!DOCTYPE HTML>\n<script Modulo\n",
            "></script>",
        ]
        create: true
        delete: true
        fields:
        - {label: "Modulo JS Source", name: "src", widget: "string"}
        - {label: "Component Library", name: "-src", widget: "string"}
        - {label: "HTML Page Content", name: "body", widget: "code"}


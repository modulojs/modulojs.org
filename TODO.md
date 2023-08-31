
Final list
---------------------------

- (DONE) Fix / Replace World Map Demo
- (DONE) Tutorial 1
- (INP) Tutorial 2
- (INP) Tutorial 3
- (DONE) Finish news article of website launch
- (DONE) Table of Contents - update keywords descriptions, tutorial name



Nice to haves
-------------
- Swap out Highlight.js for one that can handle Django + CSS
- Quick pages flat structure + config.js + site.css


Blocking
---------------------------


- Project Templates
    - Quick Pages
        - Change to flat 5 or 3 page structure
        - Add in config.js (config logo etc, allows adding JS / extensions) and
          site.css (allows CSS variables)
    - All: Walk through each step again



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

        groupby: (s, arg) => Array.from(new Set(s.map(i => i[arg]))).map(value => s.filter(i => i[arg] === value),

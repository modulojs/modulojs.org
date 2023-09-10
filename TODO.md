Tasks
-------------
- 0.0.64:
    - Silence -name'd templates (or marked as primary:=true)
    - innerDOM
- Quick pages flat structure + config.js + site.css



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

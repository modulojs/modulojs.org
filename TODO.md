
Key items left:

- Fix jamstack SSG template:
    - Allow `script` tag to preserve whitespace, plus any other enhancements
    - Make sure meta tag info etc is correct
    - Add /build to gitignore
    - Maybe: Include github hooks as an example
- Fix create-modulo script:
    - Don't install anything by default (even express) - only fetch latest
      Modulo (so no node_modules)
    - Update package.json to just use `npx http-server` in all cases
    - Update README to reflect that you need to do an `npm run install` before
      trying to build locally

- Auto gen other ptemplates:
    - One more thing: Make a script that "downgrades" ptemplates/jamstack-cms into variants.
    - That way I only maintain jamstack-cms, and auto-reduce to the subsets
    - Lighterweight:
        - Remove CMS, reduce to SPA
    - HTTP linked (file:/// proto friendly):
        - Substitute all relative paths with unpkg equivalents
    - Zipped:
        - These get directly linked to by the main modulojs website for a nice
          collection of HTTP downloadable zip demos (no NPM needed)


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


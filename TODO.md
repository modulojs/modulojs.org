
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
      continuing



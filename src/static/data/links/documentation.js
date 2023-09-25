{
    docs: [

        {
            showHeader: 'Tutorials',
            label: 'Ramping Up',
            tutorial: true,
            filename: '/tutorial/ramping-up/',
            sections: [
                {
                    label: 'Components and Their Parts',
                    partLabel: 'Part 1',
                    filename: 'part1.html',
                    keywords: ['component', 'component part', 'cparts', 'customElement', 'Template', 'Props', 'template variable'],
                },
                {
                    label: 'State, Binding, and Template Filters',
                    partLabel: 'Part 2',
                    filename: 'part2.html',
                    keywords: [ 'state', 'directives', 'binding inputs', 'state.bind', 'template filters', 'default', 'allow' ],
                },
                {
                    label: 'Slots, Shadow, and Template Tags',
                    partLabel: 'Part 3',
                    filename: 'part3.html',
                    keywords: [ 'slot', 'slot name', 'children', 'shadow dom',
                      'css isolation', 'class isolation', 'shadow isolation', 'vanish', 'template tags', 'comment', 'if', '==', 'is', 'else', 'endif' ],
                },
                {
                    label: 'Data Types, For Loops, and StaticData',
                    partLabel: 'Part 4',
                    filename: 'part4.html',
                    keywords: [ 'string', 'number', 'array', 'object', 'template tags', 'for', 'endfor', 'staticdata', 'json', 'API', 'CSV' ],
                },
                {
                    label: 'Events and Scripts',
                    partLabel: 'Part 5',
                    filename: 'part5.html',
                    keywords: [ ,
                      'event', 'event listening', 'click', '@click:=', 'methods',
                      'Array methods', 'pop', 'push', 'reverse', 'shift', 'script tag', 'JavaScript', 'num++', '-data-type="js"' ],
                },
            ],
        },

        {
            label: 'Building Apps',
            tutorial: true,
            filename: '/tutorial/building-apps/',
            sections: [
                {
                    label: 'Sources',
                    partLabel: 'Part 1',
                    filename: 'part1.html',
                    keywords: ['live server', 'building', 'source', '-src', 'splitting files' ],
                },
                {
                    label: 'Going Big',
                    partLabel: 'Part 2',
                    filename: 'part2.html',
                    keywords: [
                        'Library', 'ssg', 'server-side generation', 'ssr',
                        'server-side rendering', 'jamstack',
                        'starting templates', 'projects', 'markdown',
                        'markdown-html', 'decap', 'cms', 'netlify'
                    ],
                },
                {
                    label: 'Building and Integrating',
                    partLabel: 'Part 3',
                    filename: 'part3.html',
                    keywords: [
                        'build', 'optimizing', 'github', 'cd', 'library',
                        'continuous delivery', 'launching', 'php', 'backend'
                    ],
                },
            ],
        },



        {
            //showHeader: 'Definitions',
            showHeader: 'Documentation',
            label: 'Component Parts',
            filename: '/docs/cparts/',
            sections: [
                {
                    label: 'Props',
                    filename: 'props.html',
                    keywords: ['accessing props', 'defining props', 'setting props', 'using props'],
                },
                {
                    label: 'Script',
                    filename: 'script.html',
                    keywords: ['javascript', 'events', 'computed properties',
                    'static execution', 'custom lifecycle methods',
                    'script callback execution context', 'script exports'],
                },
                {
                    label: 'State',
                    filename: 'state.html',
                    keywords: ['state definition', 'state data types', 'json',
                    'state variables', 'state.bind directive'],
                },
                {
                    label: 'StaticData',
                    filename: 'staticdata.html',
                    keywords: ['loading API', 'loading json', 'bundling data'],
                },
                {
                    label: 'Style',
                    filename: 'style.html',
                    keywords: ['CSS', 'styling', 'prefixing', 'isolation', ':host', 'shadowDOM'],
                },
                {
                    label: 'Template',
                    filename: 'template.html',
                    keywords: ['custom template', 'templating engine'],
                },
            ],
        },

        {
            label: 'Core Definitions',
            filename: '/docs/core.html',
            sections: [
                {
                    label: 'Artifact',
                    fragment: 'artifact',
                    keywords: ['bundle', 'build', 'custom builds'],
                },
                {
                    label: 'Component',
                    fragment: 'component',
                    keywords: ['name', 'innerHTML', 'patches',
                    'reconciliation', 'rendering mode', 'manual rerender',
                    'shadow', 'vanish', 'vanish-into-document',
                    'component.event', 'component.slot', 'component.dataProp'],
                },
                {
                    label: 'Configuration',
                    fragment: 'configuration',
                    keywords: ['config', 'loading', 'unpkg', 'npm',
                    'dependency', 'registering helpers','registering custom cparts'],
                },
                {
                    label: 'Modulo',
                    fragment: 'modulo',
                    keywords: ['starting', 'mounting', 'custom loading', 'custom mounting'],
                },
            ],
        },
        {
            //showHeader: 'Templating',
            label: 'Templating Language',
            filename: '/docs/templating/index.html',
            sections: [
                {
                    label: 'Templates',
                    fragment: 'templates',
                    keywords: ['templating philosophy', 'templating overview'],
                },
                {
                    label: 'Variables',
                    fragment: 'variables',
                    keywords: ['variable syntax', 'variable sources', 'cparts as variables'],
                },
                {
                    label: 'Filters',
                    fragment: 'filters',
                    keywords: ['filter syntax', 'example use of filters', 'custom template filters'],
                },
                {
                    label: 'Tags',
                    fragment: 'tags',
                    keywords: ['template-tag syntax', 'example use of templatetags', 'custom template tags'],
                },
                {
                    label: 'Comments',
                    fragment: 'comments',
                    keywords: ['syntax', 'inline comments', 'block comments'],
                },
                {
                    label: 'Debugging',
                    fragment: 'debugging',
                    keywords: ['code generation', 'debugger', 'developer tools'],
                },
                {
                    label: 'Escaping',
                    fragment: 'escaping',
                    keywords: ['escaping HTML', 'safe filter', 'XSS injection protection'],
                },
            ],
        },

        {
            label: 'Template Tags',
            filename: '/docs/templating/tags.html',
            sections: [
                {
                    "fragment": "comment",
                    "label": "comment"
                },
                {
                    "fragment": "debugger",
                    "label": "debugger"
                },
                {
                    "fragment": "include",
                    "label": "include"
                },
                {
                    "fragment": "for",
                    "label": "for"
                },
                {
                    "fragment": "empty",
                    "label": "empty"
                },
                {
                    "fragment": "if",
                    "label": "if"
                },
                {
                    "fragment": "else",
                    "label": "else"
                },
                {
                    "fragment": "elifelseif",
                    "label": "elif, elseif"
                },
                {
                    "fragment": "iftagoperators",
                    "label": "if-tag operators"
                },
                {
                    "fragment": "isoperator",
                    "label": "==, is"
                },
                {
                    "fragment": "isnotoperator",
                    "label": "!=, is not"
                },
                {
                    "fragment": "notoperator",
                    "label": "not"
                },
                {
                    "fragment": "ltoperators",
                    "label": "lt, <, <="
                },
                {
                    "fragment": "gtoperators",
                    "label": "gt, >, >="
                },
                {
                    "fragment": "innotinoperators",
                    "label": "in, not in"
                }
            ],
        },

        {
            label: 'Template Filters',
            filename: '/docs/templating/filters.html',
            sections: [
                {
                  "fragment": "add",
                  "label": "add"
                },
                {
                  "fragment": "allow",
                  "label": "allow"
                },
                {
                  "fragment": "camelcase",
                  "label": "camelcase"
                },
                {
                  "fragment": "capfirst",
                  "label": "capfirst"
                },
                /*
                {
                  "fragment": "concat",
                  "label": "concat"
                },
                */
                {
                  "fragment": "combine",
                  "label": "combine"
                },
                {
                  "fragment": "default",
                  "label": "default"
                },
                {
                  "fragment": "divisibleby",
                  "label": "divisibleby"
                },
                /*
                {
                  "fragment": "dividedinto",
                  "label": "dividedinto"
                },
                */
                {
                  "fragment": "escapejs",
                  "label": "escapejs"
                },
                {
                  "fragment": "first",
                  "label": "first"
                },
                {
                  "fragment": "get",
                  "label": "get"
                },
                {
                  "fragment": "join",
                  "label": "join"
                },
                {
                  "fragment": "json",
                  "label": "json"
                },
                {
                  "fragment": "last",
                  "label": "last"
                },
                {
                  "fragment": "length",
                  "label": "length"
                },
                {
                  "fragment": "lower",
                  "label": "lower"
                },
                {
                  "fragment": "multiply",
                  "label": "multiply"
                },
                {
                  "fragment": "number",
                  "label": "number"
                },
                {
                  "fragment": "pluralize",
                  "label": "pluralize"
                },
                {
                  "fragment": "skipfirst",
                  "label": "skipfirst"
                },
                {
                  "fragment": "subtract",
                  "label": "subtract"
                },
                {
                  "fragment": "truncate",
                  "label": "truncate"
                },
                {
                  "fragment": "type",
                  "label": "type"
                },
                {
                  "fragment": "renderas",
                  "label": "renderas"
                },
                {
                  "fragment": "reversed",
                  "label": "reversed"
                },
                {
                  "fragment": "upper",
                  "label": "upper"
                },
                {
                  "fragment": "values",
                  "label": "values"
                },
                {
                  "fragment": "yesno",
                  "label": "yesno"
                },
                {
                  "fragment": "safe",
                  "label": "safe"
                },
                {
                  "fragment": "keys",
                  "label": "keys"
                },
                {
                  "fragment": "entries",
                  "label": "entries"
                }
            ],
        },

        {
            //showHeader: 'Component',
            label: 'Lifecycle',
            filename: '/docs/lifecycle.html',
            sections: [
                {
                    label: 'Lifecycle callbacks',
                    fragment: 'callbacks',
                    keywords: ['hooking into lifecycle', 'callbacks', 'script tag callbacks', 'renderObj', 'initRenderObj' ],
                },
                {
                    label: 'Component lifecycle',
                    fragment: 'global',
                    keywords: ['constructor', 'constructed', 'mount', 'mountRender', 'initialized', 'prepare',
                               'render', 'dom', 'reconcile', 'update', 'directive lifecycles', 'event', 'eventCleanup'],
                },
            ],
        },

        {
            label: 'Directives',
            filename: '/docs/directives.html',
            sections: [
                {
                    label: 'Directives',
                    fragment: 'directives',
                    keywords: ['built-in directives', 'directive shortcuts', 'custom directives'],
                },
                {
                    label: 'Built-in directives',
                    fragment: 'builtin',
                    keywords: [ '[component.dataProp]', ':=', 'prop:=', 'JSON primitive', 'data-prop', 'assignment', '[component.event]', '@click', '@...:=', '[component.slot]', '[state.bind]', ],
                },
                {
                    label: 'Custom directives',
                    fragment: 'custom',
                    keywords: [ 'refs', 'accessing dom', 'escape hatch', 'Mount callbacks', 'Unmount callbacks', 'template variables vs directives', 'script-tag custom directives', 'custom shortcuts', ],
                },
            ],
        },

    ],
}

{
    tutorial: [
        {
            label: 'Components and Their Parts',
            tutorialName: 'Ramping Up with Modulo',
            partLabel: 'Part 1',
            filename: '/tutorial/ramping-up-1.html',
            keywords: ['component', 'component part', 'cparts', 'customElement', 'Template', 'Props', 'template variable'],
        },
        {
            label: 'State, Binding, and Template Filters',
            tutorialName: 'Ramping Up with Modulo',
            partLabel: 'Part 2',
            filename: '/tutorial/ramping-up-2.html',
            keywords: [ 'state', 'directives', 'binding inputs', 'state.bind', 'template filters', 'default', 'allow' ],
        },
        {
            label: 'Data Types, Template Tags, and StaticData',
            tutorialName: 'Ramping Up with Modulo',
            partLabel: 'Part 3',
            filename: '/tutorial/ramping-up-3.html',
            keywords: [ 'string', 'number', 'array', 'object', 'template tags', 'if', '==', 'is', 'else', 'endif', 'for', 'endfor', 'staticdata', 'json', 'API', 'CSV' ],
        },
    ],

    docs: [
        {
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
            label: 'Templating',
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
                    "fragment": "capfirst",
                    "label": "capfirst"
                },
                {
                    "fragment": "default",
                    "label": "default"
                },
                {
                    "fragment": "divisibleby",
                    "label": "divisibleby"
                },
                {
                    "fragment": "escapejs",
                    "label": "escapejs"
                },
                {
                    "fragment": "first",
                    "label": "first"
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
                    "fragment": "pluralize",
                    "label": "pluralize"
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
                }
            ]

            ,
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

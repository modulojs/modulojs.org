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
            filename: '/docs/cparts.html',
            sections: [
                {
                    label: 'Props',
                    fragment: 'props',
                    keywords: ['accessing props', 'defining props', 'setting props', 'using props'],
                },
                {
                    label: 'Script',
                    fragment: 'script',
                    keywords: ['javascript', 'events', 'computed properties',
                    'static execution', 'custom lifecycle methods',
                    'script callback execution context', 'script exports'],
                },
                {
                    label: 'State',
                    fragment: 'state',
                    keywords: ['state definition', 'state data types', 'json',
                    'state variables', 'state.bind directive'],
                },
                {
                    label: 'StaticData',
                    fragment: 'staticdata',
                    keywords: ['loading API', 'loading json', 'bundling data'],
                },
                {
                    label: 'Style',
                    fragment: 'style',
                    keywords: ['CSS', 'styling', 'prefixing', 'isolation', ':host', 'shadowDOM'],
                },
                {
                    label: 'Template',
                    fragment: 'template',
                    keywords: ['custom template', 'templating engine'],
                },
            ],
        },
        {
            label: 'Templating',
            filename: '/docs/templating.html',
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
            label: 'Template Reference',
            filename: '/docs/templating-reference.html',
            sections: [
                {
                    label: 'Built-in Template Tags',
                    fragment: 'builtintemplatetags',
                    keywords: [ 'if', 'elseif', 'elif', 'else', 'endif', 'for',
                    'empty', 'endfor', 'operators', 'in', 'not in', 'is',
                    'is not', 'lt', 'gt', 'comparison', 'control-flow', ],
                },
                {
                    label: 'Built-in Filters',
                    fragment: 'builtinfilters',
                    keywords: [ 'add', 'allow', 'capfirst', 'concat',
                    'default', 'divisibleby', 'escapejs', 'first', 'join',
                    'json', 'last', 'length', 'lower', 'number', 'pluralize',
                    'subtract', 'truncate', 'renderas', 'reversed', 'upper', ],
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

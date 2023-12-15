const { modulo, window } = require('mdu.js');
const { Template } = modulo.registry.cparts;
let myTemplate = new Template('Hello {{ example-var }} world!');
let results = myTemplate.render({ exampleVar: 'node.js' });
console.log('The results:', results);

const { escapeText } = Modulo.templating.MTL.prototype;
const { safe } = Modulo.templating.defaultOptions.filters;
function syntaxHighlight(text) {
    text = escapeText(text);
    //text = text.replace(/&quot;.*?&quot;/g, '<span class="syn-string">$&</span>');
    //text = text.replace(/&gt;.*?&lt;/g, '<span class="syn-tag">$&</span>');
    text = text.replace(/\*.*?\*/g, '<span class="syn-bold">$&</span>');
    text = text.replace(/_.*?_/g, '<span class="syn-italic">$&</span>');
    text = text.replace(/^#+.*?$/gm, '<span class="syn-header">$&</span>');
    text = text.replace(/^\s*[+*-] /gm, '<span class="syn-ul">$&</span>');
    text = text.replace(/^\s*\d+[\.:]? /gm, '<span class="syn-ol">$&</span>');
    text = text.replace(/^---+$/gm, '<span class="syn-hr">$&</span>');
    text = text.replace(/`.*?`/g, '<span class="syn-code">$&</span>');
    text = text.replace(/\!?\[.*?\]\(.*?\)/g, '<span class="syn-link">$&</span>');

    if (props.number && props.number !== 'false') {
        const newlineSplit = text.split(/[\r\n]+/g);
        let i = 1;
        let results = '';
        for (const line of newlineSplit) {
            results += `<span class="x-num">${ i }</span>` + line + "\n";
            i++;
        }
    }

    return text;
}

function updateCallback(renderObj) {
    element.innerHTML = syntaxHighlight(props.value || element.originalHTML);
}


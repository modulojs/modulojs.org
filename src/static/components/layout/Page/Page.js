
function prepareCallback() {
    let path = window.location.pathname;
    if (path.endsWith('/')) {
        path = path + 'index.html';
    }
    let githubLinks = null;
    if (path.includes('/docs/') || path.includes('/tutorial/')) {
        githubLinks = {};
        githubLinks.edit = 'https://github.com/modulojs/modulojs.org/edit/main/src' + path;
        githubLinks.blame = 'https://github.com/modulojs/modulojs.org/blame/main/src' + path;
    }
    return {
        currentYear: (new Date()).getFullYear(),
        currentPath: path,
        githubLinks,
    };
}


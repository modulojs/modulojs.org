// Add custom, one-off JavaScript here for Page files

function prepareCallback() {
    // Get the current year on every render of the page
    return {
        currentYear: (new Date()).getFullYear(),
        version: '0.0.53',
    };
}


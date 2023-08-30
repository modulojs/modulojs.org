let animTimeout = null;
let wasTop = null;
const delay = 170; // matches top & left of HomeSplash.css - 0.170
function checkForScrollAnimation() {
    // Needs refactor
    const title = element.querySelector('h1 > span'); // get h1 title
    const titleRect = title.getBoundingClientRect();
    const navLogo = window.document.querySelector(props.image);
    const logoRect = navLogo.getBoundingClientRect();
    const flyingLetters = element.querySelector('.flying-letters');
    if (wasTop !== null) {
        flyingLetters.style.visibility = 'visible';
    }
    if (titleRect.top < 0) {
        if (wasTop === false) {
            flyingLetters.style.visibility = 'hidden';
            return;
        }
        wasTop = false;
        title.style.opacity = '0.0';
        flyingLetters.classList.add('as-logo');
        flyingLetters.classList.remove('as-title');
        flyingLetters.style.left = logoRect.left + 'px';
        flyingLetters.style.top = logoRect.top + 'px';
    } else {
        if (wasTop === true) {
            flyingLetters.style.visibility = 'hidden';
            return;
        }
        wasTop = true;
        navLogo.style.opacity = '0.0';
        flyingLetters.classList.add('as-title');
        flyingLetters.classList.remove('as-logo');
        flyingLetters.style.left = titleRect.left + 'px';
        flyingLetters.style.top = titleRect.top + 'px';
    }
    if (animTimeout) {
        clearTimeout(animTimeout);
    }
    animTimeout = setTimeout(() => {
        flyingLetters.style.visibility = 'hidden';
        if (titleRect.top < 0) {
            navLogo.style.opacity = '1.0';
            title.style.opacity = '0.0';
        } else {
            title.style.opacity = '1.0';
            navLogo.style.opacity = '0.0';
        }
    }, delay);
}

let debounce = 20; // slight debounce
let timeout = null;
function initializedCallback() {
    window.document.addEventListener('scroll', () => {
        if (timeout) {
            window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(checkForScrollAnimation, debounce);
    });
    return {
        title: 'modulO',
    }
}

function updateCallback() {
    if (!element.isMounted) {
        checkForScrollAnimation(true); // first mount!
    }
}

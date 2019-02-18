// ==UserScript==
// @name         Ryf ES6 Helper & Styler
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  RT.
// @author       Maniacata
// @match        https://es6.ruanyifeng.com/
// @grant        none
// ==/UserScript==

(function() {
    //document.body.style.filter = "invert(1)";
    //document.body.style.background = "#333";

    document.getElementById('content').style.width = '60vw';

    const hSidebar = document.getElementById('sidebar');
    hSidebar.style.opacity = '.1';
    hSidebar.style.transition = 'all .5s ease-in-out';

    hSidebar.addEventListener('mouseover', () => {
        hSidebar.style.opacity = '1';
    });
    hSidebar.addEventListener('mouseout', () => {
        hSidebar.style.opacity = '.1';
    });

    document.body.addEventListener('keydown', event => {
        var hash = getHash().nav;
        for (var i = 0; i < menu.length; i++) {
            if (hash === '') break;
            if (menu[i] === '#' + hash) break;
        }

        if (event.key === 'ArrowLeft') {
            location.hash = menu[i - 1];
        }
        if (event.key === 'ArrowRight') {
            location.hash = menu[i + 1];
        }
    });
})();

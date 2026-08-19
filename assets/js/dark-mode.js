/* dark-mode.js
 * Adds a dark mode toggle and persists preference in localStorage.
 */
(function () {
    var root = document.documentElement;
    var pref = (window.__ANTHEM_THEME_PREFERENCE || 'auto').toString();

    function setDark(enabled) {
        if (enabled) root.classList.add('theme-dark');
        else root.classList.remove('theme-dark');
    }

    function applyFromSystem() {
        var isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDark(isDark);
    }

    if (pref === 'light') {
        setDark(false);
    } else if (pref === 'dark') {
        setDark(true);
    } else {
        // auto: follow system and update on changes
        applyFromSystem();
        if (window.matchMedia) {
            var mq = window.matchMedia('(prefers-color-scheme: dark)');
            if (typeof mq.addEventListener === 'function') {
                mq.addEventListener('change', applyFromSystem);
            } else if (typeof mq.addListener === 'function') {
                mq.addListener(applyFromSystem);
            }
        }
    }
})();

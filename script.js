document.addEventListener('DOMContentLoaded', () => {

    // 1. Animación al hacer Scroll (IntersectionObserver)
    const observerOptions = {
        root: null, // El viewport
        rootMargin: '0px',
        threshold: 0.2 // Se dispara cuando el 20% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // 2. Lógica para el menú de navegación móvil
    const navToggle = document.querySelector('.nav-toggle');
    navToggle.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
    });

    // 3. Smooth scrolling para la navegación y cierre del menú móvil
    document.querySelectorAll('.nav-links a, .cta-button').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Solo para enlaces internos (que empiezan por #)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                document.body.classList.remove('nav-open');
            }
        });
    });

    // 4. Animación secuencial de los elementos del Hero
    const heroElements = document.querySelectorAll('.animate-hero-text');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${0.3 + index * 0.2}s`;
    });
});
// <![CDATA[  <-- For SVG support
if ('WebSocket' in window) {
    (function () {
        function refreshCSS() {
            var sheets = [].slice.call(document.getElementsByTagName("link"));
            var head = document.getElementsByTagName("head")[0];
            for (var i = 0; i < sheets.length; ++i) {
                var elem = sheets[i];
                var parent = elem.parentElement || head;
                parent.removeChild(elem);
                var rel = elem.rel;
                if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
                    var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
                    elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
                }
                parent.appendChild(elem);
            }
        }
        var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
        var address = protocol + window.location.host + window.location.pathname + '/ws';
        var socket = new WebSocket(address);
        socket.onmessage = function (msg) {
            if (msg.data == 'reload') window.location.reload();
            else if (msg.data == 'refreshcss') refreshCSS();
        };
        if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
            console.log('Live reload enabled.');
            sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
        }
    })();
}
else {
    console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
}
// ]]>
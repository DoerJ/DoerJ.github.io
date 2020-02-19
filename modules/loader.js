var fadeInElementsOnLoad = document.getElementsByClassName('fadein-on-load');
var slideInElementsOnLoad = document.getElementsByClassName('slidein-on-load');

window.addEventListener('load', function(e) {
    for(let i = 0; i < fadeInElementsOnLoad.length; i++) {
        fadeInElementsOnLoad[i].className += ' fadein-on-load-active';
    }
    for(let i = 0; i < slideInElementsOnLoad.length; i++) {
        slideInElementsOnLoad[i].className += ' slidein-on-load-active';
    }
})

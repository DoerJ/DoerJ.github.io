var fadeInElementsOnScroll = document.getElementsByClassName('fadein-on-scroll');
var slideInElementsOnScroll = document.getElementsByClassName('slidein-on-scroll');
var fadeInElementPos = 0, slideInElementPos = 0;
console.log(slideInElementsOnScroll);

document.addEventListener('scroll', function() {
    if(slideInElementPos < slideInElementsOnScroll.length && isInCenterViewport(slideInElementsOnScroll[slideInElementPos])) {
        slideInElementsOnScroll[slideInElementPos].className += ' slidein-on-scroll-active';
        console.log('slide in');
        slideInElementPos++;
    }
})
function isInCenterViewport(element) {
    var rectBoundings = element.getBoundingClientRect();
    return rectBoundings.top <= 0.5*window.innerHeight;
}

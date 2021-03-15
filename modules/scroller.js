// compute whether the target element is at the center of the viewport
var isAtCenterViewport = (elem) => {
  var rectBoundings = elem.getBoundingClientRect();
  return rectBoundings.top <= 0.5 * window.innerHeight;
}

export class Scroller {  
  constructor() {
    var self = this;
    self.slideinElems = document.getElementsByClassName('slidein-on-scroll');
    self.fadeinElems = document.getElementsByClassName('fadein-on-scroll');
    
    // the index that keeps track of which element is to be slide-in on scroll
    self.slideinIndex = 0;
    self.fadeinIndex = 0;
    self.init();
  }

  // listen to scroll event, and compute whether the element is in the position for slide-in
  init() {
    var self = this;
    document.addEventListener('scroll', () => {
      var slidein_target = self.slideinElems[self.slideinIndex];
      var fadein_target = self.fadeinElems[self.fadeinIndex];

      if (self.slideinIndex < self.slideinElems.length && isAtCenterViewport(slidein_target)) {
        slidein_target.classList.add('slidein-on-scroll-active');
        self.slideinIndex++;
      }
      if (self.fadeinIndex < self.fadeinElems.length && isAtCenterViewport(fadein_target)) {
        fadein_target.classList.add('fadein-on-scroll-active');
        self.fadeinIndex++;
      }
    });
  }
}
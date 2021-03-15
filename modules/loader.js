
export class Loader {
  constructor() {
    var self = this;
    self.fadeinElems = document.getElementsByClassName('fadein-on-load');
    self.slideinElems = document.getElementsByClassName('slidein-on-load');

    self.init();
  }

  // activate all elements upon loading
  init() {
    var self = this;
    for (let elem of self.fadeinElems) {
      elem.classList.add('fadein-on-load-active');
    }
    for (let elem of self.slideinElems) {
      elem.classList.add('slidein-on-load-active');
    }
  }
}
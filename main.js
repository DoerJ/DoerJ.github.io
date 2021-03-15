import { Loader } from './modules/loader.js';
import { Scroller } from './modules/scroller.js';
import { ContentLoader } from './modules/content-loader.js';

var loader, scroller, content;

(function init() {
  loader = new Loader();
  scroller = new Scroller();
  // load content 
  content = new ContentLoader();
})();
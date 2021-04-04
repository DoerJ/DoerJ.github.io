import { Loader } from './modules/loader.js';
import { Scroller } from './modules/scroller.js';
import { ContentLoader } from './modules/content-loader.js';
import { CursorAnimator } from './modules/cursor-animator.js';

var loader, scroller, content, cursor;

(function init() {
  loader = new Loader();
  scroller = new Scroller();
  // load content 
  content = new ContentLoader();
  // initialize cursor effect 
  cursor = new CursorAnimator(content);
})();
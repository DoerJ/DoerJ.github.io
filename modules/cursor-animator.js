var cursor_x, cursor_y;
var cursor_client_x, cursor_client_y; 

var calculateShapeWidth = (elem) => {
  var border = window.getComputedStyle(elem, null).getPropertyValue('border-width');
  border = parseInt(border) / 2;
  var width = window.getComputedStyle(elem, null).getPropertyValue('width');
  width = parseInt(width) / 2;
  
  return border + width;
}

// get the vertical position of element relative to the document 
var getElementPageYOffset = (elem) => {
  var bounding_rect = elem.getBoundingClientRect();
  return bounding_rect.top + document.body.scrollTop;
}

// cursor elements
var dot = document.getElementById('cursor-dot');
var dot_width = calculateShapeWidth(dot);
var circle = document.getElementById('cursor-circle');
var circle_width = calculateShapeWidth(circle);
var square = document.getElementById('cursor-square');
var square_width = calculateShapeWidth(square);

// areas for cursor changing the style 
var blog_area, project_area, design_area;
// page y-offset of each area
var blog_offset, project_offset, design_offset;
var cursor_styles = {
  headerarea: {
    dot: '#d91d0c',
    circle: '#f2ae2f',
    square: '#f2d231'
  },
  blogarea: {
    dot: '#364188',
    circle: '#f9603e',
    square: '#fcad42'
  },
  projectarea: {
    dot: '#0c496c',
    circle: '#3c8686',
    square: '#a8dba8'
  },
  designarea: {
    dot: '#8b4c63',
    circle: '#bb706c',
    square: '#f7e29c'
  }
};

// cursor animation frame
var animateCursor = () => {
  dot.style.left = (cursor_x - dot_width) + 'px';
  dot.style.top = (cursor_y - dot_width) + 'px';

  circle.style.left = (cursor_x - circle_width - 25) + 'px';
  circle.style.top = (cursor_y - circle_width - 20) + 'px';

  square.style.left = (cursor_x - square_width - 20) + 'px';
  square.style.top = (cursor_y - square_width - 10) + 'px';

  window.requestAnimationFrame(animateCursor);
}

export class CursorAnimator {
  constructor(content) {
    var self = this;

    self.content = content;
    window.addEventListener('mousemove', (e) => {
      cursor_x = e.pageX;
      cursor_y = e.pageY;
      cursor_client_x = e.clientX;
      cursor_client_y = e.clientY;

      self.checkCursorStyle(cursor_y);
    })

    window.addEventListener('scroll', (e) => {
      cursor_x = window.scrollX + cursor_client_x;
      cursor_y = window.scrollY + cursor_client_y;

      self.checkCursorStyle(cursor_y);
    })

    self.content.doneLoading.then(() => {
      blog_area = document.getElementById('blog-container');
      project_area = document.getElementById('project-container');
      design_area = document.getElementById('design-container');

      // calculate the page offset 
      blog_offset = getElementPageYOffset(blog_area);
      project_offset = getElementPageYOffset(project_area);
      design_offset = getElementPageYOffset(design_area);
    })

    window.requestAnimationFrame(animateCursor);
  }

  // check which area is cursor at
  checkCursorStyle(y_offset) {
    var self = this;
    if (y_offset < blog_offset) {
      self.setCursorStyle(cursor_styles.headerarea);
    }
    else if (y_offset >= blog_offset && y_offset < project_offset) {
      self.setCursorStyle(cursor_styles.blogarea);
    }
    else if (y_offset >= project_offset && y_offset < design_offset) {
      self.setCursorStyle(cursor_styles.projectarea);
    }
    else {
      self.setCursorStyle(cursor_styles.designarea);
    }
  }

  setCursorStyle(style) {
    dot.style.backgroundColor = style.dot;
    dot.style.borderColor = style.dot;
    circle.style.backgroundColor = style.circle;
    circle.style.borderColor = style.circle;
    square.style.backgroundColor = style.square;
    square.style.borderColor = style.square;
  }
}
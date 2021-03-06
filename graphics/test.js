global.GLOAL_WINDOW_OPTS = { title: '',
     width: 1280,
     height: 720,
     x: 805240832,
     y: 805240832,
     closable: true,
     fullscreen: false,
     show: true,
     resizable: false,
     borderless: true,
     minimized: false,
     allowHighDPI: false,
     grabInputFocus: false,
     fitCanvasInWindow: true,
     scaleCanvasToWindowSize: true }


// Load the library
require('native-canvas');

const Line = require('./line.gfx.js');
const Rect = require('./rect.gfx.js');
const Button = require('./button.gfx.js');

// Title the title attribute
document.title = 'Test for Drawables';

// Provides the current running canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext("2d");

let lineOpts = {
  styles: {
    default: {
      strokeStyle: '#000000',
      weight: 5
    }
  },
  geometry: {
    x: 0, y: 0, x1: 50, y1: 50
  }
}

let line = new Line(ctx, lineOpts);
let line2 = new Line(ctx, lineOpts);
line2.geometry = {
  x: 0, y: 50, x1: 50, y1: 0
}

let button = new Button(ctx, () => {
  process.exit(0)
}, {
  styles: {
    default: {
      strokeStyle: '#000',
      fillStyle: '#F00',
      weight: 5
    }
  },
  geometry: {
    x: 0, y: 0, width: 50, height: 50
  },
  root: {
    x: 50, y: 50
  },
  text: "Test!",
  children: [line, line2]
});

button.setStyle('default');
button.draw();

canvas.addEventListener('click', (evt) => {
  let clickPoint = {
    x: evt.clientX, y: evt.clientY
  }
  button.test(clickPoint);
});

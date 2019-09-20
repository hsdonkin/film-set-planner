const Arri_M8_URL = require('./../assets/Arri M8.png');

export default function diagramControl() {
  // BIG difference here between CSS styles height / width of canvas, and canvas object height and width
  // using CSS will stretch the canvas and mess with the coordinate system
  // coordinates work like this:
  //    0x
  // 0y |------|
  //    |------|
  //    |------|
  //  ctx.fillRect(x start, y start, width, height);

  const canvas = document.getElementById('diagram');
  const DOMURL = window.URL || window.webkitURL || window;

  canvas.setAttribute('height', 150);
  canvas.setAttribute('width', 150);
  const ctx = canvas.getContext('2d');
  const Arri_M8_IMG = new Image();
  Arri_M8_IMG.src = Arri_M8_URL;
  Arri_M8_IMG.onload = function() {
    ctx.drawImage(Arri_M8_IMG, 0, 0);
  };
}

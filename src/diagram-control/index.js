const ArriM8Url = require('./../assets/Arri M8.png');
import Konva from 'konva';

// export default function populateDiagram(objects, onSelectedChange) {
//   // takes in Diagram state as argument
//   const width = window.innerWidth;
//   const height = window.innerHeight;
//   const stage = new Konva.Stage({
//     container: 'stage',
//     width: width,
//     height: height
//   });

//   objects.forEach(object => {
//     let layer = new Konva.Layer();
//     stage.add(layer);

//     let imageObj = new Image();
//     let image = new Konva.Image({
//       x: object.x,
//       y: object.y,
//       image: imageObj,
//       draggable: true
//     });
//     imageObj.src = ArriM8Url;

//     image.on('click', () => {
//       console.log(object.name);
//       onSelectedChange(object);
//     });

//     layer.add(image);

//     if (object.selected === true) {
//       let tr1 = new Konva.Transformer({
//         node: image,
//         centeredScaling: true,
//         rotationSnaps: [0, 90, 180, 270],
//         resizeEnabled: false
//       });
//       layer.add(tr1);
//     }

//     layer.draw();
//   }); // close forEach
// }

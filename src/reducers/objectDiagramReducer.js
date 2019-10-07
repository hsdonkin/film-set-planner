import { v4 } from "uuid";

const initialState = {
  selection: true,
  downloading: false,
  stage: {
    x: 299,
    y: 276,
    offsetX: -2800,
    offsetY: -1800,
    scale: 0.09696154785156251,
    showGrid: true
  },
  objects: JSON.parse(
    `{"a715a6da-65b6-468c-a3cf-7c1b32856c7c":{"name":"Chapman Dolly","imgName":"ChapmanDolly","selected":false,"locked":false,"x":-716.504793728016,"y":841.2774278439754,"rotation":0,"zIndex":0},"f8689606-f939-44f6-b395-058c4f9b6466":{"name":"Arri Amira","imgName":"ArriAmira","selected":false,"locked":false,"x":-595.7426030284597,"y":902.995286448138,"rotation":360,"zIndex":0},"0581972e-64f2-472b-9c1f-139d379fb34b":{"name":"Arri L10","imgName":"ArriLOne0","selected":false,"locked":false,"x":-2898.8894153705714,"y":1103.7117096131815,"rotation":225,"zIndex":0},"36e7101d-4efb-4297-94a4-2c73b1c1405f":{"name":"12x12 Grid Cloth Angled","imgName":"TwelveByTwelveGridClothAngled","selected":false,"locked":false,"x":-1682.6798969948168,"y":1187.8858336955477,"rotation":225,"zIndex":0},"fc4483c7-0b82-45f1-a09c-ef9d245e1316":{"name":"20x40 Open Room","imgName":"TwentyByFortyOpenRoom","selected":false,"locked":true,"x":-3867.2864766156217,"y":-3676.676936167976,"rotation":0,"zIndex":0},"b31fd592-3ad7-4393-a035-72f624043fbd":{"name":"Small Softbox","imgName":"SmallSoftbox","selected":false,"locked":false,"x":-707.3258658992504,"y":-2299.2061527324668,"rotation":0,"zIndex":0},"f989fe52-22e9-40d8-9050-dbfd8c4798e2":{"name":"Neg Showcard","imgName":"NegShowcard","selected":false,"locked":false,"x":603.4913643221907,"y":-423.2251484513466,"rotation":383.96040913532096,"zIndex":0},"a5a4de6d-4333-4d01-a4c8-1511ef9f6977":{"name":"Production Monitor","imgName":"ProductionMonitor","selected":false,"locked":false,"x":886.4571100694311,"y":411.0339333056482,"rotation":0,"zIndex":0},"e7f787fc-2bee-489e-92bc-c69afec76173":{"name":"Production Monitor","imgName":"ProductionMonitor","selected":false,"locked":false,"x":1315.2413624874007,"y":411.0339333056482,"rotation":0,"zIndex":0},"2a285d52-8ece-480f-88de-17baf653de15":{"name":"Spacelight","imgName":"Spacelight","selected":false,"locked":false,"x":-2980.6914306058475,"y":-3302.399498012245,"rotation":0,"zIndex":0},"ab1656f8-69a0-4784-9a06-d9c09cb81a5d":{"name":"Spacelight","imgName":"Spacelight","selected":false,"locked":false,"x":-707.4856983243812,"y":-3310.010269650399,"rotation":0,"zIndex":0},"cdf0b600-e7d1-4ecd-a8e2-3aa93cbbf10a":{"name":"Spacelight","imgName":"Spacelight","selected":false,"locked":false,"x":-1937.046740758335,"y":-3318.580035839338,"rotation":0,"zIndex":0},"b5d5d945-5142-4ae6-96a6-5d6837642ba8":{"name":"Spacelight","imgName":"Spacelight","selected":false,"locked":false,"x":441.49231982436595,"y":-3334.760573666432,"rotation":0,"zIndex":0},"2d8aafb4-7ba0-4298-92e9-e5ea4516ee30":{"name":"Spacelight","imgName":"Spacelight","selected":false,"locked":false,"x":1606.4910433750792,"y":-3334.7605736664323,"rotation":0,"zIndex":0},"8988ce03-5e50-4783-8ebb-626a2eb3806e":{"name":"Tungsten 15 Degrees","imgName":"TungstenOneFiveDegrees","selected":false,"locked":false,"x":2160.742517555841,"y":-2151.914949123193,"rotation":140.85838405997268,"zIndex":0},"db0927b4-7f02-4433-925a-63b778591ef5":{"name":"Tungsten 15 Degrees","imgName":"TungstenOneFiveDegrees","selected":false,"locked":false,"x":-2714.836033494558,"y":-2560.911003851039,"rotation":53.350074586022274,"zIndex":0},"3fe85889-3c75-47df-9aad-6206eef7ec2d":{"name":"Ellipsoidal","imgName":"Ellipsoidal","selected":false,"locked":false,"x":1917.8471910984822,"y":-2422.2656278011723,"rotation":315,"zIndex":0},"63fb4e22-12b7-4607-a70c-cbd94d4d1fd1":{"name":"Ellipsoidal","imgName":"Ellipsoidal","selected":false,"locked":false,"x":-3016.202250242287,"y":-2343.3817626287696,"rotation":225,"zIndex":0},"e3e32d2d-c831-460d-8161-e5761b60a4e0":{"name":"Edge Label","imgName":"EdgeLabel","selected":false,"locked":false,"x":2253.622287545262,"y":-2375.0185729543855,"rotation":0,"zIndex":0},"a7962a97-da0c-41e7-9d99-1bc4ab03abae":{"name":"Edge Label","imgName":"EdgeLabel","selected":false,"locked":false,"x":-3555.190792381203,"y":-2342.657497300199,"rotation":0,"zIndex":0},"8f1f9a51-85f2-492d-b211-bf6b4d0fdf15":{"name":"Key Label","imgName":"KeyLabel","selected":false,"locked":false,"x":-2721.8930942859024,"y":1136.1581355248431,"rotation":0,"zIndex":0},"ea3f7d61-81a3-4c24-b3fa-6a92516a0808":{"name":"Kicker Label","imgName":"KickerLabel","selected":false,"locked":false,"x":-35.923814988427694,"y":-2245.57427033764,"rotation":0,"zIndex":0},"1f57b6b8-073e-4e6c-a124-c7ac4d61f543":{"name":"Standing Person","imgName":"StandingPerson","selected":false,"locked":false,"x":-610.3329078502375,"y":-805.5064037263433,"rotation":0,"zIndex":0},"537ae792-f337-41aa-9b6f-76d9c380ae6d":{"name":"DIT Cart","imgName":"DITCart","selected":false,"locked":false,"x":-3943.523700231441,"y":1484.0396988073467,"rotation":0,"zIndex":0},"72fcff93-6bac-4cf3-90ce-e32db8f816f1":{"name":"Distro","imgName":"Distro","selected":false,"locked":false,"x":-3730.759098383102,"y":-301.999999999999,"rotation":0,"zIndex":0},"5adb20b4-0c8e-4476-af7f-87dacc048b5f":{"name":"Distro","imgName":"Distro","selected":false,"locked":false,"x":2451.8066081881716,"y":-324.31973179267595,"rotation":0,"zIndex":0},"0ebe3a92-15be-4265-8333-9cd2d084ef9a":{"name":"6x6 Flag Free Hanging","imgName":"SixBySixFlagFreeHanging","selected":false,"locked":false,"x":-3206.285367198497,"y":-854.7567896914019,"rotation":0,"zIndex":0},"6de63ab9-e473-4c36-9d58-aefe5de786a2":{"name":"4x4 Solid Angled","imgName":"FourByFourSolidAngled","selected":false,"locked":false,"x":-2554.527361442964,"y":-1424.0137820601599,"rotation":0,"zIndex":0},"9d90aca6-bb53-4635-a3d9-d2eea2dc5d32":{"name":"4x4 Solid Angled","imgName":"FourByFourSolidAngled","selected":false,"locked":false,"x":819.7640860761912,"y":-1440.513984737514,"rotation":0,"zIndex":0}}`
  )
};

// State Template
//
// [v4()]: {
//   name: "Arri M8",
//   selected: false,
//   locked: false,
//   imgPath: "./../assets/Arri M8.png",
//   imgName: "ArriM8",
//   x: 0,
//   y: 0,
//   rotation: 0,
//   zIndex: 0
// },
// [v4()]: {
//   name: "Arri M8",
//   selected: true,
//   locked: false,
//   imgPath: "./../assets/Arri M8.png",
//   imgName: "ArriM8",
//   x: 500,
//   y: 500,
//   rotation: 50,
//   zIndex: 0
// }

let objectOffset = 0;
let offsetTimer;
const objectDiagramReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "ADD_TO_DIAGRAM":
      // using JSON parse here to avoid mutating state
      newState = JSON.parse(JSON.stringify(state));

      newState.objects[v4()] = {
        name: action.object.name,
        imgPath: action.object.imgPath,
        imgName: action.object.imgName,
        selected: false,
        locked: false,
        x: -1 * state.stage.x + objectOffset,
        y: -1 * state.stage.y + objectOffset,
        rotation: 0,
        zIndex: 0
      };
      clearInterval(offsetTimer);
      objectOffset += 50;
      offsetTimer = setTimeout(function() {
        objectOffset = 0;
      }, 1000);
      return newState;
    case "REMOVE_FROM_DIAGRAM":
      // using JSON parse here to avoid mutating state
      newState = JSON.parse(JSON.stringify(state));
      delete newState.objects[action.objectID];
      return newState;
    case "REMOVE_ALL_FROM_DIAGRAM":
      newState = JSON.parse(JSON.stringify(state));
      newState.objects = {};
      return newState;
    case "TOGGLE_OBJECT_SELECTED":
      // using JSON parse here to avoid mutating state
      newState = JSON.parse(JSON.stringify(state));
      // make the true / false value of selected the opposite of previous value
      newState.objects[action.objectID].selected = !newState.objects[
        action.objectID
      ].selected;
      if (newState.objects[action.objectID].selected === true) {
        newState.selection = true;
      } else {
        newState.selection = false;
      }
      return newState;
    case "TOGGLE_OBJECT_LOCKED":
      newState = JSON.parse(JSON.stringify(state));
      // make the true / false value of selected the opposite of previous value
      newState.objects[action.objectID].locked = !newState.objects[
        action.objectID
      ].locked;
      return newState;
    case "DESELECT_ALL_OBJECTS":
      newState = JSON.parse(JSON.stringify(state));
      const keys = Object.keys(newState.objects);

      keys.forEach(key => {
        newState.objects[key].selected = false;
      });
      newState.selection = false;
      return newState;

    case "UPDATE_XY_POSITION":
      // using JSON parse here to avoid mutating state
      newState = JSON.parse(JSON.stringify(state));
      newState.objects[action.objectID].x = action.x;
      newState.objects[action.objectID].y = action.y;
      newState.objects[action.objectID].rotation = action.rotation;
      return newState;

    case "UPDATE_STAGE_XY_POSITION":
      newState = JSON.parse(JSON.stringify(state));
      clearInterval(offsetTimer);
      newState.stage.x = action.x;
      newState.stage.y = action.y;
      return newState;

    case "RESET_STAGE_XY_POSITION":
      newState = JSON.parse(JSON.stringify(state));
      clearInterval(offsetTimer);
      newState.stage = {
        x: 299,
        y: 276,
        offsetX: -2800,
        offsetY: -1800,
        scale: 0.09696154785156251,
        showGrid: state.stage.showGrid
      };
      return newState;
    case "UPDATE_STAGE_SCALE":
      // using JSON parse here to avoid mutating state
      newState = JSON.parse(JSON.stringify(state));
      clearInterval(offsetTimer);
      newState.stage.scale = action.scale;
      return newState;

    case "UPDATE_ROTATION":
      // using JSON parse here to avoid mutating state
      newState = JSON.parse(JSON.stringify(state));
      newState.objects[action.objectID].rotation = action.rotation;
      return newState;
    case "TOGGLE_GRID":
      newState = JSON.parse(JSON.stringify(state));
      newState.stage.showGrid = !newState.stage.showGrid;
      return newState;
    case "START_DOWNLOAD":
      newState = JSON.parse(JSON.stringify(state));
      newState.downloading = true;
      return newState;
    case "FINISH_DOWNLOAD":
      newState = JSON.parse(JSON.stringify(state));
      newState.downloading = false;
      return newState;
    case "LOAD_DIAGRAM":
      newState = JSON.parse(JSON.stringify(state));

      newState.objects = action.diagram.objects;
      return newState;

    default:
      return state;
  }
};

export default objectDiagramReducer;

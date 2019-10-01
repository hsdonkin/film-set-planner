const fs = require("fs");
const files = fs.readdirSync("./");
files.map(file => {
  let url = file;
  let objectName = file;
  file = file
    .split(" ")
    .join("")
    .replace(".png", "")
    .replace("-", "")
    .replace("+", "")
    .replace("10x10", "TenByTen")
    .replace("12x12", "TwelveByTwelve")
    .replace("12x20", "TwelveByTwenty")
    .replace("18x24", "EighteenByTwentyFour")
    .replace("1x1", "OneByOne")
    .replace("10_x10_", "TenByTen")
    .replace("20_x20_", "TwentyByTwenty")
    .replace("20_x20_", "TwentyByTwenty")
    .replace("20_x40_", "TwentyByForty")
    .replace("20x20", "TwentyByTwenty")
    .replace("2x3", "TwoByThree")
    .replace("4x1", "FourByOne")
    .replace("4x2", "FourByTwo")
    .replace("4x4", "FourByFour")
    .replace("4x8", "FourByEight")
    .replace("6x6", "SixBySix")
    .replace("8ft", "EightFoot")
    .replace("8x8", "EightByEight")
    .replace("8_", "EightFoot")
    .replace("10_", "TenFoot")
    .replace("20_", "TwentyFoot")
    .replace("2x2", "TwoByTwo")
    .replace(/1/g, "One")
    .replace(/2/g, "Two")
    .replace(/3/g, "Three")
    .replace(/4/g, "Four")
    .replace(/5/g, "Five")
    .replace(/6/g, "Six")
    .replace(/7/g, "Seven")
    .replace(/9/g, "Eight")
    .replace(/10/g, "Nine");

  objectName = objectName.replace(".png", "").replace("_", "");

  fs.appendFile(
    "objectsList.js",
    `
      ${file}: {
        name: '${objectName}',
        imgName: '${file}'
      }, \n`,
    function(err) {
      if (err) throw err;
    }
  );
});

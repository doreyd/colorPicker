//********************************************************************
// ****************  PURE JAVASCRIPT COLOR PICKER ********************
//********************************************************************
// ** This is a Color Picker developed entirely with javascript **
// To use it, all you need to do is adding the file to your HTML document
// then you would call the function named  generater(anchor, target)
// that takes two variables :
// - the anchor, that takes in the id value of the html element to which the
// color picker will be appended to
// - the target, that takes in the id value of the html element to which the
// picked color will be applied to.
// the generator function returns also the color picker html element that
// you can then change its position and control its display as you please.
// ********************************************************************
// this Color Picker consists of only three basic files:
// - javascript file named: colorPicker.js
// - the css file named: colorPicker.css
// - and a small image named: colorIcon.jpg.
// ********************************************************************
// *****************  Created by Doreyd Mehila 2019 *******************
// ********************************************************************

const generater = (rootAnchorId, targetId) => {
  // Selecting the rootAnchor & the target element
  const rootAnchor = document.getElementById(rootAnchorId);
  const target = document.getElementById(targetId);

  // DOM elements dynamic generator
  const createElem = (id, type, appendTo) => {
    let elem = document.createElement(type);
    elem.id = id;
    appendTo.append(elem);
    return elem;
  };

  // Dynamically generating the color picker main components using the above generator
  const $colorPicker = createElem("colorPicker", "div", rootAnchor);

  const $colorIcon = createElem("colorIcon", "img", $colorPicker);
  $colorIcon.src = "colorIcon.jpg";

  const $colorConsole = createElem("colorConsole", "div", $colorPicker);
  const $colorScreen = createElem("colorScreen", "div", $colorConsole);
  const $hueBar = createElem("hueBar", "div", $colorConsole);

  const $colorCursor = createElem("colorCursor", "div", $colorConsole);
  $colorCursor.onclick = () => setNewHue(event.pageX - 593);
  $colorCursor.style.left = "0px";

  const $screenCanvas = createElem("screenCanvas", "canvas", $colorScreen);
  $screenCanvas.width = "255";
  $screenCanvas.height = "255";

  const $barCanvas = createElem("screenCanvas", "canvas", $hueBar);
  $barCanvas.width = "255";
  $barCanvas.height = "20";

  const colorInput = (elem, Y) => {
    elem.className = "colorDetails";
    elem.spellcheck = false;
    elem.style.top = Y + "px";
  };

  colorTextRgb = createElem("colorTextRgb", "input", $colorPicker);
  colorTextHex = createElem("colorTextHex", "input", $colorPicker);
  colorInput(colorTextHex, 252);
  colorInput(colorTextRgb, 228);

  // ************ Get & Change Position & Size *********************
  const getPosition = element => [element.offsetTop, element.offsetLeft];
  const getSize = element => [element.offsetHeight, element.offsetWidth];

  function changePosition(element, elementTop, elementLeft) {
    if (elementTop !== "same") element.style.top = elementTop + "px";
    if (elementLeft !== "same") element.style.left = elementLeft + "px";
  }

  function changeSize(element, elementHeight, elementWidth) {
    if (elementHeight !== "same") element.style.height = elementHeight + "px";
    if (elementWidth !== "same") element.style.width = elementWidth + "px";
  }
  // *****************************************************************
  $colorIcon.onclick = () =>
    ($colorConsole.style.display =
      $colorConsole.style.display === "none" ? "block" : "none");

  // Convert hexadecimal values to decimal back and forth
  //******************************************************
  // Hexadecimal to Decimal
  const hexDec = hex => parseInt(hex, 16).toString(10);
  // Decimal to Hexadecimal
  const decToHex = rgb =>
    rgb.toString(16).length === 1 ? "0" + rgb.toString(16) : rgb.toString(16);

  // Convert RGB color values to HEX values back and forth
  //******************************************************
  // RGB to HEX
  const rgbHex = rgb => {
    return rgb
      .match(/([0-9]*)\s?,\s?([0-9]*)\s?,\s?([0-9]*)/)
      .filter((x, i) => i !== 0)
      .reduce((str, val, i) => (str += decToHex(parseInt(val))), "#");
  };
  // HEX to RGB
  const hexRgb = hex => {
    let h = hex.split("");
    if (h.length === 4) h.filter((x, i) => i !== 0).map(x => x + x);
    return `rgb(${hexDec(h[1] + h[2])}, ${hexDec(h[3] + h[4])}, ${hexDec(
      h[5] + h[6]
    )})`;
  };
  // *******************************************************
  // Apply new color & display the RGB & HEX values
  const displayHex = rgb => (colorTextHex.value = rgbHex(rgb));
  const displayRgb = rgb => (colorTextRgb.value = rgb);

  const applyColor = color => {
    target.style.background = color;
    displayRgb(color);
    displayHex(color);
  };

  colorTextRgb.onkeyup = () => applyColor(colorTextRgb.value);
  colorTextHex.onkeyup = () => applyColor(hexRgb(colorTextHex.value));

  // ********************************************************
  // Mouse effects when hovering over the color selections on the right side
  let marg = 2;

  function mouseOver(element) {
    let sqPos = getPosition(element);
    changePosition(element, sqPos[0] - marg, sqPos[1] - marg);
    changeSize(element, 18 + marg * 2, 18 + marg * 2);
  }

  function mouseOut(element) {
    let sqPos = getPosition(element);
    changePosition(element, sqPos[0] + marg, sqPos[1] + marg);
    changeSize(element, 18, 18);
    element.style.borderColor = "#cecec8";
  }

  // Colors & hues being used as a base to define the rest of colors
  const colorList = [
    "ffffff",
    "e9e8e8",
    "cfcdcd",
    "c2c2c2",
    "b2b1b1",
    "b0afaf",
    "959494",
    "616060",
    "3f3f3f",
    "000000",
    "f500f4",
    "9301f6",
    "0303f6",
    "4680df",
    "01f2f3",
    "00f800",
    "f5f602",
    "f69403",
    "f60404",
    "8e0202"
  ];

  let hslBase = [
    "329",
    "254",
    "208",
    "217",
    "190",
    "99",
    "45",
    "30",
    "0",
    "10"
  ];

  // Mouse events basic definition
  const mouseEvents = elem => {
    elem.onclick = () => applyColor(elem.style.background);
    elem.onmouseover = () => mouseOver(elem);
    elem.onmouseout = () => mouseOut(elem);
  };

  // this fucntion creates the basic two lines of colors in the top left
  const basicColors = () => {
    for (let j = 0; j < colorList.length / 10; j++) {
      for (let i = 0; i < 10; i++) {
        let newColor = document.createElement("div");
        newColor.className = "colorSquare";
        newColor.style.background = "#" + colorList[j * 10 + i];
        changePosition(newColor, 10 + 25 * j, 10 + 22 * i);
        mouseEvents(newColor);
        $colorPicker.appendChild(newColor);
      }
    }
  };

  // this fucntion creates the seven lines of color shades under the basic top ones (left side)
  const colorShades = () => {
    for (let j = 0; j < 7; j++) {
      for (let i = 0; i < 10; i++) {
        let newColor = document.createElement("div");
        newColor.className = "colorSquare";
        let saturation = 100 - (20 + j * 10);
        newColor.style.background = `hsl(${hslBase[i]},100%, ${saturation}%)`;
        changePosition(newColor, 10 + 22 * (2.5 + j), 10 + 22 * i);
        mouseEvents(newColor);
        $colorPicker.appendChild(newColor);
      }
    }
  };

  // applying the selected hue to the color screen
  const setNewHue = () => {
    let [csPos, ccPos, cdPos] = relativePos();
    let X = event.pageX - (cdPos[1] + ccPos[1] + csPos[1] + 5);
    generateScreen((X * 360) / 255);
    updateCursor(X);
  };

  const relativePos = () => {
    let csPos = getPosition($colorPicker);
    let ccPos = getPosition($colorConsole);
    let cdPos = getPosition($colorScreen);
    return [csPos, ccPos, cdPos];
  };

  const updateCursor = newX => {
    $colorCursor.style.background = `hsl(${(newX * 360) / 255},90%,50%)`;
    changePosition($colorCursor, "same", newX);
  };

  // detecting & applying the color picked by clicking on the color screen
  $screenCanvas.onclick = () => {
    let [csPos, ccPos, cdPos] = relativePos();
    let Y = event.pageY - (csPos[0] + ccPos[0] + cdPos[0]);
    let X = event.pageX - (csPos[1] + ccPos[1] + cdPos[1]);

    var ctx2 = $screenCanvas.getContext("2d");
    var p = ctx2.getImageData(X, Y, 1, 1).data;

    let color = `rgb(${p[0]}, ${p[1]}, ${p[2]})`;
    applyColor(color);
  };

  // hue bar generator
  function generateBar() {
    let ctx = $barCanvas.getContext("2d");
    for (i = 0; i < 255; i++) {
      ctx.fillStyle = `hsl(${(i * 360) / 255},100%,50%)`;
      ctx.fillRect(i, 0, i + 1, 10);
    }
  }

  // color screen generator
  function generateScreen(value) {
    var ctx = $screenCanvas.getContext("2d");
    for (i = 0; i < 100; i++) {
      for (j = 0; j < 100; j++) {
        ctx.fillStyle = `hsl(${value},${i}%,${(100 - j) / 2}%)`;
        ctx.fillRect(2 * i, 2.5 * j, 2 * i + 2, 2.5 * (j + 1));
      }
    }
  }

  // generate the left side (top to bottom)
  basicColors(); // the 2 top lines of basic colors
  colorShades(); // the 7 lines of shades
  displayRgb("rgb(255,255,255)"); // text display the color in RGB
  displayHex("rgb(255,255,255)"); // text display the color in HEX

  // generate the right side (top to bottom)
  generateBar(); // the top hue bar selector
  $hueBar.onclick = setNewHue;
  generateScreen((0 * 360) / 255); // the large color screen on the right

  return $colorPicker;
};

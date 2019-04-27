//********************************************************************
// ****************  PURE JAVASCRIPT COLOR PICKER ********************
//********************************************************************
// ** This is a Color Picker developed entirely with javascript **
// To use it, all you need to do is adding the file to your HTML document
// then you would call the function named  generator(anchor, target)
// that takes two variables :
// - the anchor, that takes in the id value of the html element to which the
// color picker will be appended to
// - the target, that takes in the id value of the html element to which the
// picked color will be applied to.
// the generator function returns also the color picker html element that
// you can then change its position and control its display as you please.
// ********************************************************************
// this Color Picker consists of only one javascript file "colorPicker.js"
//             and a small image named: colorIcon.jpg.
// ********************************************************************
// *****************  Created by Doreyd Mehila 2019 *******************
// ********************************************************************
// *************************** Enjoy !!!! *****************************
// This is the color picker generator function
const generator = (rootAnchorId, targetId) => {
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

  // ******************************************************************
  // ****** Initializing the CSS dynamically using Javascript *********
  // ******************************************************************
  // ******* The CSS to be applied in a Javascript Object format ******
  // ******************************************************************

  const colorPicker = {
    position: "absolute",
    top: "300px",
    left: "40px",
    height: "288px",
    width: "240px",
    display: "block",
    background: "white",
    "border-radius": "10px",
    "box-shadow":
      "0 2px 2px rgba(0, 0, 0, 0.25), 0 3px 3px rgba(0, 0, 0, 0.22)",
    "border-style": "solid",
    "border-width": "1px",
    "z-index": "201",
    "border-color": "#cecec8"
  };

  const colorIcon = {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    "border-radius": "50%",
    transition: "all 0.1s linear"
  };

  const colorIconHover = {
    transform: "rotate(90deg)"
  };

  const colorConsole = {
    position: "absolute",
    top: "0px",
    left: "250px",
    width: "275px",
    height: "288px",
    display: "block",
    "border-style": "solid",
    "border-color": "#cecec8",
    "border-width": "1px",
    "border-radius": "10px",
    "z-index": "200",
    background: "white",
    " box-shadow":
      "0 2px 2px rgba(0, 0, 0, 0.25), 0 3px 3px rgba(0, 0, 0, 0.22)"
  };
  hueBar = {
    position: "absolute",
    left: "10px",
    top: "10px",
    width: "255",
    height: "10px",
    "border-top-style": "solid",
    "border-top-width": "1px",
    "border-top-color": "#cecec8",

    "border-bottom-style": "solid",
    "border-bottom-width": "1px",
    "border-bottom-color": "#cecec8",

    " border-left-style": "solid",
    "border-left-width": "1px",
    "border-left-color": "#cecec8",
    "z-index": "201",

    "border-radius": "5px",
    overflow: "hidden"
  };

  const colorCursor = {
    position: "absolute",
    left: " 4px",
    top: "5px",
    width: "14px",
    height: "14px",
    "border-radius": "10px",
    display: "block",
    background: "hsl(0, 90%, 50%)",
    "z-index": "202",
    "border-style": "solid",
    "border-width": "3px",
    "border-color": "white"
  };

  const colorScreen = {
    position: "absolute",
    left: "10px",
    top: "30px",
    width: "255px",
    height: "250px",
    background: "white",
    "z-index": "201",
    "border-radius": "10px",
    overflow: "hidden"
  };
  const colorSquareClass = {
    width: "18px",
    height: "18px",
    position: "absolute",
    top: "100px",
    "border-radius": "4px",
    "border-color": "#cecec8",
    "border-style": "solid",
    "border-width": "1px"
  };
  const colorDetailsClass = {
    border: "0px solid",
    position: "absolute",
    outline: "none",
    "font-family": "Helvetica",
    "font-weight": "bold",
    "font-size": "16px",
    width: "150px",
    left: "10px",
    color: "#180066"
  };

  // *** The Javascript function that dynamically applies all the CSS ***
  const applyStyle = (elem, style, update) => {
    let newStyle = "";
    for (let key in style) newStyle += `${key}:${style[key]};`; // applying basic css
    if (update) for (let key2 in update) newStyle += `${key2}:${update[key2]};`; // applying update css if any
    elem.setAttribute("style", newStyle);
  };

  // ********* Running the Javascript function above as needed **********
  applyStyle($colorPicker, colorPicker);
  applyStyle($colorIcon, colorIcon);
  $colorIcon.onmouseover = () =>
    applyStyle($colorIcon, colorIcon, colorIconHover);
  $colorIcon.onmouseout = () => applyStyle($colorIcon, colorIcon);

  applyStyle($colorConsole, colorConsole);
  applyStyle($hueBar, hueBar);
  applyStyle($colorCursor, colorCursor);
  applyStyle($colorScreen, colorScreen);

  const colorInput = (elem, Y) => {
    applyStyle(elem, colorDetailsClass);
    elem.spellcheck = false;
    elem.style.top = Y + "px";
  };

  // Creating the RGB & HEX color text that appear in the bottom left
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
        applyStyle(newColor, colorSquareClass);
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
        applyStyle(newColor, colorSquareClass);
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

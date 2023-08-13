//Select Elements
let overlay = document.querySelector(".overlay");
let startBtn = document.querySelector(".start");
let welcomeSection = document.querySelector(".welcome-message");
let navQuest = document.querySelector(".quest-msg h1");
let simpleShapes = ["Circle", "Rectangle", "Triangle"]
let shapeArr = [...simpleShapes];
let secondUnitArr = ["Black Circle & Fill It With Green", "Black Rectangle & Fill It With Red"];
let thirdUnitArr = ["Circle With Triangle"];
let fourthUnitArr = ["Tree", "House", "Flower"];
let fifthUnitArr = ["Cat", "Fish"];
let dArr = [[...simpleShapes], [...secondUnitArr], [...thirdUnitArr], [...fourthUnitArr], [...fifthUnitArr]];
let dQarr = [];
let unitsArr = [];
let randsArr = [];
let multiCs = false;
let counter = 0;
let shapes;
let rand = Math.floor(Math.random() * shapeArr.length);

console.log(dArr.length);
// console.log(dArr[multiRand][fRand]);
console.log(dArr);
console.log(dArr[3][0]);
/*multi Canvas  Question choose*/
function dUnitsQchoose(len) {
    let multiRand = Math.floor(Math.random() * dArr.length);
    let fRand = Math.floor(Math.random() * dArr[multiRand].length);
    for (let i = 0; i < len; i++) {
        dQarr[i] = dArr[multiRand][fRand];
        unitsDetection();
        dArr[multiRand].splice(fRand, 1);
        if (dArr[multiRand].length === 0 && unitsArr.length === 3) {
            dArr.splice(multiRand, 1);
        } else if (dArr[multiRand].length === 0) {
            for (; ;) {
                multiRand = Math.floor(Math.random() * dArr.length);
                if (dArr[multiRand].length !== 0) {
                    break;
                } else {
                    continue;
                }
            }
        } else {
            multiRand = Math.floor(Math.random() * dArr.length);
        }
        fRand = Math.floor(Math.random() * dArr[multiRand].length);

    }
    return dQarr;
}

function unitsDetection() {
    for (let k = 0; k < dQarr.length; k++) {
        for (let j = 0; j < dArr.length; j++) {
            dArr[j].indexOf(dQarr[k]) !== -1 ? unitsArr[k] = j + 1 : null;
        }
    }
}
function indexedElements() {
    for (let i = 0; i < unitsArr.length; i++) {
        unitsArr[i] === 1 ? randsArr[i] = simpleShapes.indexOf(dQarr[i]) : unitsArr[i] === 2 ? randsArr[i] = secondUnitArr.indexOf(dQarr[i]) : unitsArr[i] === 3 ? randsArr[i] = thirdUnitArr.indexOf(dQarr[i]) : unitsArr[i] === 4 ? randsArr[i] = fourthUnitArr.indexOf(dQarr[i]) : unitsArr[i] === 5 ? randsArr[i] = fifthUnitArr.indexOf(dQarr[i]) : null;
    }
}
window.localStorage.clear();


//Player Info Vars
let infoMessage = document.querySelector("form.player-info");
let nameField = document.querySelector("form.player-info input[type=text]");
let errorMsg = document.querySelector("form.player-info input[type=text]+label");
let submitBtn = document.querySelector("form.player-info input[type=submit]");
let skiptBtn = document.querySelector("form.player-info .wrap button");
//Units And Levels Vars
let progressHolder = document.querySelector(".progress");
let unitEl = document.querySelector(".progress .unit span");
let levelEl = document.querySelector(".progress .level span");
let unit = 1;
let level = 1;
//Timer Vars
let timer = 0, interval;

//Start The App
if (localStorage.getItem("name")) {
    unit = +localStorage.getItem("unit");
    level = +localStorage.getItem("level");
    levelEl.textContent = level;
    unitEl.textContent = unit;
    shapeArr = window.localStorage.getItem("arr").split(',');
    rand = Math.floor(Math.random() * shapeArr.length);
    overlay.classList.add("active");
    welcomeSection.remove();
    infoMessage.remove();
    welcomeUser(localStorage.getItem("name"));
}
else {

    overlay.classList.add("active");
    welcomeSection.classList.add("active");
    clickStart();
}
//
function clickStart() {
    startBtn.onclick = () => {

        welcomeSection.remove();
        showInfoMessage();
    }
}

//     
function showInfoMessage() {
    infoMessage.classList.add("active");
    submitBtn.onclick = e => {
        e.preventDefault();
        if (nameField.value === "") {
            errorMsg.classList.add("active");
        } else {
            infoMessage.remove();
            welcomeUser(nameField.value);
            window.localStorage.setItem("name", nameField.value);
            window.localStorage.setItem("unit", unit);
            window.localStorage.setItem("level", level);
            window.localStorage.setItem("arr", shapeArr);
            let localArr = window.localStorage.getItem("arr").split(',');
            console.log(localArr);
        }
    }
    skiptBtn.onclick = _ => {
        infoMessage.remove();
        welcomeUser("User");
    }
}
function welcomeUser(uName) {
    let div = document.createElement("div");
    div.style.opacity = "0";

    div.style.transitionDuration = "1s";
    div.className = "welcome-message active";
    window.setTimeout(() => {
        div.style.opacity = "1";
    }, 0);

    let intro = document.createElement("div");
    intro.className = "intro";
    let heading = document.createElement("h1");
    let headingTextB = document.createTextNode("Welcome ");
    let span = document.createElement("span");
    let headingTextA = document.createTextNode(uName);
    let p = document.createElement("p");
    let playBtn = document.createElement("button");
    playBtn.className = "primary-btn";
    playBtn.appendChild(document.createTextNode("Play"));
    p.appendChild(document.createTextNode("The game is divided into units and every unit contains a number of levels.."))
    span.appendChild(headingTextA);
    heading.appendChild(headingTextB);
    heading.appendChild(span);
    intro.appendChild(heading);
    intro.appendChild(p);
    intro.appendChild(playBtn);
    div.appendChild(intro);
    document.body.appendChild(div);


    playBtn.onclick = _ => {
        document.querySelector(".welcome-message.active").remove();
        drawQuestion();
        progressHolder.classList.add("active");
    }
}



function drawQuestion() {
    let div = document.createElement("div");
    div.className = "choose-message";
    window.setTimeout(() => {
        div.style.opacity = "1";
    }, 0);
    let h2 = document.createElement("h2");
    let txt;
    if (unit === 6) {
        txt = `Draw ${dQarr[0]} On Left, ${dQarr[1]} in the Middle, And${dQarr[2]} On right`;
    } else if (unit == 7) {
        txt = `Draw ${dQarr[0]} On Top, And ${dQarr[1]} On Bottom`
    }
    else {
        txt = `Draw ${shapeArr[rand]}`;
    }
    navQuest.textContent = txt;
    let h2Text = document.createTextNode(txt);
    h2.appendChild(h2Text);
    div.appendChild(h2);
    document.body.appendChild(div);
    choice(h2);
}
//canvas
let canvasHolder = document.querySelector(".drawing-board");
const canvas = document.querySelector(".drawing-board>canvas"),
    toolBtns = document.querySelectorAll(".tool"),
    fillColor = document.querySelector("#fill-color"),
    sizeSlider = document.querySelector("#size-slider"),
    colorBtns = document.querySelectorAll(".colors .option"),
    colorPicker = document.querySelector("#color-picker"),
    clearCanvas = document.querySelector(".clear-canvas"),
    saveImg = document.querySelector(".save-img"),
    ctx = canvas.getContext("2d");
/*Directions  */
let canvasesHolder = document.querySelectorAll(".d-canvases,.ud-canvases");
let canvases = document.querySelectorAll(".d-canvases canvas,.ud-canvases canvas");
let ctxs = [];
console.log(canvasHolder);
canvases.forEach((cs) => {
    ctxs.push(cs.getContext("2d"));
});
// global variables with default value
let prevX, prevY, snapshot,
    isDrawing = false,
    selectedTool = "brush",
    brushWidth = 5,
    selectedColor = "#000";
//Addddd
let x = 0;
let y = 0;
var offsetX;
var offsetY;
//
//Additions VARS
let xx, yy, px, py;
let xs = [], ys = [], pxs = [], pys = [];

const setCanvasBackground = () => {
    if (canvasHolder.classList.contains("active")) {
        // setting whole canvas background to white, so the downloaded img background will be white
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = selectedColor; // setting fillstyle back to the selectedColor, it'll be the brush color
    } else {
        ctxs.forEach((ct, i) => {
            ct.fillStyle = "#fff";
            ct.fillRect(0, 0, canvases[i].width, canvases[i].height);
            ct.fillStyle = selectedColor;
        });
    }
}

window.addEventListener("load", () => {
    // setting canvas width/height.. offsetwidth/height returns viewable width/height of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    canvases.forEach((cs) => {
        cs.width = cs.offsetWidth;
        cs.height = cs.offsetHeight;
    });
    setCanvasBackground();
});

const drawRect = (e) => {
    xx = e.offsetX;
    yy = e.offsetY;
    px = prevX - e.offsetX;
    py = prevY - e.offsetY;
    // if fillColor isn't checked draw a rect with border else draw rect with background
    if (!fillColor.checked) {
        if (e.touches) {
            xx = e.changedTouches[0].clientX;
            yy = e.changedTouches[0].clientY;
            px = prevX - e.changedTouches[0].clientX;
            py = prevY - e.changedTouches[0].clientY;
            touchStrokeRect(e);
        } else {
            canvasesHolder.forEach(el => {

                if (el.classList.contains("active")) {
                    ctxs.forEach((ct, i) => {

                        if (e.target === canvases[i]) {
                            xs[i] = e.offsetX;
                            ys[i] = e.offsetY;
                            pxs[i] = prevX - e.offsetX;
                            pys[i] = prevY - e.offsetY;
                            return ct.strokeRect(e.offsetX, e.offsetY, prevX - e.offsetX, prevY - e.offsetY);
                        }
                    });
                } else {

                    return ctx.strokeRect(e.offsetX, e.offsetY, prevX - e.offsetX, prevY - e.offsetY);

                }
            });
        }
    }
    else {
        if (e.touches) {
            touchFillRect(e);
        } else {
            canvasesHolder.forEach(el => {
                if (el.classList.contains("active")) {
                    ctxs.forEach((ct, i) => {
                        if (e.target === canvases[i]) {
                            ct.fillRect(e.offsetX, e.offsetY, prevX - e.offsetX, prevY - e.offsetY);
                        }
                    });
                } else {
                    ctx.fillRect(e.offsetX, e.offsetY, prevX - e.offsetX, prevY - e.offsetY);

                }
            });
        }


    }
}

const drawCircle = (e) => {
    if (e.touches) { touchCirlce(e); } else {
        // getting radius for circle according to the mouse pointer
        let radius = Math.sqrt(Math.pow((prevX - e.offsetX), 2) + Math.pow((prevY - e.offsetY), 2));
        if (canvasHolder.classList.contains("active")) {
            ctx.beginPath(); // creating new path to draw circle
            ctx.arc(prevX, prevY, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
            fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
        } else {
            ctxs.forEach((ct, i) => {
                if (e.target === canvases[i]) {
                    ct.beginPath();
                    ct.arc(prevX, prevY, radius, 0, 2 * Math.PI);
                    fillColor.checked ? ct.fill() : ct.stroke();
                    ct.closePath();
                }
            });
        }
    }
}

const drawTriangle = (e) => {
    if (canvasHolder.classList.contains("active")) {
        ctx.beginPath(); // creating new path to draw circle
        ctx.moveTo(prevX, prevY); // moving triangle to the mouse pointer
        if (e.touches) {
            ctx.lineTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY);

            ctx.lineTo(prevX * 2 - e.changedTouches[0].clientX, e.changedTouches[0].clientY); // creating bottom line of triangle

        } else {
            ctx.lineTo(e.offsetX, e.offsetY); // creating first line according to the mouse pointer

            ctx.lineTo(prevX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle

        }
        ctx.closePath(); // closing path of a triangle so the third line draw automatically
        fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill triangle else draw border
    } else {
        ctxs.forEach((ct, i) => {
            if (e.target === canvases[i]) {
                ct.beginPath(); // creating new path to draw circle
                ct.moveTo(prevX, prevY); // moving triangle to the mouse pointer or touch pointer
                if (e.touches) {
                    if (i === 1) {
                        ct.lineTo(e.changedTouches[0].clientX - canvases[i].offsetWidth, e.changedTouches[0].clientY);

                        ct.lineTo(prevX * 2 - (e.changedTouches[0].clientX - canvases[i].offsetWidth), e.changedTouches[0].clientY); // creating bottom line of triangle

                    }
                    else if (i === 2) {
                        ct.lineTo(e.changedTouches[0].clientX - canvases[i].offsetWidth - canvases[i - 1].offsetWidth, e.changedTouches[0].clientY);

                        ct.lineTo(prevX * 2 - (e.changedTouches[0].clientX - canvases[i].offsetWidth - canvases[i - 1].offsetWidth), e.changedTouches[0].clientY); // creating bottom line of triangle

                    }
                    else if (i === 4) {
                        ct.lineTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY - canvases[i].offsetHeight);

                        ct.lineTo(prevX * 2 - e.changedTouches[0].clientX, e.changedTouches[0].clientY - canvases[i].offsetHeight); // creating bottom line of triangle

                    } else {
                        ct.lineTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY);

                        ct.lineTo(prevX * 2 - e.changedTouches[0].clientX, e.changedTouches[0].clientY); // creating bottom line of triangle

                    }
                }
                else {
                    ct.lineTo(e.offsetX, e.offsetY); // creating first line according to the mouse pointer
                    ct.lineTo(prevX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle
                }

                ct.closePath(); // closing path of a triangle so the third line draw automatically
                fillColor.checked ? ct.fill() : ct.stroke();
            }
        });

    }
}
let snapshots = [];
const startDraw = (e) => {
    isDrawing = true;
    if (e.touches) {
        prevX = e.changedTouches[0].clientX; // passing current X position as prevX value
        prevY = e.changedTouches[0].clientY;// passing current Y position as prevX value
        ctxs.forEach((ct, i) => {
            if (e.target === canvases[i]) {
                ct.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
                if (i === 1) {
                    prevX = e.changedTouches[0].clientX - canvases[i].offsetWidth;
                }
                else if (i == 2) {
                    prevX = e.changedTouches[0].clientX - canvases[i].offsetWidth - canvases[i - 1].offsetWidth;
                }
                else if (i === 4) {
                    prevY = e.changedTouches[0].clientY - canvases[i].offsetHeight;
                }

            }
        });
    }
    else {
        prevX = e.offsetX; // passing current mouseX position as prevX value
        prevY = e.offsetY; // passing current mouseY position as prevY value
    }
    if (canvasHolder.classList.contains("active")) {
        ctx.beginPath(); // creating new path to draw
        ctx.lineWidth = brushWidth; // passing brushSize as line width
        ctx.strokeStyle = selectedColor; // passing selectedColor as stroke style
        ctx.fillStyle = selectedColor; // passing selectedColor as fill style
        // copying canvas data & passing as snapshot value.. this avoids dragging the image
        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } else {
        ctxs.forEach((ct, i) => {
            if (e.target === canvases[i]) {
                ct.beginPath();
                ct.lineWidth = brushWidth;
                ct.strokeStyle = selectedColor;
                ct.fillStyle = selectedColor;
                snapshots[i] = ct.getImageData(0, 0, canvases[i].width, canvases[i].height);
            }

        });

    }
}

const drawing = (e) => {
    // console.log(e.target);
    if (!isDrawing) return; // if isDrawing is false return from here

    if (canvasHolder.classList.contains("active")) {
        ctx.putImageData(snapshot, 0, 0); // adding copied canvas data on to this canvas
    } else {
        if (e.touches) {

            console.log(e);
            e.preventDefault();
            ctxs.forEach((ct, i) => {
                if (e.target === canvases[i]) {

                    ct.putImageData(snapshots[i], 0, 0);

                }
            });
        } else {
            ctxs.forEach((ct, i) => {
                if (e.target === canvases[i]) {

                    ct.putImageData(snapshots[i], 0, 0);

                }
            });
        }
    }
    if (selectedTool === "brush" || selectedTool === "eraser") {
        if (e.touches) {
            freeTouches(e);
        } else {
            if (canvasHolder.classList.contains("active")) {
                // if selected tool is eraser then set strokeStyle to white 
                // to paint white color on to the existing canvas content else set the stroke color to selected color
                ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
                ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
                ctx.stroke(); // drawing/filling line with color
            } else {
                ctxs.forEach((ct, i) => {
                    if (e.target === canvases[i]) {
                        ct.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
                        ct.lineTo(e.offsetX, e.offsetY);
                        ct.stroke();
                    }

                });
            }
        }

    } else if (selectedTool === "rectangle") {
        drawRect(e);
    } else if (selectedTool === "circle") {
        drawCircle(e);
    } else {
        drawTriangle(e);
    }
}



toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { // adding click event to all tool option
        // removing active class from the previous option and adding on current clicked option
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
    });
});

sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value); // passing slider value as brushSize

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => { // adding click event to all color button
        // removing selected class from the previous option and adding on current clicked option
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        // passing selected btn background color as selectedColor value
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

colorPicker.addEventListener("change", () => {
    // passing picked color value from color picker to last color btn background
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click", () => {
    if (canvasHolder.classList.contains("active")) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing whole canvas
    } else {
        ctxs.forEach((cs, i) => {
            cs.clearRect(0, 0, canvases[i].width, canvases[i].height);
        });
        // clearing whole canvas
    }
    setCanvasBackground();
});
//Mouse Events
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    ctx.lineWidth = brushWidth;
    ctx.fillStyle = selectedColor;
    fillBtn.onclick = _ => {
        selectedColor ? ctx.fillStyle = selectedColor : ctx.fillStyle = "#000";

        ctx.fill();
        if (selectedTool === "rectangle") {
            ctx.fillRect(xx, yy, px, py);
        }
    }
});
//Touch Events
canvas.addEventListener('touchstart', startDraw);
canvas.addEventListener('touchend', () => isDrawing = false);
canvas.addEventListener('touchcancel', () => isDrawing = false);
canvas.addEventListener('touchmove', drawing);
canvases.forEach((cs) => {
    cs.addEventListener("mousedown", startDraw);
    cs.addEventListener("mousemove", drawing);
    cs.addEventListener("mouseup", (e) => {
        isDrawing = false;
        ctx.lineWidth = brushWidth;
        ctx.fillStyle = selectedColor;
        fillBtn.onclick = _ => {
            selectedColor ? ctx.fillStyle = selectedColor : ctx.fillStyle = "#000";

            ctx.fill();
            if (selectedTool === "rectangle") {
                ctx.fillRect(xx, yy, px, py);
            }



            ctxs.forEach((cs, i) => {
                if (e.target === canvases[i]) {
                    selectedColor ? cs.fillStyle = selectedColor : cs.fillStyle = "#000";
                    cs.fill();
                    if (selectedTool === "rectangle") {
                        cs.fillRect(xs[i], ys[i], pxs[i], pys[i]);
                    }
                }

            });

        }
    });
});
canvases.forEach((cs) => {
    cs.addEventListener("touchstart", startDraw);
    cs.addEventListener("touchmove", drawing);
    cs.addEventListener("touchend", (e) => {
        isDrawing = false;
        fillBtn.onclick = _ => {
            selectedColor ? ctx.fillStyle = selectedColor : ctx.fillStyle = "#000";
            ctx.fill();
            if (selectedTool === "rectangle") {
                ctx.fillRect(xx, yy, px, py);
            }
            ctxs.forEach((cs, i) => {
                if (e.target === canvases[i]) {
                    selectedColor ? cs.fillStyle = selectedColor : cs.fillStyle = "#000";
                    cs.fill();
                    if (selectedTool === "rectangle") {
                        cs.fillRect(xs[i], ys[i], pxs[i], pys[i]);
                    }
                }

            });
        }
    });
});

const ongoingTouches = [];

function handleStart(evt) {
    evt.preventDefault();
    const touches = evt.changedTouches;

    offsetX = canvas.getBoundingClientRect().left;
    offsetY = canvas.getBoundingClientRect().top;
    for (let i = 0; i < touches.length; i++) {
        ongoingTouches.push(copyTouch(touches[i]));
    }
}

function handleMove(evt) {
    evt.preventDefault();
    const touches = evt.changedTouches;
    for (let i = 0; i < touches.length; i++) {

        const idx = ongoingTouchIndexById(touches[i].identifier);
        if (idx >= 0) {
            if (selectedTool === "brush" || selectedTool === "eraser") {
                // if selected tool is eraser then set strokeStyle to white 
                // to paint white color on to the existing canvas content else set the stroke color to selected color
                ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
                ctx.beginPath();
                // ctx.moveTo(ongoingTouches[idx].clientX - offsetX, ongoingTouches[idx].clientY - offsetY);
                ctx.moveTo(ongoingTouches[idx].clientX, ongoingTouches[idx].clientY);
                // ctx.lineTo(touches[i].clientX - offsetX, touches[i].clientY - offsetY);
                ctx.lineTo(touches[i].clientX, touches[i].clientY);
                ctx.lineWidth = brushWidth;
                // ctx.strokeStyle = selectedColor;;
                ctx.lineJoin = "round";
                ctx.closePath();
                ctx.stroke();

            }
            ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
        }
    }

}

function handleEnd(evt) {
    evt.preventDefault();
    const touches = evt.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        let idx = ongoingTouchIndexById(touches[i].identifier);
        if (idx >= 0) {
            ctx.lineWidth = brushWidth;
            ctx.fillStyle = selectedColor;
            ongoingTouches.splice(idx, 1);  // remove it; we're done
        }
    }
}

function handleCancel(evt) {
    evt.preventDefault();
    const touches = evt.changedTouches;
    for (let i = 0; i < touches.length; i++) {
        let idx = ongoingTouchIndexById(touches[i].identifier);
        ongoingTouches.splice(idx, 1);  // remove it; we're done
    }
}

function copyTouch({ identifier, clientX, clientY }) {
    return { identifier, clientX, clientY };
}

function ongoingTouchIndexById(idToFind) {
    for (let i = 0; i < ongoingTouches.length; i++) {
        const id = ongoingTouches[i].identifier;
        if (id === idToFind) {
            return i;
        }
    }
    return -1;    // not found
}
function dStartTouches(e) {
    console.log(e);
    isDrawing = true;
    console.log("touch start" + e.target);
    prevX = e.changedTouches[0].clientX; // passing current mouseX position as prevX value
    prevY = e.changedTouches[0].clientY; // passing current mouseY position as prevY value
    e.preventDefault();

    ctxs.forEach((ct, i) => {
        if (e.target === canvases[i]) {
            ct.beginPath();
            ct.lineWidth = brushWidth;
            ct.strokeStyle = selectedColor;
            ct.fillStyle = selectedColor;
            snapshots[i] = ct.getImageData(0, 0, canvases[i].width, canvases[i].height);
        }

    });

}
function dMoveTouches(e) {
    if (!isDrawing) return;
    e.preventDefault();
    ctxs.forEach((ct, i) => {
        if (e.target === canvases[i]) {

            ct.putImageData(snapshots[i], 0, 0);

        }
    });
    if (selectedTool === "brush" || selectedTool === "eraser") {

        ctxs.forEach((ct, i) => {
            if (e.target === canvases[i]) {
                ct.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
                if (i === 1) {
                    ct.lineTo(e.changedTouches[0].clientX - canvases[i].offsetWidth, e.changedTouches[0].clientY);

                }
                else if (i == 2) {
                    ct.lineTo(e.changedTouches[0].clientX - canvases[i].offsetWidth - canvases[i - 1].offsetWidth, e.changedTouches[0].clientY);

                }
                else if (i === 4) {
                    ct.lineTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY - canvases[i].offsetHeight);
                }
                else {
                    ct.lineTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
                }
                ct.stroke();
                console.log(e.changedTouches[0].clientX);
                console.log(e.changedTouches[0].clientY);
            }

        });
    }
    else if (selectedTool === "circle") {
        let radius = Math.sqrt(Math.pow((prevX - e.changedTouches[0].clientX), 2) + Math.pow((prevY - e.changedTouches[0].clientY), 2));

        ctxs.forEach((ct, i) => {
            if (e.target === canvases[i]) {
                ct.beginPath();
                ct.arc(prevX, prevY, radius, 0, 2 * Math.PI);
                fillColor.checked ? ct.fill() : ct.stroke();
                ct.closePath();
            }
        });
    }
}

function dEndTouches() { }
function dCancelTouches() { }









/*Toggle Paint Mobile Menu */
let burgerIcon = document.querySelector(".burger-icon");
let paintBoard = document.querySelector(".tools-board")
burgerIcon.onclick = (e) => {
    e.stopPropagation();
    burgerIcon.classList.toggle("active");
    paintBoard.classList.toggle("active");

}
document.addEventListener("click", (e) => {

    if (burgerIcon.classList.contains("active")) {
        burgerIcon.classList.toggle("active");
        paintBoard.classList.toggle("active");

    }
})

//Adding Fill Color 
let fillBtn = document.querySelector("#fill-after");
// fillBtn.onclick = _ => {
//     if (canvasHolder.classList.contains("active")) {
//         selectedColor ? ctx.fillStyle = selectedColor : ctx.fillStyle = "#000";
//         ctx.fill();
//         if (selectedTool === "rectangle") {
//             ctx.fillRect(xx, yy, px, py);
//         }
//     }
// }
function freeTouches(e) {
    if (canvasHolder.classList.contains("active")) {
        // if selected tool is eraser then set strokeStyle to white 
        // to paint white color on to the existing canvas content else set the stroke color to selected color
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY); // creating line according to the mouse pointer
        ctx.stroke(); // drawing/filling line with color
    }
    else {
        ctxs.forEach((ct, i) => {
            if (e.target === canvases[i]) {
                ct.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
                if (i === 1) {
                    ct.lineTo(e.changedTouches[0].clientX - canvases[i].offsetWidth, e.changedTouches[0].clientY);

                }
                else if (i == 2) {
                    ct.lineTo(e.changedTouches[0].clientX - canvases[i].offsetWidth - canvases[i - 1].offsetWidth, e.changedTouches[0].clientY);

                }
                else if (i === 4) {
                    ct.lineTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY - canvases[i].offsetHeight);
                }
                else {
                    ct.lineTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
                }
                ct.stroke();
                console.log(e.changedTouches[0].clientX);
                console.log(e.changedTouches[0].clientY);
            }

        });
    }
}
function touchCirlce(e) {
    let radius = Math.sqrt(Math.pow((prevX - e.changedTouches[0].clientX), 2) + Math.pow((prevY - e.changedTouches[0].clientY), 2));
    if (canvasHolder.classList.contains("active")) {
        ctx.beginPath(); // creating new path to draw circle
        ctx.arc(prevX, prevY, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
        fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
    } else {
        ctxs.forEach((ct, i) => {
            if (e.target === canvases[i]) {
                ct.beginPath();
                if (i === 1) {

                    radius = Math.sqrt(Math.pow((prevX - (e.changedTouches[0].clientX - canvases[i].offsetWidth)), 2) + Math.pow((prevY - e.changedTouches[0].clientY), 2));
                    ct.arc(prevX, prevY, radius, 0, 2 * Math.PI);

                }
                else if (i == 2) {
                    radius = Math.sqrt(Math.pow((prevX - (e.changedTouches[0].clientX - canvases[i].offsetWidth - canvases[i - 1].offsetWidth)), 2) + Math.pow((prevY - e.changedTouches[0].clientY), 2));
                    ct.arc(prevX, prevY, radius, 0, 2 * Math.PI);

                }
                else if (i === 4) {
                    radius = Math.sqrt(Math.pow((prevX - e.changedTouches[0].clientX), 2) + Math.pow((prevY - (e.changedTouches[0].clientY - canvases[i].offsetHeight)), 2));
                    ct.arc(prevX, prevY, radius, 0, 2 * Math.PI);

                }
                else {
                    ct.arc(prevX, prevY, radius, 0, 2 * Math.PI);
                }
                fillColor.checked ? ct.fill() : ct.stroke();
                ct.closePath();
            }
        });
    }
}
function touchStrokeRect(e) {
    canvasesHolder.forEach(el => {

        if (el.classList.contains("active")) {
            ctxs.forEach((ct, i) => {

                if (e.target === canvases[i]) {
                    x[i] = e.changedTouches[0].clientX;
                    ys[i] = e.changedTouches[0].clientY;
                    pxs[i] = prevX - e.changedTouches[0].clientX;
                    pys[i] = prevY - e.changedTouches[0].clientY;
                    if (i === 1) {
                        return ct.strokeRect(e.changedTouches[0].clientX - canvases[i].offsetWidth, e.changedTouches[0].clientY, prevX - (e.changedTouches[0].clientX - canvases[i].offsetWidth), prevY - e.changedTouches[0].clientY);
                    } else if (i === 2) {
                        return ct.strokeRect(e.changedTouches[0].clientX - canvases[i].offsetWidth - canvases[i - 1].offsetWidth, e.changedTouches[0].clientY, prevX - (e.changedTouches[0].clientX - canvases[i].offsetWidth - canvases[i - 1].offsetWidth), prevY - e.changedTouches[0].clientY);

                    }
                    else {
                        return ct.strokeRect(e.changedTouches[0].clientX, e.changedTouches[0].clientY, prevX - e.changedTouches[0].clientX, prevY - e.changedTouches[0].clientY);
                    }
                }
            });
        } else {

            return ctx.strokeRect(e.changedTouches[0].clientX, e.changedTouches[0].clientY, prevX - e.changedTouches[0].clientX, prevY - e.changedTouches[0].clientY);


        }
    });
}
function touchFillRect(e) {
    canvasesHolder.forEach(el => {
        if (el.classList.contains("active")) {
            ctxs.forEach((ct, i) => {
                if (e.target === canvases[i]) {
                    if (i === 1) {
                        return ct.fillRect(e.changedTouches[0].clientX - canvases[i].offsetWidth, e.changedTouches[0].clientY, prevX - (e.changedTouches[0].clientX - canvases[i].offsetWidth), prevY - e.changedTouches[0].clientY);
                    } else if (i === 2) {
                        return ct.fillRect(e.changedTouches[0].clientX - canvases[i].offsetWidth - canvases[i - 1].offsetWidth, e.changedTouches[0].clientY, prevX - (e.changedTouches[0].clientX - canvases[i].offsetWidth - canvases[i - 1].offsetWidth), prevY - e.changedTouches[0].clientY);

                    }
                    else {
                        return ct.fillRect(e.changedTouches[0].clientX, e.changedTouches[0].clientY, prevX - e.changedTouches[0].clientX, prevY - e.changedTouches[0].clientY);
                    }
                }
            });
        } else {
            return ctx.fillRect(e.changedTouches[0].clientX, e.changedTouches[0].clientY, prevX - e.changedTouches[0].clientX, prevY - e.changedTouches[0].clientY);

        }
    });
}
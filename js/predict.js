// the link to your model provided by Teachable Machine export panel
const URL = `tm-my-image-model/`;

let model, maxPredictions, circle, rectangle;
let image = document.querySelector("#hi");
let stBtn = document.querySelector(".start-now");
let predBtn = document.querySelector(".predee");
let refresh = true;
let loading = document.querySelector(".loading");
init();
let progBtnActive = false;
// Load the image model 
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    if (refresh) {
        refresh = false;

    }
    else {
        location.reload();
    }

}


function loadDrawing(c) {

    image.src = c.toDataURL();
    // console.log(image);
    image.style.width = "200px";
    image.style.height = "200px";

    // console.log("from image function");
}

async function predict(index) {
    // predict can take in an image, video or canvas html element

    const prediction = await model.predict(image);


    for (let i = 0; i < maxPredictions; i++) {
        console.log(prediction[i].className);
        console.log(prediction[i].probability);
        // if (rand === i) {
        //     if (prediction[rand].probability > 0.5) {
        //         predictionResult(`great! You Draw The Correct Shape`)
        //     }
        //     else {
        //         predictionResult(`Bad`)
        //     }

        // }
        if (unit === 1 || unit === 4 || unit === 5) {
            if (`${shapeArr[index].toLowerCase()}s` === prediction[i].className) {
                checkProbability(prediction[i], multiCs)
                break;
            }
        } else if (unit === 2) {
            if (shapeArr[index] === "Black Circle & Fill It With Green" && prediction[i].className === "black_circle...") {
                checkProbability(prediction[i], multiCs)
                break;
            }
            else if (shapeArr[index] === "Black Rectangle & Fill It With Red" && prediction[i].className === "black_rectan...") {
                checkProbability(prediction[i], multiCs)
                break;
            }
        } else if (unit === 3) {
            if (shapeArr[index] === "Circle With Triangle" && prediction[i].className === "circles_tria...") {
                checkProbability(prediction[i], multiCs)
                break;
            }
        }
    }
    loading.classList.remove("active");

}
function executionPred() {
    clearInterval(interval);

    if (canvasesHolder[0].classList.contains("active")) {
        window.setTimeout(() => {
            loadDrawing(canvases[0]);
            unit = unitsArr[0];
            window.setTimeout(selectUnit, 100, unit);
            // selectUnit(unit);
            console.log(`unitsarr[0] = ${unitsArr[0]}, randsArr[0] = ${randsArr[0]} , shapeArr = ${shapeArr}`);
            window.setTimeout(predict, 300, randsArr[0]);
        }, 0);

        window.setTimeout(() => {
            loadDrawing(canvases[1]);
            unit = unitsArr[1];
            window.setTimeout(selectUnit, 100, unit);
            // selectUnit(unit);
            window.setTimeout(predict, 700, randsArr[1]);
            console.log(`unitsarr[1] = ${unitsArr[1]}, randsArr[1] = ${randsArr[1]} , shapeArr = ${shapeArr}`);
        }, 1000);
        window.setTimeout(() => {
            loadDrawing(canvases[2]);
            unit = unitsArr[2];
            window.setTimeout(selectUnit, 400, unit);
            // selectUnit(unit);
            window.setTimeout(predict, 1500, randsArr[2]);
            console.log(`unitsarr[2] = ${unitsArr[2]}, randsArr[2] = ${randsArr[2]} , shapeArr = ${shapeArr}`);
        }, 3000);
        window.setTimeout(() => {
            if (counter === 3) {
                unit = 6;
                selectUnit(unit);

                predictionResult("great!You Draw The Correct Shapes In The Correct Directions");
            } else {
                predictionResult(`Bad`);
            }
            counter = 0;
        }, 10000)

    } else if (canvasesHolder[1].classList.contains("active")) {

        window.setTimeout(() => {
            loadDrawing(canvases[3]);
            unit = unitsArr[0];
            window.setTimeout(selectUnit, 100, unit);
            // selectUnit(unit);
            console.log(`unitsarr[0] = ${unitsArr[0]}, randsArr[0] = ${randsArr[0]} , shapeArr = ${shapeArr}`);
            window.setTimeout(predict, 300, randsArr[0]);
        }, 0);

        window.setTimeout(() => {
            loadDrawing(canvases[4]);
            unit = unitsArr[1];
            window.setTimeout(selectUnit, 100, unit);
            // selectUnit(unit);
            window.setTimeout(predict, 700, randsArr[1]);
            console.log(`unitsarr[1] = ${unitsArr[1]}, randsArr[1] = ${randsArr[1]} , shapeArr = ${shapeArr}`);
        }, 1000);
        window.setTimeout(() => {
            if (counter === 2) {
                unit = 7;
                selectUnit(unit);

                predictionResult("great!You Draw The Correct Shapes In The Correct Directions");
            } else {
                predictionResult(`Bad`);
            }
            counter = 0;
        }, 2000)
    }
    else {
        loadDrawing(canvas);
        window.setTimeout(predict, 0, rand);
    }

}

// predBtn.onclick = () => {
//     overlay.classList.add("active");
//     loading.classList.add("active");
//     executionPred();
// }
function choice(el) {
    //Start Timer On Click
    el.addEventListener("click", () => {
        interval = window.setInterval(() => {
            timer++;
            // console.log(timer);
        }, 1000);
        afterChoose();
        predBtn.onclick = () => {
            // predict();
            overlay.classList.add("active");
            loading.classList.add("active");
            window.setTimeout(() => {

                executionPred();
            }, 500);
        }
    });
}
function afterChoose() {
    document.querySelector(".choose-message").style.top = "20px";
    window.setTimeout(() => {
        document.querySelector(".choose-message").remove();
    }, 450);

    overlay.classList.remove("active");
}
function predictionResult(res) {
    let div = document.createElement("div");
    div.className = "prediction-result";
    let contentDiv = document.createElement("div");
    contentDiv.className = "content";
    let h2 = document.createElement("h2");
    let h2Text = document.createTextNode(`${res}`);
    h2.appendChild(h2Text);
    contentDiv.appendChild(h2);
    if (res.indexOf("great") !== -1) {
        posResult(contentDiv, div);
        //Splice
        if (unit !== 6) {
            if (shapeArr.length > 1) {
                shapeArr.splice(rand, 1);
                if (unit !== 7) {
                    window.localStorage.setItem("arr", shapeArr);
                }
            }
            rand = Math.floor(Math.random() * shapeArr.length);
            console.log("random after slice:" + rand);
            console.log("random after slice:" + shapeArr[rand]);
        }
        let timerSpan = document.createElement("span");
        timerSpan.className = "timer";
        let timerContent = document.createTextNode(`Time Elapsed: ${timer} Seconds`);
        timerSpan.appendChild(timerContent);
        div.appendChild(timerSpan);
        timer = 0;
    }
    else {
        negResult(contentDiv, div);
    }
    overlay.classList.add("active");

    div.appendChild(contentDiv);
    document.body.appendChild(div);

}

function posResult(contentDiv, div) {
    let nextBtn = document.createElement("button");
    nextBtn.className = "nxt-btn primary-btn";
    nextBtn.appendChild(document.createTextNode("Next Level"));
    if (unit === 7 && level === 3) {


        let finishEl = document.createElement("h1");
        finishEl.appendChild(document.createTextNode("Amazing!, You Finished All The Units"));
        contentDiv.appendChild(finishEl);
        contentDiv.querySelector("h2").remove();
        window.localStorage.clear();
        nextBtn.textContent = "Play Again!";
        nextBtn.onclick = () => {

            window.location.reload();
        };

    }
    contentDiv.appendChild(nextBtn);
    // unit = 5;
    // level = 3;
    // shapeArr.length = 1;
    if (shapeArr.length === 1 || (unit === 6 && level === 3)) {
        shapeArr.pop();
        // if (unit !== 5) {
        nextBtn.textContent = "Continue To Next Unit";

        nextBtn.addEventListener("click", () => {

            level = 1;

            unit++;
            selectUnit(unit);
            if (unit === 6) {
                if (!progBtnActive) {
                    dUnitsQchoose(3);
                    indexedElements();
                    console.log(dQarr);
                    console.log(unitsArr);
                    console.log(randsArr);
                    multiCs = true;
                    canvasHolder.classList.remove("active");
                    canvasesHolder[0].classList.add("active");

                    canvases.forEach((cs) => {
                        cs.width = cs.offsetWidth;
                        cs.height = cs.offsetHeight;
                    });
                    progBtnActive = false;
                }
            } else if (unit === 7) {
                multiCs = true;
                if (!progBtnActive) {
                    canvasesHolder[0].classList.remove("active");
                    canvasesHolder[1].classList.add("active");
                    canvasHolder.classList.remove("active");
                    dArr = [[...simpleShapes], [...secondUnitArr], [...thirdUnitArr], [...fourthUnitArr], [...fifthUnitArr]];
                    shapeArr = dArr;
                    unitsArr = [];
                    randsArr = [];
                    dQarr = [];
                    dUnitsQchoose(2);
                    indexedElements();
                    console.log(dQarr);
                    console.log(unitsArr);
                    console.log(randsArr);

                    canvases.forEach((cs) => {
                        cs.width = cs.offsetWidth;
                        cs.height = cs.offsetHeight;
                    });
                    progBtnActive = false;
                }

            }

            localStorageSet();
            levelEl.textContent = level;
            unitEl.textContent = unit;
            rand = Math.floor(Math.random() * shapeArr.length);
            div.remove();
            drawQuestion();
            clearCanvas.click();
        }
        );
        // } else {
        //     if (level === 3) {
        //         nextBtn.textContent = "Play Again!";
        //         nextBtn.addEventListener("click", () => {
        //             window.localStorage.clear();
        //             window.location.reload();
        //         });
        //     }
        // }
    } else if (shapeArr.length >= 1) {
        nextBtn.addEventListener("click", () => {
            console.log("clicked");
            if (unit === 6 && level !== 3) {
                dArr = [[...simpleShapes], [...secondUnitArr], [...thirdUnitArr], [...fourthUnitArr], [...fifthUnitArr]];
                shapeArr = dArr;
                unitsArr = [];
                randsArr = [];
                dQarr = [];
                dUnitsQchoose(3);
                indexedElements();
                console.log("randsArr: " + randsArr);
                console.log("dQarr: " + dQarr);
                console.log("unitsArr: " + unitsArr);
            }
            else if (unit === 7 && level !== 3) {
                dArr = [[...simpleShapes], [...secondUnitArr], [...thirdUnitArr], [...fourthUnitArr], [...fifthUnitArr]];
                shapeArr = dArr;
                unitsArr = [];
                randsArr = [];
                dQarr = [];
                dUnitsQchoose(2);
                indexedElements();
                console.log("randsArr: " + randsArr);
                console.log("dQarr: " + dQarr);
                console.log("unitsArr: " + unitsArr);
            }
            level++;
            levelEl.textContent = level;
            if (window.localStorage.getItem("name")) {
                if (unit !== 6 || unit !== 7) {
                    window.localStorage.setItem("level", level);
                }
            }
            div.remove();
            drawQuestion();
            clearCanvas.click();

        });

    }
}



function negResult(contentDiv, div) {
    let tryBtn = document.createElement("button");
    tryBtn.className = "try-btn";
    tryBtn.appendChild(document.createTextNode("Play Again!"));
    contentDiv.appendChild(tryBtn);
    tryBtn.addEventListener("click", () => {
        overlay.classList.remove("active");
        div.remove();
        // clearCanvas.click();
        counter = 0;
    })
}

function selectUnit(unitt) {
    if (unitt === 1) {
        shapeArr = [...simpleShapes];
        window.localStorage.setItem("arr", shapeArr);

    }
    else if (unitt === 2) {
        shapeArr = [...secondUnitArr];
        window.localStorage.setItem("arr", shapeArr);
        console.log("getitems", window.localStorage.getItem("arr"));
    } else if (unitt === 3) {
        shapeArr = [...thirdUnitArr];
        window.localStorage.setItem("arr", shapeArr);
    } else if (unitt === 4) {
        shapeArr = [...fourthUnitArr];
        window.localStorage.setItem("arr", shapeArr);
    } else if (unitt === 5) {
        shapeArr = [...fifthUnitArr];
        window.localStorage.setItem("arr", shapeArr);
    }
    else {
        shapeArr = [...dQarr];

    }
}

function localStorageSet() {
    if (window.localStorage.getItem("name")) {
        if (unit !== 6 || unit !== 7) {
            window.localStorage.setItem("unit", unit);
            window.localStorage.setItem("level", level);
        }
    }
}

function checkProbability(prediction, multiCs) {
    if (prediction.probability > 0.5) {
        if (multiCs) {
            counter++;
            console.log("counter is: " + counter);
        }
        else {
            predictionResult(`great! You Draw The Correct Shape`);
        }
    }
    else {
        if (multiCs) {
            return;
        } else {
            predictionResult(`Bad`);
        }
    }
}


let progBtn = document.querySelectorAll(".prog-btn button");
progBtn.forEach((e, i) => {

    e.onclick = () => {
        clearCanvas.click();
        level = 1;
        levelEl.textContent = level;

        unit = i + 1;
        unitEl.textContent = unit;
        selectUnit(unit);

        overlay.classList.add("active");
        if (unit === 6 || unit === 7) {
            multiCs = true;
            canvasHolder.classList.remove("active");
            if (unit === 6) {
                canvasesHolder[0].classList.add("active");
                canvasesHolder[1].classList.remove("active");
                dUnitsActive(6);
            } else {
                canvasesHolder[0].classList.remove("active");
                canvasesHolder[1].classList.add("active");
                dUnitsActive(7);
            }
            canvases.forEach((cs) => {
                cs.width = cs.offsetWidth;
                cs.height = cs.offsetHeight;
            });
            selectUnit(unit);

        }
        else {
            rand = Math.floor(Math.random() * shapeArr.length);
            if (unit === 3) {
                shapeArr = [...thirdUnitArr, ...thirdUnitArr];
            }

            multiCs = false;
            canvasesHolder[0].classList.remove("active");
            canvasesHolder[1].classList.remove("active");
            canvasHolder.classList.add("active");

        }
        drawQuestion();
        if (unit === 3) {
            console.log(shapeArr);
            // shapeArr.length = 1;
            shapeArr.pop();
            rand = 0;
            console.log(shapeArr.length);

        }
    }
})
function dUnitsActive(uNum) {
    progBtnActive = true;
    dArr = [[...simpleShapes], [...secondUnitArr], [...thirdUnitArr], [...fourthUnitArr], [...fifthUnitArr]];
    unitsArr = [];
    randsArr = [];
    dQarr = [];
    if (uNum === 6) {
        dUnitsQchoose(3);
    }
    else {
        dUnitsQchoose(2);

    }
    shapeArr = dArr;
    indexedElements();
}
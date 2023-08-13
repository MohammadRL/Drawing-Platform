let sketchRnn;
let s;
let canvas;
let x, y;
let seedPath = [];
let personDrawing = false;
let nextPen = "down";
let test = true;
let newDraw = false;
let dontPress = false;
let redrawing = false;
let selectedModels = document.querySelectorAll("select option");
let sketchRnnModel = "cat";
function preload() {
    sketchRnn = ml5.sketchRNN(sketchRnnModel);
}
function startDraw() {
    if (!dontPress) {
        personDrawing = true;
        x = mouseX;
        y = mouseY;
        console.log("clicked");
    }
}
function sketchRNNStart() {
    if (!dontPress) {
        personDrawing = false;
        console.log("start drawing sketch");
        sketchRnn.generate(seedPath, gotStrokePath);
    }
}
function setup() {
    canvas = createCanvas(1200, 700);
    canvas.mousePressed(startDraw);
    canvas.mouseReleased(sketchRNNStart);

    console.log("model loaded");

}
function gotStrokePath(error, stPath) {
    console.log(stPath);
    s = stPath;
}
function draw() {
    stroke(0);
    strokeWeight(4);
    selectedModels.forEach((e) => {
        if (e.selected === true && sketchRnnModel !== e.value) {
            sketchRnnModel = e.value;
            console.log(sketchRnnModel);
            sketchRnn = ml5.sketchRNN(sketchRnnModel);
        }

    });

    if (personDrawing) {

        let strokePath = {
            dx: mouseX - pmouseX,
            dy: mouseY - pmouseY,
            pen: 'down',
            xs: mouseX,
            ys: mouseY

        }

        line(x, y, x + strokePath.dx, y + strokePath.dy);

        x += strokePath.dx;
        y += strokePath.dy;
        seedPath.push(strokePath);
    }
    if (s) {


        if (nextPen === "end") {
            dontPress = true;
            if (test) {
                sketchRnn = ml5.sketchRNN(sketchRnnModel);

                x = seedPath[seedPath.length - 1].xs + seedPath[seedPath.length - 1].dx;
                y = seedPath[seedPath.length - 1].ys + seedPath[seedPath.length - 1].dy;

                test = false;
            }


            return;



        }
        if (newDraw) {
            for (let track of seedPath) {
                line(track.xs, track.ys, track.xs + track.dx, track.ys + track.dy);
            }
            newDraw = false;
        }
        if (nextPen === "down") {
            line(x, y, x + s.dx, y + s.dy);
        }
        x += s.dx;
        y += s.dy;
        nextPen = s.pen;
        s = null;
        sketchRnn.generate(gotStrokePath);

    }


}
let redrawBtn = document.querySelector(".redraw-btn");
redrawBtn.onclick = () => {
    dontPress = false;
    newDraw = true;
    nextPen = "down";
    canvas.clear();
    sketchRNNStart();
    window.setTimeout(() => {
        draw();
        test = true;
    }, 2000);


}



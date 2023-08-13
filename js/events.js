// Selecting Elements
let stBtn = document.querySelector(".intro-window button");
let videoOverlay = document.querySelector("#overlay");

stBtn.onclick = (e) => {
    e.target.parentElement.classList.add("removed");
    videoOverlay.classList.add("removed");



}
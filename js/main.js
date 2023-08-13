let downBtn = document.querySelector("i.down-arr");
let gamesSection = document.querySelector(".games");
downBtn.onclick = () => {
    gamesSection.scrollIntoView({
        behavior: "smooth",
    });
}
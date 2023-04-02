import Sfx from "./sfx.js"

// audio files
const codec = new Sfx('./sounds/0x10.wav', 0.1);

window.addEventListener('load', () => {
    let snakeSvg = document.getElementById("snake_svg");
    snakeSvg.addEventListener('click', wizzOn);
    snakeSvg.addEventListener('animationend', wizzOff);
})


function wizzOn(){
    this.classList.add('wizz');
    codec.play();
}

function wizzOff(){
    this.classList.remove('wizz');
}
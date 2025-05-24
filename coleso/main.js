let container = document.querySelector('.container');
let btn = document.getElementById('spin');

let currentRotation = 0;

btn.onclick = function () {
    let randomSpins = Math.floor(Math.random() * 5) + 3;
    let randomExtraDegrees = Math.ceil(Math.random() * 359);
    let totalRandomRotation = (randomSpins * 360) + randomExtraDegrees;

    currentRotation += totalRandomRotation;

    container.style.transform = "rotate(" + currentRotation + "deg)";
}
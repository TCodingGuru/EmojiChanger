const expressions = ["images/happy.png", "images/sad.png", "images/neutral.png"];

let currentIndex = 0;

function changeExpression() {
    let img = document.getElementById("character");
    img.style.opacity = 0;

    setTimeout(() => {
        img.src = expressions[currentIndex];
        img.style.opacity = 1;
        currentIndex = (currentIndex + 1) % expressions.length;
    }, 300); 
}

function play() {
    var audio = document.getElementById("audio");
    audio.currentTime = 0;  // Reset to start
    audio.play().catch(error => console.error("Playback failed:", error));
}
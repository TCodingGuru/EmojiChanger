document.addEventListener("DOMContentLoaded", function () {
    const expressions = ["images/happy.png", "images/sad.png", "images/neutral.png"];

    let img = document.querySelector("#character"); 
    let audio = document.querySelector("#audio");   
    let button = document.querySelector("#changeButton"); 

    function changeExpression() {
        img.style.opacity = 0;

        setTimeout(() => {
            let randomIndex = Math.floor(Math.random() * expressions.length); 
            img.src = expressions[randomIndex];
            img.style.opacity = 1;
        }, 300);
    }
    
    function play() {
        audio.currentTime = 0;
        audio.play().catch(error => console.error("Playback failed:", error));
    }

    button.addEventListener("click", function () {
        changeExpression();
        play();
    });
});

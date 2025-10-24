const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern =[];
let level = 0;

function nextSequence(){
    level++;
    userClickedPattern.length = 0;
    $("#level-title").text("Level " + level);
    const randomNumnber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumnber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

$(".btn").click(function(e){
    const userChosenColour = e.target.getAttribute("id");
    userClickedPattern.push(userChosenColour);
    const index = userClickedPattern.length - 1;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(index);
})

function playSound(name){
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.volume = 0.15;
    audio.play();
}

function animatePress(currentColour) {
    const element = $("#" + currentColour);
    element.addClass("pressed");
    setTimeout(() => {
        element.removeClass("pressed");
    }, 100);
}

let inGame = false;

$(document).on("keypress", function(){
    if (inGame){
        return;
    }
    inGame = true;
    $("#level-title").text("Level 0");
    level = 0;
    nextSequence();

});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(()=>{
                nextSequence();
            }, 1000);
        }
        return ;
    }
    playSound("wrong");
    const body = $("body");
    body.addClass("game-over");
    startOver();
    setTimeout(()=>{
        body.removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key To Restart");
    return ;
}

function startOver(){
    level = 0;
    userClickedPattern.length = 0;
    gamePattern.length = 0;
    inGame = false;
}
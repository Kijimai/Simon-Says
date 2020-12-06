const buttonColors = ["red", "blue", "green", "yellow" ]
let gamePattern = []
let userClickPattern = []
let level = 0;
let started = false;

//checks if the game has started
$(document).keydown(function() {
  if(!started) {
    $("#level-title").text("Level: " + level)
    nextSequence()
    started = true;
  }
})


function nextSequence() {

  userClickPattern = []
  level++

  $("#level-title").text("Level: " + level)

  let randomNum = Math.floor(Math.random() * 4)
  let randomChosenColor = buttonColors[randomNum]
  gamePattern.push(randomChosenColor)
  
  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100)
  playSound(randomChosenColor);
  
}

//Highlights color on click and plays sound according to color


//stores the user's clicked button's ID into a variable for comparison
$(".btn").click(function() {
  let userChosenColor = $(this).attr("id") //e.target.nodeItem
  userClickPattern.push(userChosenColor)

  animatePress(userChosenColor)
  playSound(userChosenColor)

  checkAnswer(userClickPattern.length - 1)
})

// $(".btn").on("click", function(e) {
//   let userChosenColor = e.target.id //e.target.nodeItem
//   userClickPattern.push(userChosenColor)

//   animatePress(userChosenColor)
//   playSound(userChosenColor)

//   checkAnswer(userClickPattern.length - 1)
// })




function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3")
  audio.volume = .5
  audio.play()
}

//animator function for when a button is pressed/chosen
function animatePress(currentColor) {
  $(`.${currentColor}`).addClass("pressed")
  setTimeout(function() {
    $(`.${currentColor}`).removeClass("pressed")
  }, 100)
}



function checkAnswer(currentLevel) {

  if(gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    console.log("success!")
    if(userClickPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000)
    }
    
  } else {
    let wrongSound = new Audio("sounds/wrong.mp3")
    wrongSound.volume = .1
    wrongSound.play();
    $('body').addClass("game-over")
    setTimeout(function() {
      $('body').removeClass("game-over")
    },200)
    $("#level-title").text("Game Over! Press any key to restart the game")
    startOver();
    console.log("wrong!")
    // console.log(gamePattern)
    // console.log(userClickPattern)
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// $(":button#randomChosenColor").animate({opacity: 0.4}).animate({opacity: 1})
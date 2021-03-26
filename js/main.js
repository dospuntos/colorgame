jQuery(document).ready(function ($) {
  gameTime = 30;
  gameRunning = false;
  jQuery(".time").html("<p>Tienes " + gameTime + " segundos.</p>");
  $answer = $(".answer");

  $(".start-game").on("click", function () {
    if (!gameRunning) {
      startGame();
    }
  });

  $("form").submit(function (e) {
    e.preventDefault();
    var correctAnswer = $answer.attr("data-text");
    var answer = $answer.val();
    //alert("data-text: " + $('.answer').attr("data-text") + "\nText: " + $('.answer').val());
    checkAnswer(correctAnswer, answer);
    getColor();
  });
});

function startCounter() {
  var counter = gameTime;
  var interval = setInterval(function () {
    counter--;
    jQuery(".time").html("<p>Quedan " + counter + " segundos</p>");
    if (counter == 0) {
      gameRunning = false;
      endGame();
      clearInterval(interval);
    }
  }, 1000);
}

function getColor() {
  var colorNames = [
    "ROJO",
    "AMARILLO",
    "VERDE",
    "AZUL",
    "LILA",
    "ROSA",
    "NEGRO",
    "CAFE",
    "TURQUESA",
    "BLANCO",
    "NARANJA",
    "PLOMO",
  ];
  var color = [
    "red",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
    "black",
    "saddlebrown",
    "turquoise",
    "white",
    "orange",
    "darkgrey",
  ];

  // run this loop until numberOne is different than numberThree
  var numberOne = 0;
  var numberTwo = 0;
  do {
    numberOne = Math.floor(Math.random() * colorNames.length);
    numberTwo = Math.floor(Math.random() * colorNames.length);
  } while (numberOne === numberTwo);

  var text = colorNames[numberOne];
  var textColor = color[numberTwo];

  jQuery(".color").text(text).css("color", textColor);
  $answer.attr("data-text", colorNames[numberTwo]);

  $answer.focus().val("");
}

function checkAnswer(correctAnswer, answer) {
  if (correctAnswer.toLowerCase() == answer.toLowerCase()) {
    points++;
    return true;
  } else {
    noPoints++;
    return false;
  }
}

function startGame() {
  // Start the game and the timer
  gameRunning = true;
  points = 0;
  noPoints = 0;

  $(".start-game").attr("disabled", true);
  $answer.attr("disabled", false);
  getColor();
  startCounter();
}

function endGame() {
  jQuery(".time").html(
    `<p>Felicidades, lograste ${points} puntos.<br>
        Fallaste ${noPoints} ${noPoints !== 1 ? "veces" : "vez"}</p>
        <p><strong>Tu puntaje final es ${points - noPoints}.</strong></p>`
  );
  $answer.attr("disabled", true);
  $(".start-game").attr("disabled", false);

  // Check for new highscore
  highscores = localStorage.getItem("highscores");
  if (highscores) {
    highscores = JSON.parse(highscores);
    checkHighscores(points - noPoints, highscores);
  } else {
    createHighscore(points - noPoints);
  }
}

function checkHighscores(points, highscores) {
  var size = Object.keys(highscores).length;
  if (size < 3) {
    addHighscore(points);
  } else {
    jQuery.each(highscores, function (i, val) {
      alert(i + ", " + val);
    });
  }
}

function myFunction(item, index) {
  message += index + ":" + item + "\n";
  alert(message);
}

function addHighscore(points) {
  var name = prompt("¿Que te llamas?");
  var highscores = {
    [name]: points,
  };

  // Create new higscore array (JSON format)
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

function createHighscore(points) {
  var name = prompt("¿Que te llamas?");
  var highscores = {
    [name]: points,
  };

  // Create new higscore array (JSON format)
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

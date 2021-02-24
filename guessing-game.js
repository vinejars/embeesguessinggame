/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function shuffle(array) {
  var m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

let winningNumber = Math.floor(Math.random() * 100) + 1;
let counter = 1;
let pastGuesses = [];
console.log(
  "winning number: ",
  winningNumber,
  "playersGuess: ",
  document.querySelector("input").value
);

function checkGuess(playersGuess) {
  if (playersGuess === winningNumber && pastGuesses.length < 5) {
    document.body.style.background =
      "no-repeat radial-gradient(#92d629,#000000)";
    document.getElementById("title").style.textShadow =
      "0 0 50px #fffddc, 0 0 50px #d7fe11, 0 0 50px #e3fe11";
    return displayMessage("You Win!");
  } else if (pastGuesses.includes(playersGuess)) {
    return displayMessage("You've already guessed that number!");
  } else if (
    !pastGuesses.includes(playersGuess) &&
    playersGuess !== winningNumber &&
    pastGuesses.length < 5
  ) {
    if (counter === 1) {
      document.getElementById("guess1").textContent = playersGuess;
      counter++;
    } else if (counter === 2) {
      document.getElementById("guess2").textContent = playersGuess;
      counter++;
    } else if (counter === 3) {
      document.getElementById("guess3").textContent = playersGuess;
      counter++;
    } else if (counter === 4) {
      document.getElementById("guess4").textContent = playersGuess;
      counter++;
    } else if (counter === 5) {
      document.getElementById("guess5").textContent = playersGuess;
      counter = 0;
    }
    return differenceChecker(playersGuess);
  }
  if (pastGuesses.length === 5) {
    document.body.style.background =
      "no-repeat radial-gradient(#d63429,#000000)";
    document.getElementById("title").style.textShadow =
      "0 0 50px #fa1304, 0 0 50px #fa4604, 0 0 50px #860303";
    return displayMessage(
      `Sorry! All out of guesses. The number was ${winningNumber}!`
    );
  }
}

const differenceChecker = function (playersGuess) {
  pastGuesses.push(playersGuess);
  if (difference(playersGuess) < 10) {
    document.getElementById("title").style.textShadow =
      "0 0 50px #fa1304, 0 0 50px #fa4604";
    return displayMessage("You're burning up!");
  } else if (difference(playersGuess) < 25) {
    document.getElementById("title").style.textShadow =
      "0 0 50px #fab904, 0 0 50px #fa9404";
    return displayMessage("You're lukewarm.");
  } else if (difference(playersGuess) < 50) {
    document.getElementById("title").style.textShadow =
      "0 0 50px #04d8fa, 0 0 50px #04d8fa";
    return displayMessage("You're a bit chilly.");
  } else if (difference(playersGuess) < 100) {
    document.getElementById("title").style.textShadow =
      "0 0 50px #c6f7ff, 0 0 50px #dcfffc";
    return displayMessage("You're ice cold!");
  }
};

function playersGuessSubmission(guess) {
  if (guess < 1 || guess > 100 || typeof guess !== "number") {
    alert(`That's an invalid guess!`);
  } else {
    return checkGuess(guess);
  }
}

function difference(playersGuess) {
  if (playersGuess > winningNumber) {
    return Math.abs(playersGuess - winningNumber);
  } else {
    return Math.abs(winningNumber - playersGuess);
  }
}
const displayMessage = function (message) {
  document.getElementById("displaymssg").textContent = message;
};

document.getElementById("submitbutton").addEventListener("click", function () {
  let playersGuess = Number(document.querySelector("input").value);
  document.getElementById("guessbutton").value = "";
  return playersGuessSubmission(playersGuess);
});

document
  .getElementById("guessbutton")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      let playersGuess = Number(document.querySelector("input").value);
      document.getElementById("guessbutton").value = "";
      return playersGuessSubmission(playersGuess);
    }
  });

document
  .getElementById("playagainbutton")
  .addEventListener("click", function () {
    document.getElementById("guessbutton").value = "";
    winningNumber = Math.floor(Math.random() * 100) + 1;
    counter = 1;
    pastGuesses = [];
    document.body.style.background =
      "no-repeat, radial-gradient(#3c1050, #000000)";
    document.getElementById("title").style.textShadow =
      "0 0 40px#d1e84e, 0 0 70px #d1e84e,0 0 80px #d1e84e, 0 0 100px #d1e84e, 0 0 150px #d1e84e";
  });

document.getElementById("hintbutton").addEventListener("click", function () {
  if (counter > 3) {
    displayMessage(
      `I think it might be one of these three numbers: \n ${hintMaker().join(
        " "
      )}`
    );
  } else {
    displayMessage(`It's too early for a hint! Try again ;)`);
  }
});

const hintMaker = function () {
  let arr = [];
  arr.push(winningNumber);
  for (let i = 0; i < 2; i++) {
    let num = Math.floor(Math.random() * 100) + 1;
    console.log("num:", num);
    if (num !== winningNumber) {
      arr.push(num);
    }
  }

  shuffle(arr);
  return arr;
};

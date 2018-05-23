$(document).ready(function() {
  "use strict";

  console.log("DOM content loaded.");

  const playButton = $("#play-button");
  const hiScoresButton = $("#hi-scores-button");
  const cardStyle = $(".card-style");
  const minutesField = $("#minutes-field");
  const secondsField = $("#seconds-field");
  const movesField = $("#moves-field");
  const faStar1 = $(".fa-star").last();
  const faStar2 = $(".fa-star:eq(1)");
  const faStar3 = $(".fa-star").first();

  let seconds = 1;
  let minutes = 0;
  let tmp = 0;
  let movesCount = 0;
  let starCount = 3;

  function endGame() {
    alert("Time's up, please press the 'Restart' button or refresh the page");
  } // endGame()

  function countMoves() {

    movesCount++;

    movesField.text(`0${movesCount}`);
    //for single digits, leave the initial '0'

    if (movesCount > 9) {
      movesField.text(movesCount);
    }

    switch (movesCount) {
      case 10:
        faStar1.removeClass('fas');
        faStar1.addClass('far');
        //remove and add the FontAwesome classes for a Star
        starCount--;
        console.log(`Stars: ${starCount}`);
        break;

      case 20:
        faStar2.removeClass('fas');
        faStar2.addClass('far');
        starCount--;
        console.log(`Stars: ${starCount}`);
        break;

      default:
        break;
    } // switch statement swaps the FontAwesome star class after certain amount of moves
  } // countMoves()

  function startTime() {
    tmp = seconds + 1;
    // tmp variable used to enter if stmt when on the verge of "60 seconds" to become "1 minute 0 seconds"
    // console.log(`Minute: ${minutes}, Seconds: ${seconds}`);

    secondsField.text(`0${seconds}`);

    if (seconds > 9) {
      secondsField.text(seconds + 1);
      // increase by 1 to show visually that we are getting to 59 sec when the console stmt is already there
      // this will help with the alert message when the endGame() function is called.
    }

    seconds++;

    if (tmp === 60) {
      minutes++;
      seconds = 0;
      secondsField.text(`0${seconds}`);

      if (minutes > 9) {
        minutesField.text(minutes);
      }

      // console.log(`Statement - > Minute: ${minutes}, Seconds: ${seconds}`);
      minutesField.text(`0${minutes}`);

      if (minutes === 15) {
        setTimeout(endGame, 1000);
      } //call the endGame function to force a game reset and post an alert message to the screen
    }
  } // startTime()

  playButton.click(function() {
    let timer = setInterval(startTime, 1000);
  });

  cardStyle.on("click", countMoves);
});

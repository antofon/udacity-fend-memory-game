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
  const restartButton = $("#restart-button");

  let seconds = 1;
  let minutes = 0;
  let tmp = 0;
  let movesCount = 0;
  let starCount = 3;
  let compareMatches = [];
  let correctMatches = [];
  let score = 0;
  let timer = 0;
  // let i = 0;


// NOTE: REMOVE CONSOLE.LOG STATEMENT USED FOR DEBUGGING PURPOSES AFTER PROJECT COMPLETION

  /*
 * Create a list that holds all of your cards
 */
  let cardArray = ['fa-angular', 'fa-css3-alt', 'fa-vuejs', 'fa-react', 'fa-sass', 'fa-js-square', 'fa-angular', 'fa-html5', 'fa-node-js', 'fa-react', 'fa-css3-alt', 'fa-node-js', 'fa-vuejs', 'fa-html5', 'fa-js-square', 'fa-sass'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function restartGame() {
   clearInterval(timer);
   // re-initialize vars to initial state logically
   seconds = 1;
   minutes = 0;
   tmp = 0;
   movesCount = 0;
   starCount = 3;
   compareMatches.length = 0;
   correctMatches.length = 0;
   score = 0;
   timer = 0;
   // minutes = 0;
   // seconds = 0;
   // movesCount = 0;

   minutesField.text('00');
   secondsField.text('00');
   movesField.text('00');
   // set initial state of HTML

   displayCard(cardArray);
   // call displayCard to reshuffle cards and add the HTML to the screen

   switch (starCount) {

     case 1:
       faStar1.removeClass('far');
       faStar1.addClass('fas');
       faStar2.removeClass('far');
       faStar2.addClass('fas');
       starCount = 3;
       break;

     case 2:
       faStar1.removeClass('far');
       faStar1.addClass('fas');
       starCount = 3;
       break;

     default:
       starCount = 3;
       break;
   } // modify classes back to full stars, set count to 3
 } // restartGame()

  function endGame() {
    alert("Time's up, please press the 'Restart' button or refresh the page");
  } // endGame()

  function flipAnimation() {
    // $('body').css({"background" : "purple", "transition": ".2s all ease-in-out"});

  } // flipAnimation()


function completeGame() {
  //The below if / else if statements are for formatting purposes when the user wins the game
  if (score === 8 && minutes <= 9) {
    if (seconds <= 9) {
      // $("body").html("");
      // empty html, display congrtulations modal
      alert(`Congratulations, you've won the game!\nTime (minutes and seconds): 0${minutes}:0${seconds}.\nStar rating: ${starCount}`);
      restartGame();
    }

    else {
      // $("body").html("");
      // empty html, display congrtulations modal
      alert(`Congratulations, you've won the game!\nTime (minutes and seconds): 0${minutes}:${seconds}.\nStar rating: ${starCount}`);
      restartGame();
    }
  }

  else if (score === 8 && seconds <= 9) {
    if (minutes <= 9) {
      // $("body").html("");
      // empty html, display congrtulations modal
      alert(`Congratulations, you've won the game!\nTime (minutes and seconds): 0${minutes}:0${seconds}.\nStar rating: ${starCount}`);
      restartGame();
    }

    else {
      // $("body").html("");
      // empty html, display congrtulations modal
      alert(`Congratulations, you've won the game!\nTime (minutes and seconds): ${minutes}:0${seconds}.\nStar rating: ${starCount}`);
      restartGame();
    }
  }
}
  function checkMatch(event) {
    // go to the actual DOM element that was clicked to get the icon's class

    compareMatches.push(event.target.classList[4]);
    //store class name of elements in an array to be compared for match/no match
    setTimeout(flipAnimation, 850);
    //at 850 milliseconds, call the flipAnimation function
    console.log(compareMatches);
    if(compareMatches.length === 2) {
      if(compareMatches[0] === compareMatches[1]) {
        if($.inArray(compareMatches[0], correctMatches) !== -1 || $.inArray(compareMatches[1], correctMatches) !== -1) {
          console.log("Card has already been used");
          compareMatches.length = 0;
        } // if the cards being compared are already a matched pair, empty array to check a new pair of cards

        else {
          correctMatches.push(compareMatches[0], compareMatches[1]);

          console.log(`Card: ${compareMatches[0]}\nCard: ${compareMatches[1]}.\nCards match.`);
          console.log(`Correct matches: ${correctMatches}`);
          compareMatches.length = 0;
          //delete contents instead of assigning reference to a new array (other references untouched) and causing potential memory leaks: https://www.jstips.co/en/javascript/two-ways-to-empty-an-array/

          score++;
          console.log(`Score: ${score}`);
        } // if not, push to correctMatches array and increment score by 1


        setTimeout(completeGame, 1000);
        //call once user wins game

      } // if statement for match

      else {
        console.log(`Score: ${score}`);
        console.log(`Card: ${compareMatches[0]}\nCard: ${compareMatches[1]}.\nCards do not match.`);
        compareMatches.length = 0;
        //delete contents instead of assigning reference to a new array (other references untouched) and causing potential memory leaks: https://www.jstips.co/en/javascript/two-ways-to-empty-an-array/
      } // else statement for no match
    } // user selects two cards to be compared for a match
  } //checkMatch()


  function displayCard(cardArray) {
    shuffle(cardArray);
    $('.icon').remove();
    //remove all icon elements in the beginning so they do not keep appending off of each other upon user's click
    for(let i = 0; i < cardArray.length; i++) {
      console.log(`Index: ${i}, Class: ${cardArray[i]}`);
      $('.card-style:eq('+i+')').append(`<span class="fab fa-5x align-icon icon" id="icon-${i}"></span>`);
      $('.icon:eq('+i+')').addClass(cardArray
      [i]);
    }

    console.log('\n');
  } // displayCard()

  function countMoves() {

    movesCount++;

    movesField.text(`0${movesCount}`);
    //for single digits, leave the initial '0'

    if (movesCount > 9) {
      movesField.text(movesCount);
    }

    switch (movesCount) {
      case 25:
        faStar1.removeClass('fas');
        faStar1.addClass('far');
        //remove and add the FontAwesome classes for a Star
        starCount--;
        console.log(`Stars: ${starCount}`);
        break;

      case 35:
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
    timer = setInterval(startTime, 1000);
    displayCard(cardArray);
  });

  cardStyle.click(function() {
    checkMatch(event);
    countMoves();
  });

  restartButton.click(restartGame);
});

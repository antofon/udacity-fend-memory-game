$(document).ready(function() {
  "use strict";

  console.log("DOM content loaded.");

  const playButton = $("#play-button");
  // const hiScoresButton = $("#hi-scores-button");
  const restartButton = $("#restart-button");
  const minutesField = $("#minutes-field");
  const secondsField = $("#seconds-field");
  const movesField = $("#moves-field");
  const faStar1 = $(".fa-star").last();
  const faStar2 = $(".fa-star:eq(1)");
  const faStar3 = $(".fa-star").first();
  const cardStyle = $(".card-style");
  const animateCard = $(".animate-card");
  const blankCard = $(".blank-card");
  // const absolute = $(".absolute");
  // const flipContainer = $(".flip-container");

  // Initial States

  let seconds = 1;
  let minutes = 0;
  let tmp = 0;
  let movesCount = 0;
  let starCount = 3;
  let compareMatches = [];
  let correctMatches = [];
  let score = 0;
  let timer = 0;

  // Created list that holds all of the cards
  let cardArray = ['fa-angular', 'fa-css3-alt', 'fa-vuejs', 'fa-react', 'fa-sass', 'fa-js-square', 'fa-angular', 'fa-html5', 'fa-node-js', 'fa-react', 'fa-css3-alt', 'fa-node-js', 'fa-vuejs', 'fa-html5', 'fa-js-square', 'fa-sass'];


  // NOTE: REMOVE CONSOLE.LOG STATEMENTS USED FOR DEBUGGING PURPOSES AFTER PROJECT COMPLETION



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
} // shuffle()



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
   initialGameState();
   // Set vars back to initial state logically
   seconds = 1;
   minutes = 0;
   tmp = 0;
   movesCount = 0;
   // starCount = 3;
   compareMatches.length = 0;
   correctMatches.length = 0;
   score = 0;
   timer = 0;

   // Set initial state of HTML

   minutesField.text('00');
   secondsField.text('00');
   movesField.text('00');

   // Call function to reshuffle cards and add the HTML to the screen

   displayCard(cardArray);

   // modify classes back to full stars, set count to 3

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
   }
 } // restartGame()

  function endGame() {
    alert("Time's up, please press the 'Restart' button or refresh the page");
  } // endGame()

  // function reset () {
  //   // console.log("Cards do not match.");
  //   absolute.css("z-index", -1);
  //   flipContainer.removeClass('animated flipInY');
  //   absolute.addClass('animated flipOutY');
  //   absolute.removeClass('animated flipOutY');
  //   $(".front").html("Front");
  // }

  function flipAnimation() {
    // $('body').css({"background" : "purple", "transition": ".2s all ease-in-out"});

  } // flipAnimation()


  function completeGame() {
    //The below if / else if statements are for formatting purposes when the user wins the game
    if (score === 8 && minutes <= 9) {
      if (seconds <= 9) {
        // $("body").html("");
        // empty html, display congrtulations modal
        $('body').append(`<div class="card" style="width: 250px; height: 250px;">
        <div class="card-body">
          <p class="card-text">Congratulations, you've won the game!\nTime (minutes and seconds): 0${minutes}:0${seconds}.\nStar rating: ${starCount}</p>
          <div class="btn btn-primary" id="play-again">Play again</div>
          <div class="btn btn-primary" id="user-refresh">Refresh</div>
        </div>
      </div>`);
      const playAgain = $('#play-again');
      const userRefresh = $('#user-refresh');
      playAgain.click(restartGame);
      userRefresh.click(function(){
        return location.reload();
      });
        // alert(`Congratulations, you've won the game!\nTime (minutes and seconds): 0${minutes}:0${seconds}.\nStar rating: ${starCount}`);
        // restartGame();
      }

      else {
        // $("body").html("");
        // empty html, display congrtulations modal
        $('body').append(`<div class="card" style="width: 250px; height: 250px;">
        <div class="card-body">
          <p class="card-text">Congratulations, you've won the game!\nTime (minutes and seconds): 0${minutes}:${seconds}.\nStar rating: ${starCount}</p>
          <div class="btn btn-primary" id="play-again">Play again</div>
          <div class="btn btn-primary" id="user-refresh">Refresh</div>
        </div>
      </div>`);
      const playAgain = $('#play-again');
      const userRefresh = $('#user-refresh');
      playAgain.click(restartGame);
      userRefresh.click(function(){
        return location.reload();
      });
        // alert(`Congratulations, you've won the game!\nTime (minutes and seconds): 0${minutes}:${seconds}.\nStar rating: ${starCount}`);
        // restartGame();
      }
    }

    else if (score === 8 && seconds <= 9) {
      if (minutes <= 9) {
        // $("body").html("");
        // empty html, display congrtulations modal
        $('body').append(`<div class="card" style="width: 250px; height: 250px;">
        <div class="card-body">
          <p class="card-text">Congratulations, you've won the game!\nTime (minutes and seconds): 0${minutes}:0${seconds}.\nStar rating: ${starCount}</p>
          <div class="btn btn-primary" id="play-again">Play again</div>
          <div class="btn btn-primary" id="user-refresh">Refresh</div>
        </div>
      </div>`);
      const playAgain = $('#play-again');
      const userRefresh = $('#user-refresh');
      playAgain.click(restartGame);
      userRefresh.click(function(){
        return location.reload();
      });
        // alert(`Congratulations, you've won the game!\nTime (minutes and seconds): 0${minutes}:0${seconds}.\nStar rating: ${starCount}`);
        // restartGame();
      }

      else {
        // $("body").html("");
        // empty html, display congrtulations modal
        $('body').append(`<div class="card" style="width: 250px; height: 250px;">
        <div class="card-body">
          <p class="card-text">Congratulations, you've won the game!\nTime (minutes and seconds): ${minutes}:0${seconds}.\nStar rating: ${starCount}</p>
          <div class="btn btn-primary" id="play-again">Play again</div>
          <div class="btn btn-primary" id="user-refresh">Refresh</div>
        </div>
      </div>`);
      const playAgain = $('#play-again');
      const userRefresh = $('#user-refresh');
      playAgain.click(restartGame);
      userRefresh.click(function(){
        return location.reload();
      });
        // alert(`Congratulations, you've won the game!\nTime (minutes and seconds): ${minutes}:0${seconds}.\nStar rating: ${starCount}`);
        // restartGame();
      }
    }
  } // completeGame()


  function checkMatch(event) {
    //store class name of elements in an array to be compared for match/no match
    // absolute.css("z-index", 1);
    // flipContainer.addClass('animated flipInY');
    compareMatches.push(event.target.classList[4]);

    //at 850 milliseconds, call the flipAnimation function

    // setTimeout(flipAnimation, 850);

    console.log(compareMatches);
    if(compareMatches.length === 2) {
      movesCount += 1;
      // 1 move = user click of 2 cards (pair)
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

        // call completeGame function once user wins game

        setTimeout(completeGame, 1000);

      } // if statement for match

      else {
        console.log(`Score: ${score}`);
        console.log(`Card: ${compareMatches[0]}\nCard: ${compareMatches[1]}.\nCards do not match.`);
        compareMatches.length = 0;
        // setTimeout(reset, 2000);
        // absolute.removeClass('animated flipOutY');
        // resetFlip();

        //delete contents instead of assigning reference to a new array (other references untouched) and causing potential memory leaks: https://www.jstips.co/en/javascript/two-ways-to-empty-an-array/
      } // else statement for no match
    } // user selects two cards to be compared for a match
  } //checkMatch()


  function displayCard(cardArray) {
    // reshuffle cards before display to the screen

    shuffle(cardArray);

    //remove all icon elements in the beginning so they do not keep appending off of each other upon user's click

    $('.icon').remove();

    // add HTML for the card icon to the screen with a corresponding icon class

    for(let i = 0; i < cardArray.length; i++) {
      console.log(`Index: ${i}, Class: ${cardArray[i]}`);
      $('.card-style:eq('+i+')').append(`<span class="fab fa-4x align-icon icon" id="icon-${i}"></span>`);
      $('.icon:eq('+i+')').addClass(cardArray
      [i]);


    }



    console.log('\n');
  } // displayCard()

  function countMoves() {

    //for single digits, leave the initial '0'

    movesField.text(`0${movesCount}`);
    console.log(`Stars: ${starCount}`);
    if (movesCount > 9) {
      movesField.text(movesCount);
    }

    switch (movesCount) {
      //two clicks = 1 try. Both cases are being ran twice because (24 to case 25 = decrement starCount, case 25 to 26 = clicked again to flip) starCount initially decrements twice in both cases. Current solution only decrements the count once in each case, even though case 25 goes through two passes to get to 26
      case 25:
      if (starCount === 2) {
        // do nothing, already decremented from 3 to 2 stars
      }

      else {
        faStar1.removeClass('fas');
        faStar1.addClass('far');
        //remove and add the FontAwesome classes for a Star
        starCount--;
      }

      console.log(`Stars: ${starCount}`);
      break;

      case 35:
      if (starCount === 1) {
        // do nothing, already decremented from 2 to 1 stars
      }

      else {
        faStar2.removeClass('fas');
        faStar2.addClass('far');
        starCount--;
      }

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

  });



  cardStyle.click(function() {
    checkMatch(event);
    //prints class that user selects ultimately logging the class name clicked,
    console.log(`The class is: ${$(this).children().attr('class').split(' ')[4]}`);
    $(".fab").css("display", "block");
    blankCard.remove();
    $(this).addClass("animated flipInY slow delay-4s");

    setTimeout(function() {
      $(this).removeClass("animated flipInY slow delay-4s");
      // $(this).addClass("animated flipOutY slow delay-4s");
      
    },2000)
    countMoves();
  });

  restartButton.click(restartGame);

function flipCard () {
  // actually shuffle and display cards upon flip, might want to leave it outside function to randomize right away
$(".fab").css("display", "block");
blankCard.remove();
  animateCard.addClass("animated flipInY slow delay-4s");

}

function initialGameState() {
  $(".icon").remove();
  $("<span></span>").addClass('blank-card');
$(".fab").css("display", "none");
}

initialGameState();

blankCard.click(function() {
  displayCard(cardArray);


  // $(".fab").css("display", "none");
  // $(this).remove();

  // flipCard();
});

});

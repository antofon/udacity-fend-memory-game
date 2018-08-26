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
  let playButtonCount = 0;

  // Created list that holds all of the cards
  let cardArray = [
    'fa-angular',
    'fa-css3-alt',
    'fa-vuejs',
    'fa-react',
    'fa-sass',
    'fa-js-square',
    'fa-angular',
    'fa-html5',
    'fa-node-js',
    'fa-react',
    'fa-css3-alt',
    'fa-node-js',
    'fa-vuejs',
    'fa-html5',
    'fa-js-square',
    'fa-sass'
  ];

  // NOTE: REMOVE CONSOLE.LOG STATEMENTS USED FOR DEBUGGING PURPOSES AFTER PROJECT COMPLETION

  /*
   * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   */

   function initialGameState() {
     // $("<span class='blank-card'></span>").html();
     console.log(animateCard.children('.icon'));
     animateCard.children('.icon').remove()
     console.log(`Game at initial state: ${animateCard.children('.icon')}`);
     animateCard.append("<span class='blank-card'></span>");
     // $(".fab").css("display", "none");
   }

  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  } // shuffle()

  /* set up the event listener for a card. If a card is clicked:  - display the card's symbol (put this functionality in another function that you call from this one)  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)  - if the list already has another card, check to see if the two cards match    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one) */

  function restartGame() {
    if(timer === 0) {
      alert("No time on the clock yet, press \"Let's Play\" first!");
    } //do not restart the game if the Let's Play has never been pressed

    else {
      clearInterval(timer);
      initialGameState();
      console.log("Initial state");
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
      playButtonCount = 0;

      // Set initial state of HTML

      minutesField.text('00');
      secondsField.text('00');
      movesField.text('00');

      // Call function to reshuffle cards and display them to the screen

      shuffle(cardArray);
      // displayCard(cardArray);

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
    }

  } // restartGame()

  function endGame() {
    alert("Time's up, please press the 'Restart' button or refresh the page");
  } // endGame()

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
        userRefresh.click(function() {
          return location.reload();
        });
        // alert(`Congratulations, you've won the game!\nTime (minutes and seconds): 0${minutes}:0${seconds}.\nStar rating: ${starCount}`);
        // restartGame();
      } else {
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
        userRefresh.click(function() {
          return location.reload();
        });
        // alert(`Congratulations, you've won the game!\nTime (minutes and seconds): 0${minutes}:${seconds}.\nStar rating: ${starCount}`);
        // restartGame();
      }
    } else if (score === 8 && seconds <= 9) {
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
        userRefresh.click(function() {
          return location.reload();
        });
        // alert(`Congratulations, you've won the game!\nTime (minutes and seconds): 0${minutes}:0${seconds}.\nStar rating: ${starCount}`);
        // restartGame();
      } else {
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
        userRefresh.click(function() {
          return location.reload();
        });
        // alert(`Congratulations, you've won the game!\nTime (minutes and seconds): ${minutes}:0${seconds}.\nStar rating: ${starCount}`);
        // restartGame();
      }
    }
  } // completeGame()

  function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }

  function checkMatch(event) {
    console.log(event);
    //store class name of elements in an array to be compared for match/no match

    compareMatches.push(event);

    console.log(compareMatches);
    if (compareMatches.length === 2) {
      movesCount += 1;
      // 1 move = user click of 2 cards (pair)
      if (compareMatches[0] === compareMatches[1]) {
        if ($.inArray(compareMatches[0], correctMatches) !== -1 || $.inArray(compareMatches[1], correctMatches) !== -1) {
          console.log("Card has already been used");
          compareMatches.length = 0; // if the cards being compared are already a matched pair, empty array to check a new pair of cards

        } else {
          correctMatches.push(compareMatches[0], compareMatches[1]);
          console.log(`Card: ${compareMatches[0]}\nCard: ${compareMatches[1]}.\nCards match.`);
          console.log(`Correct matches: ${correctMatches}`);
          compareMatches.length = 0;
          //delete contents instead of assigning reference to a new array (other references untouched) and causing potential memory leaks: https://www.jstips.co/en/javascript/two-ways-to-empty-an-array/

          score++;
          var iconColor = $(".fab").css('background-color');
          //RGB value
          iconColor = rgb2hex(iconColor);
          //convert to hex

          $(".fab").css("box-shadow", `0px 0px 50px 5px ${iconColor}`);
          //access first element with fab class and applies styling to all fab classes
          console.log(`Score: ${score}`);
        } // if not, push to correctMatches array and increment score by 1

        // call completeGame function once user wins game

        setTimeout(completeGame, 1000); // if statement for match

      } else {
        console.log(`Score: ${score}`);
        console.log(`Card: ${compareMatches[0]}\nCard: ${compareMatches[1]}.\nCards do not match.`);
        compareMatches.length = 0;
        //delete contents instead of assigning reference to a new array (other references untouched) and causing potential memory leaks: https://www.jstips.co/en/javascript/two-ways-to-empty-an-array/
      } // else statement for no match
    } // user selects two cards to be compared for a match
  } //checkMatch()

  function displayCard(cardArray) {
    // reshuffle cards before display to the screen

    //remove all icon elements in the beginning so they do not keep appending off of each other upon user's click

    $('.icon').remove();

    // add HTML for the card icon to the screen with a corresponding icon class
    blankCard.remove();
    for (let i = 0; i < cardArray.length; i++) {
      // $(this).remove();
      console.log(`Index: ${i}, Class: ${cardArray[i]}`);
      $('.card-style:eq(' + i + ')').append(`<span class="fab fa-4x align-icon icon" id="icon-${i}"></span>`);
      $('.icon:eq(' + i + ')').addClass(cardArray[i]);

      // $(".fab").css("display", "block");
      // animateCard.addClass("animated flipInY slow delay-4s");
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
        } else {
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
        } else {
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

  function countTime() {
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

  function startTimer() {

    if (playButtonCount !== 1) {
      playButtonCount++;
      shuffle(cardArray);
      timer = setInterval(countTime, 1000);
      // displayCard(cardArray);

      $(".fab").css("display", "block");
    } // start game and timer if 'Let's Play' button has never been pressed

    else {
        alert("Already pressed \"Let's Play\", tick tick!");
    }
  }



/*RGB to HEX function reference from Erick Petrucelli and Zack Katz https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value*/

  function flipCard() {
    //must come first to allow the $(this) statment that accesses the class to come into play
    if(timer === 0) {
      alert("Press \"Let's Play\" to begin game.")
    } //do not flip any card if no time is on the board

    else {
      blankCard.remove();
      displayCard(cardArray);
      //prints class that user selects ultimately logging the class name clicked,
      console.log(`The class is: ${$(this).children().attr('class').split(' ')[4]}`);
      // var iconColor = $(this).children().attr('class').split(' ')[4];
      // console.log(`Icon color: ${iconColor}`);
      // var iconColor = $(this).children().attr('class').split(' ')[4];
      // console.log(iconColor.css("background-color"));
      // console.log(`Icon color: ${iconColor}`);

      $(this).addClass("animated flipInY slow delay-4s");
      // $(this).css("box-shadow", `0px 0px 50px 5px ${#D4649C}`);
      checkMatch($(this).children().attr('class').split(' ')[4]);

      // setTimeout(function() {
      //   $(this).removeClass("animated flipInY slow delay-4s");
      //    $(this).addClass("animated flipOutY slow delay-4s");
      //
      // },2000)
      countMoves();
    }
  }

  function showCard() {
    // displayCard(cardArray);
    // $(".fab").css("display", "block");

  // $(".fab").css("display", "none");
  }

  playButton.click(startTimer);
  restartButton.click(restartGame);
  cardStyle.click(flipCard);
  // blankCard.click(showCard);
  // initialGameState();
  /* function flipCard () {

  // actually shuffle and display cards upon flip, might want to leave it outside function to randomize right away
// $(".fab").css("display", "block");
// blankCard.remove();
//   animateCard.addClass("animated flipInY slow delay-4s");
//
}*/
});

$(document).ready(function() {
  console.log("DOM content loaded.");

  const playButton = $("#play-button");
  const hiScoresButton = $("#hi-scores-button");
  let minutesField = $("#minutes-field");
  let secondsField  = $("#seconds-field");
  let seconds = 1;
  let minutes = tmp = 0;

  function endGame() {
    alert("Time's up, please press the 'Restart' button or refresh the page");
  } // endGame()


  function startTime(){
    tmp = seconds + 1;
    // tmp variable used to enter if stmt when on the verge of "60 seconds" to become "1 minute 0 seconds"
    // console.log(`Minute: ${minutes}, Seconds: ${seconds}`);

    secondsField.text(`0${seconds}`);

    if(seconds > 9) {
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

      if(minutes === 15) {
        setTimeout(endGame, 1000);
      } //call the endGame function to force a game reset and post an alert message to the screen
    }
  } // startTime()

  playButton.click(function(){
    let timer = setInterval(startTime, 1000);
  });
});

$(document).ready(function() {
  console.log("DOM content loaded.");

  const playButton = $("#play-button");
  const hiScoresButton = $("#hi-scores-button");
  let minutesField = $("#minutes-field");
  let secondsField  = $("#seconds-field");
  let seconds = 1;
  let minutes = 0;

  function startTime(){

    tmp = seconds + 1;
    console.log(`Minute: ${minutes}, Seconds: ${seconds}`);

    if(seconds > 9) {
      secondsField.text(seconds + 1);
    }

    else {
      secondsField.text(`0${seconds}`);
    }

    seconds++;

    if (tmp === 60) {

      minutes++;
      seconds = 0;

      secondsField.text(`0${seconds}`);
      minutesField.text(`0${minutes}`);

      if (minutes > 9) {
        minutesField.text(minutes);
      }

      console.log(`Minute: ${minutes}, Seconds: ${seconds}`);
    }

    if(minutes === 1) {
      alert(`Time's up, please press the 'Restart' button or refresh the page.`);
    }
  }

  playButton.click(function(){
    let timer = setInterval(startTime, 100);
  });
});

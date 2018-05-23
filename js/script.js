$(document).ready(function() {
  console.log("DOM content loaded.");

  const playButton = $("#play-button");
  const hiScoresButton = $("#hi-scores-button");
  let minutesField = $("#minutes-field");
  let secondsField  = $("#seconds-field");
  let seconds = 0;
  let minutes = 0;

  function startTime(){

    seconds += 30;
    console.log(seconds);

    if(seconds < 9) {
      secondsField.text(`0${seconds}`);
    }

    else {
      secondsField.text(seconds);
    }

    if (seconds >= 60) {
      minutes+=30;
      seconds = 0;
      if (minutes < 9) {
        secondsField.text(`0${seconds}`);
        minutesField.text(`0${minutes}`);
      }

      else {
        minutesField.text(minutes);
      }


      if(minutes < 60) {
        minutesField.text(`0${minutes}`);
      }
    }
  }

  playButton.click(function(){
    let timer = setInterval(startTime, 1000);
    if(minutes > 60) {
      alert(`You have reached an hour, please press the 'Restart' button or refresh the page.`);
    }
  });
});

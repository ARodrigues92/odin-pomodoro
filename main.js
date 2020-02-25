const timerControls = document.querySelectorAll(".timer-controls");
const workTime = document.getElementById("work-time");
const display = document.getElementById("display");
const restTime = document.getElementById("rest-time");
const mediaControls = document.querySelectorAll(".media-controls");

let workTimeSelected = workTime.innerText;
let restTimeSelected = restTime.innerText;
let paused = false;
let isRestTime = false;
let isStarted = false;

timerControls.forEach ((button) => {
  button.addEventListener ("click", () => {
    if (button.value === "work-time-up"){
      workTimeSelected++;
      workTime.innerText = workTimeSelected;
      display.innerText = workTimeSelected + ":00";
    }else if (button.value === "rest-time-up"){
      restTimeSelected++;
      restTime.innerText = restTimeSelected;
    }else if (button.value === "work-time-down"){
      if (workTimeSelected > 0){
        workTimeSelected--;
        workTime.innerText = workTimeSelected;
        display.innerText = workTimeSelected + ":00";
      }
    }else if (button.value === "rest-time-down"){
      if (restTimeSelected > 0){
        restTimeSelected--;
        restTime.innerText = restTimeSelected;
      }
    }
  });
});

mediaControls.forEach ((button) => {
  button.addEventListener ("click", () => {
    if (button.value === "play"){
      play(workTimeSelected);
    }else if (button.value === "pause"){
      timer.pause();
    }else if (button.value === "stop"){
      stop ();
    }else if (button.value === "reset"){
      reset ();
    }
  });
});

function play(minutes){
  if (!paused && !isStarted){
    isStarted = true;
    timer.start(workTimeSelected  * 60);
  }else if (paused){
    timer.start(timer.totalSeconds);
  }
}

function stop(){
  paused = false;
  workTime.innerText = workTimeSelected;
  display.innerText = workTimeSelected + ":00";
  restTime.innerText = restTimeSelected;
  timer.stop();
}

function reset (){
  workTimeSelected = 25;
  restTimeSelected = 5;
  workTime.innerText = workTimeSelected;
  display.innerText = workTimeSelected + ":00";
  restTime.innerText = restTimeSelected;
}

function timers (callback, delay){
  let timerId;

  this.start = function(seconds){
    window.clearTimeout(timerId);
    timerId = window.setInterval(callback, delay);
    this.totalSeconds = seconds;
  };

  this.pause = function(){
    paused = true;
    window.clearTimeout(timerId);
  };

  this.stop = function (){
    window.clearTimeout(timerId);
  }
};

let timer = new timers(function(){
  timer.totalSeconds--;
  let minutes = Math.floor (timer.totalSeconds / 60);
  let seconds = timer.totalSeconds - (minutes * 60);
  display.textContent = (`${minutes}:${seconds}`);

  if (timer.totalSeconds === 0 && !isRestTime){
    isRestTime = true;
    timer.start(restTimeSelected * 60)
  }else if (timer.totalSeconds === 0 && isRestTime){
    isRestTime = false;
    timer.start(workTimeSelected * 60);
  }
}, 1000);



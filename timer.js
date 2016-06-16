var stopWatch = document.getElementById('timer');
var time = new Date('June 15, 2016 00:01:30');
var tick = 1000;
var intervalId;
//timer decreases time shown in stopWatch by 1000ms
//until it reaches "00:00" or less.
function timer () {
  time.setMilliseconds(time.getMilliseconds() - tick);
  var m = time.getMinutes();
  var s = time.getSeconds();
  m = checkTime(m);
  s = checkTime(s);

  if (time.getMinutes() === 0 && time.getSeconds() === 0
      || time.getMinutes() > 2) {
    stopTimer();
    gameOver();
  }

  stopWatch.innerHTML = m + ':' + s;
}
//initialises the timer and calls it every 1000ms.
function startTimer(){
  resetTimerToDefault();
  showFirstQuestion();
  intervalId = setInterval(timer, tick);
}
//resets stopWatch to the starting time
function resetTimerToDefault () {
  time = new Date('June 15, 2016 00:01:30');
  stopWatch.innerHTML = '01:30';
}
//hides the introduction or end divs and displays the first question.
function showFirstQuestion() {
  document.getElementById('intro').style.display = "none";
  document.getElementById('pass').style.display = 'none';
  document.getElementById('fail').style.display = 'none';
  document.getElementById('q1').style.display = 'block';
}
//stops the execution of the timer
function stopTimer() {
  clearInterval(intervalId);
}
//if minutes or seconds is less than 10 display in "00:00" format.
function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
}
//references to the buttons that when clicked will start the quiz
var start = document.getElementById('start');
var pass = document.getElementById('passStart');
var fail = document.getElementById('failStart');
var startButtons = [start, pass, fail];
//references to the divs that contain correct and incorrect answers
var correctAnswers = document.getElementsByClassName('correct');
var wrongAnswers = document.getElementsByClassName('wrong');
//references to the divs that contain the questions and the pass div
var questions = [];

for (i = 0; i < 6; i++) {
  if (i === 5) {
    questions.push(document.getElementById('pass').id);
  } else {
    questions.push(document.getElementById('q' + (i + 1)).id);
  }
}
//attaches a click event to an element
function attachClickEvent(elem, e) {
  elem.addEventListener('click', e, false);
}
//attaches startTimer to every start button
startButtons.forEach(function(a){
  attachClickEvent(a, startTimer);
});
//attaches addTime to every correct answer
[].forEach.call(correctAnswers, function(elem, index) {
  attachClickEvent(elem, addTime(questions[index],questions[index + 1]));
});
//attach removeTime to every incorrect answer
[].forEach.call(wrongAnswers, function(elem) {
  attachClickEvent(elem, removeTime);
});
//increases timer by four seconds and advances game to the next div.
function addTime(q, q2) {
//a closure is used to stop this function being invoked when it is
//attached to an element as an event handler.
  return function() {
    time.setMilliseconds(time.getMilliseconds() + 4000);
    document.getElementById(q).style.display = "none";
    document.getElementById(q2).style.display = "block";
    if (q2 === 'pass') {
      stopTimer();
    }
  };
}
//decreases timer by 4 seconds.
function removeTime() {
  time.setMilliseconds(time.getMilliseconds() - 4000);
}
//advances quiz to the game over div.
function gameOver() {
  questions.forEach(function(elem){
    document.getElementById(elem).style.display = "none";
  });
  document.getElementById('fail').style.display = 'block';
}

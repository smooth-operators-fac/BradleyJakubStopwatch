//refactor: date.now()

var stopWatch = document.getElementById('timer');
var time = new Date('June 15, 2016 00:02:00');
var tick = 1000;
var intervalId;

function timer () {
  time.setMilliseconds(time.getMilliseconds() - tick);

  var m = time.getMinutes();
  var s = time.getSeconds();
  m = checkTime(m);
  s = checkTime(s);

  stopWatch.innerHTML = m + ':' + s;
}

function startTimer(){
  resetToDefault();
  startQuiz();
  intervalId = setInterval(timer, tick);
}

function startQuiz() {
  document.getElementById('intro').style.display = "none";
  document.getElementById('pass').style.display = 'none';
  document.getElementById('fail').style.display = 'none';
  document.getElementById('q1').style.display = 'block';
}

function resetToDefault () {
  time = new Date('June 15, 2016 00:02:00');
  stopWatch.innerHTML = '02:00';
}

function stopTimer() {
  clearInterval(intervalId);
}

function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
}

var start = document.getElementById('start');
var pass = document.getElementById('passStart');
var fail = document.getElementById('failStart');

var buttons = [start, pass, fail];

function attachEvent(elem, e) {
  elem.addEventListener('click', e, false);
}

buttons.forEach(function(a){
  attachEvent(a, startTimer);
});

var correctAnswers = document.getElementsByClassName('correct');

var questions = [];

for (i = 0; i < 6; i++) {
  if (i === 5) {
    questions.push(document.getElementById('pass').id);
  } else {
    questions.push(document.getElementById('q' + (i + 1)).id);
  }
}
//var elems = document.querySelectorAll('div.' + colour);

[].forEach.call(correctAnswers, function(elem, index) {
  attachEvent(elem, addTime(questions[index],questions[index + 1]));
});

function addTime(q, q2) {
  return function() {
    time.setMilliseconds(time.getMilliseconds() + 4000);
    document.getElementById(q).style.display = "none";
    document.getElementById(q2).style.display = "block";
    if (q2 === 'pass') {
      stopTimer();
    }
  };
}

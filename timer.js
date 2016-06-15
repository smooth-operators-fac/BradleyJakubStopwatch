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
  intervalId = setInterval(timer, tick);
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
start.addEventListener('click', startTimer, false);

var stop = document.getElementById('stop');
stop.addEventListener('click', stopTimer, false);

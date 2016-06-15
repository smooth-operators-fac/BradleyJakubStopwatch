//refactor: fix the buttons so that they can only be clicked once.
//refactor: use setInterval not setTimeout

var time = new Date('June 15, 2016 00:30:00');
var intervalId;

function timer () {
  //time.setSeconds(time.getSeconds() + 1);
  time.setMilliseconds(time.getMilliseconds() - 10);
  //time.setMilliseconds(time.getMilliseconds() + 10);
  var h = time.getHours();
  var m = time.getMinutes();
  var s = time.getSeconds();
  var mm = time.getMilliseconds();
  //var mm = time.getMilliseconds();

  var stopWatch = document.getElementById('timer');
  stopWatch.innerHTML = h + ':' + m + ':' + s + ':' + mm;

  intervalId = setTimeout(timer, 10);
}

function stopTimer() {
  clearTimeout(intervalId);
}

var start = document.getElementById('start');
start.addEventListener('click', timer, false);

var stop = document.getElementById('stop');
stop.addEventListener('click', stopTimer, false);


////////////////////////////////////////

// var now = new Date();
// var nowS = now.getSeconds();
// var nowM = now.getMinutes();
// var nowH = now.getHours();
//
// function timer () {
//   var time = new Date();
//   var s = time.getSeconds() - nowS;
//   var m = time.getMinutes() - nowM;
//   var h = time.getHours() - nowH;
//
//   var stopClock = document.getElementById('timer');
//   stopClock.innerHTML = h + ':' + m + ':' + s;
//
//   setTimeout(timer, 1000);
// }
//
// window.addEventListener('load', timer, false);

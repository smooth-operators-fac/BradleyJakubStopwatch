//////////
timer tests
QUnit.test('testing the testing environment',
  function(assert){
    var actual = 1;
    var expected = 1;
    assert.equal(actual, expected, 'test environment is set up correctly');
});

QUnit.test('testing if the initial time environment is correct',
  function(assert){
    assert.equal(stopWatch.innerHTML, '02:00', 'correct initial time');
    assert.equal(time.getMinutes(), 2, 'correct initial date in minutes');
    assert.equal(time.getSeconds(), 0, 'correct initial date seconds');
    assert.equal(tick, 1000, 'correct initial date seconds');
});

QUnit.test('minutes decrement by 1 when seconds are 0',
  function(assert) {
    var startTime = Number(stopWatch.innerHTML.split(':')[0]);
    timer();
    var timeNow = Number(stopWatch.innerHTML.split(':')[0]);
    assert.equal(timeNow === startTime - 1, true, 'minutes decrement from 2 to 1');
});

QUnit.test('seconds decrement to 59 when seconds are 0',
  function(assert){
    stopWatch.innerHTML = "2:0";
    time = new Date('June 15, 2016 00:02:00');
    var startTime = Number(stopWatch.innerHTML.split(':')[1]);
    timer();
    var timeNow = Number(stopWatch.innerHTML.split(':')[1]);
    assert.equal(timeNow === startTime + 59, true, 'seconds decrements from 0 to 59');
});

QUnit.test('seconds continue to decrement at a regular interval after startTimer is called',
  function(assert){
    assert.expect(4);
    var done1 = assert.async();
    var done2 = assert.async();
    var done3 = assert.async();
    var done4 = assert.async();

    startTimer();
    setTimeout(function(){
      var timeNow = Number(stopWatch.innerHTML.split(':')[1]);
      assert.equal(timeNow === 59, true, 'seconds number decrements by 1 every 1000ms');
      done1();
    }, 1000);

    setTimeout(function(){
      var timeNow = Number(stopWatch.innerHTML.split(':')[1]);
      assert.equal(timeNow === 58, true, 'seconds number decrements by 1 every 1000ms');
      done2();
    }, 2000);

    setTimeout(function(){
      var timeNow = Number(stopWatch.innerHTML.split(':')[1]);
      assert.equal(timeNow === 57, true, 'seconds number decrements by 1 every 1000ms');
      done3();
      stopTimer();
    }, 3000);

    setTimeout(function(){
      var timeNow = Number(stopWatch.innerHTML.split(':')[1]);
      assert.equal(timeNow === 57, true, 'seconds stop decrementing when stopTimer is called');
      done4();
    }, 4000);
});

QUnit.test('when less than 10, seconds and minutes shown in 00:00 format',
  function(assert){
    stopWatch.innerHTML = "01:10";
    time = new Date('June 15, 2016 00:01:10');
    timer();
    var timeNow = stopWatch.innerHTML.split(':');
    assert.equal(timeNow[0] === '01', true, 'minutes shown in 00:00 format');
    assert.equal(timeNow[1] === '09', true, 'seconds shown in 00:00 format');
});

QUnit.test('when stopTimer is called, timer stops ticking',
  function(assert){
    stopWatch.innerHTML = "01:10";
    time = new Date('June 15, 2016 00:01:10');
    timer();
    var timeNow = stopWatch.innerHTML.split(':');
    assert.equal(timeNow[0] === '01', true, 'minutes shown in 00:00 format');
    assert.equal(timeNow[1] === '09', true, 'seconds shown in 00:00 format');
});

QUnit.test('when timer reaches "00:00", go to game over div',
  function(assert){
    stopWatch.innerHTML = "00:01";
    time = new Date('June 15, 2016 00:00:01');
    timer();
    var actual = questions.every(function(elem) {
      return document.getElementById(elem).style.display === "none";
    });
    assert.equal(document.getElementById('fail').style.display === 'block', true, 'game over div is shown');
    assert.equal(actual, true, 'all other divs are hidden.');
});

///////////
// DOM Tests

QUnit.test('when start buttons are clicked, show question one div',
  function(assert) {
    var intro = document.getElementById('intro');
    var q1 = document.getElementById('q1');

    startButtons.forEach(function(elem){
      intro.style.display = "block";
      q1.style.display = "none";
      elem.click();
      stopTimer();
      assert.ok(intro.style.display === 'none', true, 'intro div display is now none');
      assert.ok(q1.style.display === 'block', true, 'q1 div display is now block');
    });

    intro.style.display = "block";
    q1.style.display = "none";
});

QUnit.test('when start button #start is clicked, timer is triggered',
  function(assert){
    var done = assert.async();
    var startTime = Number(stopWatch.innerHTML.split(':')[1]);

    start.click();
    setTimeout(function(){
      var timeNow = Number(stopWatch.innerHTML.split(':')[1]);
      assert.deepEqual(timeNow === startTime + 59, true, 'startTimer function was triggered');
      stopTimer();
      done();
    }, 1000);
});

QUnit.test('when start button #passStart is clicked, timer is triggered',
  function(assert){
    var done = assert.async();
    stopWatch.innerHTML = '02:00';
    var startTime = Number(stopWatch.innerHTML.split(':')[1]);

    pass.click();
    setTimeout(function(){
      var timeNow = Number(stopWatch.innerHTML.split(':')[1]);
      assert.deepEqual(timeNow === startTime + 59, true, 'startTimer function was triggered');
      stopTimer();
      done();
    }, 1000);
});

QUnit.test('when start button #failStart is clicked, timer is triggered',function(assert){
  var done = assert.async();
  stopWatch.innerHTML = '02:00';
  var startTime = Number(stopWatch.innerHTML.split(':')[1]);

  fail.click();
  setTimeout(function(){
    var timeNow = Number(stopWatch.innerHTML.split(':')[1]);
    assert.deepEqual(timeNow === startTime + 59, true, 'startTimer function was triggered');
    stopTimer();
    done();
  }, 1000);
});

QUnit.test('when an incorrect answer is clicked, timer decreases by 4 seconds',
  function(assert){
    time.setSeconds(59);
    var seconds = time.getSeconds();

    var actual = [].every.call(wrongAnswers, function(elem) {
      elem.click();
      var secondsNow = time.getSeconds();
      seconds = seconds - 4;
      return seconds < 0 ? secondsNow === seconds + 60 : secondsNow === seconds;
    });

    assert.equal(actual, true, 'time decreased by 4 seconds');
});

QUnit.test('when a correct answer is clicked, time increases by 4 seconds',
  function(assert){
    time.setSeconds(0);
    var seconds = time.getSeconds();

    var actual = [].every.call(correctAnswers, function(elem) {
      elem.click();
      var secondsNow = time.getSeconds();
      seconds = seconds + 4;
      return secondsNow === seconds;
    });

    assert.equal(actual, true, 'time increased by 4 seconds');
});

QUnit.test('when a correct answer is clicked, the next question is displayed',
  function(assert){
    var actual = [].every.call(correctAnswers, function(elem, index) {
      var currentDiv = questions[index];
      var nextDiv = questions[index + 1];
      document.getElementById(currentDiv).style.display = "block";
      document.getElementById(nextDiv).style.display = "none";

      elem.click();
      return document.getElementById(currentDiv).style.display === "none"
          && document.getElementById(nextDiv).style.display === "block";
    });

    assert.ok(actual, true, 'the current div is hidden and next div is shown.');
});

QUnit.test('reset all variables to default',
  function(assert){
    expect(0);
    resetTimerToDefault();
    document.getElementById('intro').style.display = "block";
    questions.forEach(function(elem){
      document.getElementById(elem).style.display = "none";
    });
});

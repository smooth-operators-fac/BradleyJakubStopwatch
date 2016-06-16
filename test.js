QUnit.test('testing the testing environment', function(assert){
  var actual = 1;
  var expected = 1;
  assert.equal(actual, expected, 'test environment is set up correctly');
});

QUnit.test('testing if the initial time environment is correct', function(assert){
  assert.equal(stopWatch.innerHTML, '02:00', 'correct initial time');
  assert.equal(time.getMinutes(), 2, 'correct initial date in minutes');
  assert.equal(time.getSeconds(), 0, 'correct initial date seconds');
});

QUnit.test('minutes decrement by 1 when seconds are 0',
  function(assert) {
    var done = assert.async();
    var startTime = Number(stopWatch.innerHTML.split(':')[0]);
    timer();
    setTimeout(function(){
      var timeNow = Number(stopWatch.innerHTML.split(':')[0]);
      assert.equal(timeNow === startTime - 1, true, 'minutes decrement from 2 to 1');
      done();
    }, 1000);
  });

QUnit.test('seconds decrement to 59 when seconds are 0',
  function(assert){
    var done = assert.async();
    stopWatch.innerHTML = "2:0";
    time = new Date('June 15, 2016 00:02:00');
    var startTime = Number(stopWatch.innerHTML.split(':')[1]);
    timer();
    setTimeout(function(){
      var timeNow = Number(stopWatch.innerHTML.split(':')[1]);
      assert.equal(timeNow === startTime + 59, true, 'seconds decrements from 0 to 59');
      done();
    }, 1000);
  });
 // can make this test more clever by saying it tests that with every
 // 1000ms the function decrements it by 1.
 // this is working as it is as the function is no longer recursive. you need to refactor it
 // with recursive behaviour.
 //i.e. make a test for recursive functionality.
  QUnit.test('seconds continue to decrement with each function iteration',
    function(assert){
      assert.expect(3);
      var done1 = assert.async();
      var done2 = assert.async();
      var done3 = assert.async();
      stopWatch.innerHTML = "1:17";
      time = new Date('June 15, 2016 00:01:17');
      var startTime = Number(stopWatch.innerHTML.split(':')[1]);
      startTimer();
      setTimeout(function(){
        var timeNow = Number(stopWatch.innerHTML.split(':')[1]);
        assert.equal(timeNow === startTime - 1, true, 'seconds number decrements by 1 every 1000ms');
        done1();
      }, 1000);
      setTimeout(function(){
        var timeNow = Number(stopWatch.innerHTML.split(':')[1]);
        assert.equal(timeNow === startTime - 3, true, 'seconds number decrements by 2 every 2000ms');
        done2();
      }, 3000);
      setTimeout(function(){
        var timeNow = Number(stopWatch.innerHTML.split(':')[1]);
        assert.equal(timeNow === startTime - 8, true, 'seconds number decrements by 5 every 5000ms');
        done3();
        stopTimer();
      }, 8000);
    });

  QUnit.test('when less than 10, seconds and minutes shown in 00:00 format',
    function(assert){
      var done = assert.async();
      timer();
      setTimeout(function(){
        var timeNow = stopWatch.innerHTML.split(':');
        assert.equal(timeNow[0] === '01', true, 'minutes shown in 00:00 format');
        assert.equal(timeNow[1] === '08', true, 'seconds shown in 00:00 format');
        done();
      }, 1000);
    });


QUnit.test('reset the time variables to default', function(assert){
  expect(0);
  stopWatch.innerHTML = "02:00";
  time = new Date('June 15, 2016 00:02:00');
});

test('testing the testing environment', function(assert){
  var actual = 1;
  var expected = 1;
  assert.equal(actual, expected, 'test environment is set up correctly');
});

test('testing if the initial time value is correct', function(assert){
  var actual = stopWatch.innerHTML;
  var expected = '02:00';
  assert.equal(actual, expected, 'correct initial time');
});

test('testing if the minutes decrement when function is called', function(assert){
  var startTime = Number(stopWatch.innerHTML.split(':')[0]);
  timer();
  expect(0);
  setTimeout(function(){
    timeNow = Number(stopWatch.innerHTML.split(':')[0]);
    assert.equal(timeNow < startTime, true, 'minutes decrements after one second');
  }, 1000);
  stopTimer();
});

test('testing if the seconds decrement when function is called', function(assert){
  stopWatch.innerHTML = '01:59';
  var startTime = Number(stopWatch.innerHTML.split(':')[1]);
  timer();
  //inside setTimeout convert string into number and then
  //check that it's above the lower range of what it could be
  //with assert.ok and beneath the upper range with another
  // assert.ok
  expect(0);
  setTimeout(function(){
    timeNow = Number(stopWatch.innerHTML.split(':')[1]);
    assert.equal(timeNow < startTime, true, 'seconds decrements after one second');
  }, 1000);
  stopTimer();
});

// test('testing if the time value decrements when function is called', function(assert){
//   timer();
//   expect(0);
//   setTimeout(function(){
//     assert.equal(timePassed, , 'correct time after two second');
//   }, 2000);
// });

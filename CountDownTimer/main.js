var submit = document.querySelector('.submit');
// var ul = document.getElementById('list')
var clear;

function calculateRemainder() {
    clearInterval(clear);
    var year = Number(document.getElementById('year').value);
    var month = Number(document.getElementById('month').value);
    var day = Number(document.getElementById('day').value);
    console.log(year.toString().length, month.toString().length, day.toString().length)

    if (year.toString().length !==4 && month.toString().length !==2 && day.toString().length !==2) {
      alert('Please enter a valid date')
    } else {

    clear = setInterval (() => {
    var now = new Date();
    var future = new Date(`${month}/${day}/${year}`)
    difference = future - now;
    var miliseconds = difference;
    var timeRemaining = Math.trunc((difference) / 1000);
    var years = parseInt(timeRemaining/(86400*365));
    timeRemaining = (timeRemaining % (86400*365));
    var months = parseInt(timeRemaining/(86400*30));
    timeRemaining = (timeRemaining % (86400*30));
    var days = parseInt(timeRemaining/86400);
    timeRemaining = (timeRemaining % 86400);
    var hours = parseInt(timeRemaining/3600);
    timeRemaining = (timeRemaining % 3600);
    var minutes = parseInt(timeRemaining/60);
    timeRemaining = (timeRemaining % 60);
    var seconds = parseInt(timeRemaining);
    if (miliseconds >= 0) {
    var yearsLeft = document.getElementById('years');
    yearsLeft.innerText = `${years} years`;
    var monthsLeft = document.getElementById('months');
    monthsLeft.innerText = `${months} months`;
    var daysLeft = document.getElementById('days');
    daysLeft.innerText = `${days} days`;
    var hoursLeft = document.getElementById('hours');
    hoursLeft.innerText = `${hours} hours`;
    var minutesLeft = document.getElementById('minutes');
    minutesLeft.innerText = `${minutes} minutes`;
    var secondsLeft = document.getElementById('seconds');
    secondsLeft.innerText = `${seconds} seconds`;
    
    var leftUntil = document.getElementById('leftUntil')
    leftUntil.innerText = `left until ${month}/${day}/${year}`;

    // var TotalYears = (miliseconds / 1000 / 86400)
 }

  }, 1000);
}
}


submit.addEventListener('click', calculateRemainder)
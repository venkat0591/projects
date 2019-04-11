var hourHand = document.getElementById('hourHand');
var minuteHand = document.getElementById('minuteHand');
var secondHand = document.getElementById('secondHand');

function analogClock () {
	var date = new Date();
	var hour = date.getHours() % 12;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	console.log(hour, minute, second);

	var hourDeg = (hour * 30) + (minute * 0.5);
	var minuteDeg = (minute * 6) + (second * 0.1);
	var secondDeg = second * 6;

	hourHand.style.transform = 'rotate(' + hourDeg + 'deg)';
	minuteHand.style.transform = 'rotate(' + minuteDeg + 'deg)';
	secondHand.style.transform = 'rotate(' + secondDeg + 'deg)';

	setTimeout(analogClock, 1000);
}

analogClock()
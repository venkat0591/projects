var sst = JSON.parse(localStorage.getItem('sst')) || [];
var result = document.getElementById('result')
var fact = document.createElement('p')
fact.classList.add("fact")
var input = document.getElementById("input");

function submitNumber(e) {
	if (e.keyCode === 13 && isNaN(input.value) === true){
    	alert('Please enter a valid number between 1 and 4 digits')
    }
	else if (e.keyCode === 13 && isNaN(input.value) === false) {
    var number = input.value;
    let url = `http://numbersapi.com/${number}/year`;
    fetch(url).then(res => res.text()).then(data => {fact.innerText = data});
    input.value = "";
    result.appendChild(fact)
    }
  }

document.getElementById('input').addEventListener('keyup', submitNumber);




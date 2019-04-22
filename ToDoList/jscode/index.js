var ul = document.getElementById('list'); // get the div that will display the items
var remove = document.getElementById('removeAll'); // get the remove all button element
var textInput = document.getElementById('text'); // get the main text input element
var sst = JSON.parse(localStorage.getItem('sst')) || []; //ls 1 // will fallback to what's stored. If nothing, empty array.
var clear = [];

function handleEnter (event) {
	if (event.keyCode === 13 && textInput.value !=="") {
	sst.push({text: textInput.value, isDone: false}); // on enter, add to SST with a isDone value of "false"
	
	localStorage.setItem('sst', JSON.stringify(sst)); // ls2 // store locally
	addToDoItem(sst); // call the function that will display the list
}
	else if (event.keyCode === 13 && textInput.value ==="") {
		alert('You need to enter something.'); 		
	}
}


function addToDoItem (todos = []) { // you're replacing sst with an empty array of todos to make it dynamic
	ul.innerHTML = ""; //
	todos.forEach((todo, i) => { // basically, for each index of the todos array...
	  var li = document.createElement('li'); // create li element
	   li.setAttribute('data-id', i); // give each element a unique ID
	   li.classList.add("list"); // add a casslist to the li
	  var checkbox = document.createElement('input'); // create a new 'input' element
	  checkbox.type = "checkbox"; // make this a checkbox
	  checkbox.checked = todo.isDone; // by default, make it checked, i.e., 'isDone = true'
	  li.appendChild(checkbox); // append the checkbox to the li
	  var toDoTask = document.createElement('p'); // create a p element
	  toDoTask.textContent = todo.text; // make the text content todo.text (text was defined in handleEnter())
	  toDoTask.classList.add("limitOverflow") // just for styling so text doesn't overflow
	  li.appendChild(toDoTask); // append the todotask to the li
	  var del = document.createElement('span'); // add the X button
	  del.innerHTML = "&#10007;"; // add the icon
	  li.appendChild(del); // append the X icon to the li
	  ul.appendChild(li); // append the entire li to the ul
      text.value = ""; // then, clear the box and display placeholder
      displayRemoveAll(); //call the displayRemoveAll function
});

	document.querySelectorAll('.list').forEach(el => el.addEventListener('dblclick', editItem)); // call editItem for each list item on dblclick
	document.querySelector('.itemsLeft').innerText = `${sst.filter(t => t.isDone === false).length} Items Left`; // simple execution for items left
	document.querySelectorAll('input[type="checkbox"]').forEach(el => el.addEventListener('click', toggleTodo)); // call function when checked to switch check/ uncheck
	document.querySelectorAll('span').forEach(el => el.addEventListener('click', handleDelete)); // calls handleDelete to remove individual element
}

function displayRemoveAll () {
	if (sst.length === 0 ) {
		document.querySelector('.filter').style.display = "none"; // just removes the box if there's no item on load
	}
	else {
		document.querySelector('.filter').style.display = "inline";	// if not, displays list
	}
}

function loadItems () {
	if (sst.length !== 0) {
		addToDoItem(sst)
	}
}

function handleDelete(element) {
	let deleteItem = element.target.parentElement.dataset.id; // deletes list item
	sst.splice(deleteItem, 1); // deletes only that item
	localStorage.setItem('sst', JSON.stringify(sst)); // updates list
	addToDoItem(sst); // recreates and displays list again
}

function toggleTodo(event) { 
  sst[event.target.parentElement.dataset.id].isDone = !sst[event.target.parentElement.dataset.id].isDone; // switches selection
  addToDoItem(sst); // refreshes list
  localStorage.setItem('sst', JSON.stringify(sst)); //ls3 // stores updates to the list
}


function removeAll() {
	document.querySelector('.filter').style.display = "none"; // makes the display none
	sst = []; // cleares the entire array
	localStorage.clear();
	addToDoItem(sst); // refreshes the whole list (basically empty)
}
document.getElementById('removeAll').addEventListener('click', removeAll); // calls the function

function handleFilter(e) { 
  if (e.target.innerText === 'All tasks') { // if All tasks is clicked
    addToDoItem(sst); // displays entire list
  } else if(e.target.innerText === 'Done') { // if done is clicked
    let filtered = sst.filter(todo => todo.isDone === true); // displays filtered lisy
    addToDoItem(filtered); // refreshes and displays list again
  } else {
    let filtered = sst.filter(todo => todo.isDone !== true); // otherise, the unchecked, i.e. pending list items are selected
    addToDoItem(filtered); // refreshes and displays list
  }
}

displayRemoveAll();

// document.selectElementsByClassName('.itemsLeft').innerText = `${sst}`;

function editItem (e) {
	let input = document.createElement('input'); // created an input element
	let parent = e.target.parentElement; // targets the parent element, i.e., li
	let id = parent.dataset.id; // stores the id of this element
	input.value = sst[id].text; // the input value becomes the current text of this field
	let para = parent.children[1]; // defines a new variable, which is the child element
	parent.replaceChild(input, para); // replaces the parent element 'para' with the new input

	input.addEventListener('blur', () => { // when you click away from the input box
		sst[id].text = input.value; // the text of that li becomes the value of the input, i.e. the value that's there when clicked
		para.innerText = sst[id].text; // the innertext of the p element becomes the text (editable)
		parent.replaceChild(para, input); // the para text replaces the input text
	});
		input.addEventListener('keyup', (e) => { 
		sst[id].text = input.value; // the text of that li becomes the value of the input, i.e. the value that's there when clicked
		para.innerText = sst[id].text; // the innertext of the p element becomes the text (editable)
		if (e.keyCode === 13 && para.innerText !== "") {
		parent.replaceChild(para, input); // the para text replaces the input text

	}
});
	console.dir(parent); 
}

document.querySelectorAll('.filter ul button').forEach(el => el.addEventListener('click', handleFilter)); // calls handleFilter

// document.addEventListener('load', loadItems)

// window.addEventListener('onload', pageLoad)
document.getElementById('text').addEventListener('keyup', handleEnter); // calls the handleEnter event
// document.querySelectorAll('input[type="text"]').forEach(el => el.addEventListener('dblclick', editItem));

addToDoItem(sst);
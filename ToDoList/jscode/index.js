var ul = document.getElementById('list');
var remove = document.getElementById('removeAll');
var textInput = document.getElementById('text');
var sst = [];
var clear = [];

function handleEnter (event) {
	if (event.keyCode === 13 && textInput.value !=="") {
	sst.push({text: textInput.value, isDone: false});
	addToDoItem(sst);
}
	else if (event.keyCode === 13 && textInput.value ==="") {
		alert('You need to enter something.');
		addToDoItem(sst);
	}
}


function addToDoItem (todos = []) {
	ul.innerHTML = "";
	todos.forEach((todo, i) => {
	  var li = document.createElement('li');
	   li.setAttribute('data-id', i);
	   li.classList.add("list");
	  var checkbox = document.createElement('input');
	  checkbox.type = "checkbox";
	  checkbox.checked = todo.isDone;
	  li.appendChild(checkbox);
	  var toDoTask = document.createElement('p');
	  toDoTask.textContent = todo.text;
	  toDoTask.classList.add("limitOverflow")
	  li.appendChild(toDoTask);
	  var del = document.createElement('span');
	  del.innerHTML = "&#10007;";
	  li.appendChild(del);
	  ul.appendChild(li);
      text.value = "";
      displayRemoveAll();
});

	document.querySelectorAll('.list').forEach(el => el.addEventListener('dblclick', editItem));
	document.querySelector('.itemsLeft').innerText = `${sst.filter(t => t.isDone === false).length} Items Left`;
	document.querySelectorAll('input[type="checkbox"]').forEach(el => el.addEventListener('click', toggleTodo));
	document.querySelectorAll('span').forEach(el => el.addEventListener('click', handleDelete));
}

function displayRemoveAll () {
	if (sst.length === 0 ) {
		document.querySelector('.filter').style.display = "none";
	}
	else {
		document.querySelector('.filter').style.display = "inline";	
	}
}

function handleDelete(element) {
	let deleteItem = element.target.parentElement.dataset.id;
	sst.splice(deleteItem, 1);
	addToDoItem(sst);
}

function toggleTodo(event) { 
  sst[event.target.parentElement.dataset.id].isDone = !sst[event.target.parentElement.dataset.id].isDone;
  addToDoItem(sst); 
}


function removeAll() {
	document.querySelector('.filter').style.display = "none";
	sst = [];
	addToDoItem(sst);
}
document.getElementById('removeAll').addEventListener('click', removeAll);

function handleFilter(e) { 
  if (e.target.innerText === 'All tasks') { 
    addToDoItem(sst); 
  } else if(e.target.innerText === 'Done') { 
    let filtered = sst.filter(todo => todo.isDone === true); 
    addToDoItem(filtered); 
  } else {
    let filtered = sst.filter(todo => todo.isDone !== true); 
    addToDoItem(filtered); 
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

	input.addEventListener('blur', () => {
		sst[id].text = input.value;
		para.innerText = sst[id].text;
		parent.replaceChild(para, input);
	});
		input.addEventListener('keyup', (e) => { 
		sst[id].text = input.value;
		para.innerText = sst[id].text;
		if (e.keyCode === 13 && para.innerText !== "") {
		parent.replaceChild(para, input);

	}
});
	console.dir(parent);
}

document.querySelectorAll('.filter ul button').forEach(el => el.addEventListener('click', handleFilter));


document.getElementById('text').addEventListener('keyup', handleEnter);
// document.querySelectorAll('input[type="text"]').forEach(el => el.addEventListener('dblclick', editItem));
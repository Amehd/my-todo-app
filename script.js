//store todo items
let todoItems = [];

//function to create new todo items and render on the page

function renderTodo(todo) {
    //Store todo items into broser storage
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
    //Get reference of required elements
    const list = document.querySelector(".js-todo-list");
    const item = document.querySelector(`[data-key='${todo.id}']`);
    //Runs a  check for deleted items and update the DOM
    if (todo.deleted) {
        item.remove();
        if (todoItems.length === 0) list.innerHTML = "";
        return;
    }
    //Evaluate the done state of a todo entry
    const ischecked = todo.checked ? "done" : "";
    //create a list item that holds todo  entry
    //set  clss and data-key attribute to the todo entry
    const listItemElement = document.createElement("li");
    listItemElement.setAttribute("class", `todo-item ${ischecked}`);
    //populate the required the values
    listItemElement.setAttribute("data-key", todo.id);
    listItemElement.innerHTML = `<input id="${todo.id}" type="checkbox"/>
 <label for ="${todo.id}" class="tick js-tick"></label>
 <span>${todo.text}</span>
 <button class="delete-todo js-delete-todo">
 &times;
 </button>
 `;
    //Run the condition to append the created item to the page
    if (item) {
        list.replaceChild(listItemElement, item);
    } else {
        list.append(listItemElement);
    }

}
//Define function to create new todo entry
function addTodo(text) {
    //Define todo entry object structure
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };
    //Add new todo entry to the  array collection
    todoItems.push(todo);
    //Trigger  page update by (invoking) calling the renderTodo function
    renderTodo(todo);
}
//Get reference of the todo entry form element
const form = document.querySelector(".js-form");
//Bind an even listener on form submission 
form.addEventListener("submit", (event) => {
    //prevent default behavoiur of form submission
    event.preventDefault();
    //Get reference of the input element
    const input = document.querySelector(".js-todo-input");
    //Remove whitespace on both ends of the todo entry string
    const text = input.value.trim();
    //Check for empty value and create  todo item
    if (text !== "") {
        //Invoke addtodo function to commit change
        addTodo(text);
        //Reset the value of the input element 
        input.value = "";
        //Set focus to the input element
        input.focus();
    }
}
)
//Define fucntion to toggle the Done State of a todo entry
function toggleDone(key) {
    //Retrieve the index of the todo  entry in the collection
    const index = todoItems.findIndex((item) => item.id === Number(key));
    //Toggle the check attribute value of the todo entry
    todoItems[index].checked = !todoItems[index].checked;
    //Trigger  page update by (invoking) calling the renderTodo function
    renderTodo(todoItems[index]);
}
//Define function to delete a todo entry
function deleteTodo(key) {
    //Retrieve the index of the todo  entry in the collection
    const index = todoItems.findIndex((item) => item.id === Number(key));
    //set delete attribute to true for the todo entry
    const todo = {
        deleted: true,
        ...todoItems[index],
    };
    todoItems = todoItems.filter((item) => item.id !== Number(key));
    //Trigger  page update by (invoking) calling the renderTodo function
    renderTodo(todo);
}
//Get reference to  the UL element 
const list = document.querySelector(".js-todo-list");
//Bind click event listener  to UL element
list.addEventListener("click", (event) => {
    //Traverse the DOM to check for  the class name "js-tick" and invoke the ToggleDone function if checked, returns true
    if (event.target.classList.contains("js-tick")) {
        //Retrieve the data key attribute value 
        const itemkey = event.target.parentElement.dataset.key;
        // Invoke the ToggleDone function to upadte todo entry state
        toggleDone(itemkey);
    }
    //Traverse the DOM to check for  the class name "js-delete-todo" and invoke the deletetodo function if checked, returns true
    if (event.target.classList.contains("js-delete-todo")) {
        //Retrieve the data key attribute value 
        const itemkey = event.target.parentElement.dataset.key;
        //Invoke the deleteTodo function to delete a todo entry
        deleteTodo(itemkey);
    }
});
//Bind event listener of the DOMContentloaded to document object
document.addEventListener("DOMContentLoaded", () => {
    // Get stored todo entries from broswer local storage
    const ref = localStorage.getItem("todoItems");
    //Checked that we have entries in the local storage
    if (ref) {
        //Convert todo entries to an array collection 
        todoItems = JSON.parse(ref);
        //iterates through the collection and update the webpage
        todoItems.forEach((t) => {
            // //Trigger  page update by (invoking) calling the renderTodo function
            renderTodo(t);
        });
    }

});
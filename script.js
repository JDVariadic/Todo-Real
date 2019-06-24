

import {html,render} from './node_modules/lit-html/lit-html.js';



//const webItemList = document.getElementById("item-list")
const listAppearingOnSite = document.getElementById("item-list")
var webItemList = []
//const myTemplate = (todo) => html` <li>${todo}</li>`
var todoItems

if(localStorage.getItem("tasks")){
  todoItems = JSON.parse(localStorage.getItem("tasks"))
} else {
  todoItems = []
}

//Print existing tasks from previous sessions
todoItems.forEach(function(task) {
  addItemToFrontEnd(task)
});

//EventListener to reflect changes when adding new tasks to the list
document.getElementById("add-button").addEventListener("click", function() {
  var item = document.getElementById("add-field").value;
  todoItems.push(item)
  localStorage.setItem("tasks", JSON.stringify(todoItems))
  addItemToFrontEnd(item)
});


document.getElementById("delete-button").addEventListener("click", function() {
  todoItems = []
  localStorage.setItem("tasks", JSON.stringify(todoItems))
  webItemList = []
  render(webItemList, listAppearingOnSite)
});

function addItemToFrontEnd(item){
  //Insert HTML template here soon
  var deleteButton = document.createElement("button")
  deleteButton.innerHTML = "Delete"

  //Change id attribute of <li> in general so edit and delete can use the same point of reference.
  //Reference certain task ID using .parent() function of the deleteButton (Similar to the function deleteItem)

  deleteButton.setAttribute("id", todoItems.indexOf(item))

  deleteButton.addEventListener("click", function() {
    todoItems.splice(deleteButton.id, 1)
    this.parentNode.remove()
    localStorage.setItem("tasks", JSON.stringify(todoItems))
  });

  //Make template cleaner
  webItemList.push(html`<li>${item}${deleteButton}</li>`)
  render(webItemList, listAppearingOnSite)
}

function editItem() {

}

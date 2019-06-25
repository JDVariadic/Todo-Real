
//lit-html library
import {html,render} from './node_modules/lit-html/lit-html.js';

//Location that the list will be rendered to in the webpage
const listAppearingOnSite = document.getElementById("item-list")

//Array containing tasks in HTML format
var webItemList = []

//Acts as a middleman between the webItemList and the localStorage
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
  if(document.getElementById("add-field").value != ""){
    var item = document.getElementById("add-field").value;
    todoItems.push(item)
    localStorage.setItem("tasks", JSON.stringify(todoItems))
    addItemToFrontEnd(item)
    document.getElementById("add-field").value = ""
  }
});


document.getElementById("delete-button").addEventListener("click", function() {
  todoItems = []
  localStorage.setItem("tasks", JSON.stringify(todoItems))
  webItemList = []
  render(webItemList, listAppearingOnSite)
});

//Adding the tasks to the list and also adding the corresponding edit and delete buttons and their functions
function addItemToFrontEnd(item){
  //Insert HTML template here soon
  var deleteButton = document.createElement("button")
  deleteButton.innerHTML = "Delete"

  deleteButton.addEventListener("click", function() {
    todoItems.splice(this.parentNode.id, 1)
    this.parentNode.remove()
    localStorage.setItem("tasks", JSON.stringify(todoItems))
  });

  var editButton = document.createElement("button")
  editButton.innerHTML = "Edit"

  var editInput = document.createElement("input");
  editInput.type = "text"
  editInput.value = item

  var editConfirm = document.createElement("button")
  editConfirm.innerHTML = "Confirm"



  //Turns the innerHTML of the list item into an input box for editing tasks
  editButton.addEventListener("click", function() {
    document.getElementById(todoItems.indexOf(item)).innerHTML = ""
    document.getElementById(todoItems.indexOf(item)).appendChild(editInput)
    document.getElementById(todoItems.indexOf(item)).appendChild(editConfirm)
  });

  //Assigns the new edited task and updates the localStorage
  editConfirm.addEventListener("click", function() {
    //Acts as a reference to the index of the item
    if(editInput.value != "") {
      var index = todoItems.indexOf(item)
      todoItems[todoItems.indexOf(item)] = editInput.value
      localStorage.setItem("tasks", JSON.stringify(todoItems))
      this.parentNode.innerHTML = editInput.value
      item = editInput.value
      document.getElementById(index).appendChild(deleteButton)
      document.getElementById(index).appendChild(editButton)
    }

  });

  var listElement = html`<li id="${todoItems.indexOf(item)}">${item}${deleteButton}${editButton}</li>`
  webItemList.push(listElement)
  render(webItemList, listAppearingOnSite)
}

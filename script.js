
//lit-html library
import {html,render} from './node_modules/lit-html/lit-html.js'

//import WebComponent
import "./list-element.js"

class ListElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback(){
    var currentItem = retrieveItemWithIndex(todoItems.length - 1)
    //Associate element with id here
    this.innerHTML = currentItem
    //this.setAttribute("id", todoItems.indexOf(todoItems.length - 1))
  }

  disconnectedCallback() {
    console.log("Element removed from the DOM")
  }
}

window.customElements.define("list-element", ListElement)

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
})

//EventListener to reflect changes when adding new tasks to the list
document.getElementById("add-button").addEventListener("click", addEvt)

//Deletes all items in the list
document.getElementById("delete-button").addEventListener("click", deleteAllEvt)

//?? Move this to the callback function?
function addEvt() {
  if(document.getElementById("add-field").value != ""){
    var item = document.getElementById("add-field").value;
    todoItems.push(item)
    addItemToFrontEnd(item)
    localStorage.setItem("tasks", JSON.stringify(todoItems))
    document.getElementById("add-field").value = ""
  }
}

//Adding the tasks to the list and also adding the corresponding edit and delete buttons and their functions
//NOTE: Perhaps modify template here?
function addItemToFrontEnd(item){

  //Creates a delete button for an individual item
  var deleteButton = document.createElement("button")
  deleteButton.innerHTML = "Delete"

  //Associates an event to this button
  deleteButton.addEventListener("click", deleteItemEvt)

  //Same with the delete button, adds an individual edit button for each item
  var editButton = document.createElement("button")

  //editButton setup
  editButton.innerHTML = "Edit"

  var editInput = document.createElement("input");
  editInput.type = "text"
  editInput.value = item

  var editConfirm = document.createElement("button")
  editConfirm.innerHTML = "Confirm"

  //Turns the innerHTML of the list item into an input box for editing tasks
  editButton.addEventListener("click", editOneEvt)

  //Assigns the new edited task and updates the localStorage
  editConfirm.addEventListener("click", editTwoEvt)


  //Witout use of WebComponents
  var listElement = html`<li id="${todoItems.indexOf(item)}">${item}${deleteButton}${editButton}</li>`

  //Using WebComponents
  var testElement = html`<list-element></list-element>`

  //Push Template here, can call connectedCallback function to add the functionality
  webItemList.push(testElement)
  render(webItemList, listAppearingOnSite)
}

function deleteAllEvt() {
  todoItems = []
  localStorage.setItem("tasks", JSON.stringify(todoItems))
  webItemList = []
  render(webItemList, listAppearingOnSite)
}

function deleteItemEvt() {
  todoItems.splice(this.parentNode.id, 1)
  this.parentNode.remove()
  localStorage.setItem("tasks", JSON.stringify(todoItems))
}

function editOneEvt() {
  document.getElementById(todoItems.indexOf(item)).innerHTML = ""
  document.getElementById(todoItems.indexOf(item)).appendChild(editInput)
  document.getElementById(todoItems.indexOf(item)).appendChild(editConfirm)
}

function editTwoEvt() {
  if(editInput.value != "") {
    //Acts as a reference to the index of the item
    var index = todoItems.indexOf(item)
    todoItems[todoItems.indexOf(item)] = editInput.value
    localStorage.setItem("tasks", JSON.stringify(todoItems))
    this.parentNode.innerHTML = editInput.value
    item = editInput.value
    document.getElementById(index).appendChild(deleteButton)
    document.getElementById(index).appendChild(editButton)
  }
}

//Helper Function
function retrieveItemWithIndex(index) {
  return todoItems[index];
}

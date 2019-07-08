
//lit-html library
import {render} from './node_modules/lit-html/lit-html.js'
//import { LitElement, html } from './node_modules/lit-element/lit-element.js';
import { html, LitElement } from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module';

class ListElements extends LitElement{

  static get properties() { return {
    isInEditMode: {type: Boolean},
  };}

  constructor() {
    super();
    this.isInEditMode = false;
    this.idEditTrigger = 0;
  }
  
  render(){
    return html`
    <link rel="stylesheet" href="./style.css">
    <div class="todo-interactions">

    <h1>Todo List</h1>
      <button id="add-button" @click="${this.addEvt}">Create</button>

      <form>
        <input type="text" id="add-field" maxlength="22">
      </form>
    </div>
    <ul>
    ${todoItems.map(i => html`<li id=${todoItems.indexOf(i)}><span>${i}</span><button @click="${this.editItem}">Edit</button><button @click="${this.deleteItem}">Delete</button></li>`)}
    </ul>
    `;
  }

  checkEvtType() {
    console.log("Choosing...")
    if(this.isInEditMode == false){
      addEvt()
    } else if(this.isInEditMode == true) {
      editConfirmEvt()
    }
  }

  addEvt() {
    if(this.isInEditMode == false){
      var item = this.shadowRoot.getElementById("add-field").value;
      todoItems.push(item)
      localStorage.setItem("tasks", JSON.stringify(todoItems))
      this.shadowRoot.getElementById("add-field").value = ""
      this.requestUpdate()
    } else {
      this.shadowRoot.getElementById(this.idEditTrigger).firstChild.innerHTML = this.shadowRoot.getElementById("add-field").value
      todoItems[this.idEditTrigger] = this.shadowRoot.getElementById("add-field").value
      localStorage.setItem("tasks", JSON.stringify(todoItems))
      this.shadowRoot.getElementById("add-button").innerHTML = "Create"
      this.isInEditMode = false
    }
  }

  editItem(e) {
    this.isInEditMode = true
    this.idEditTrigger = e.target.parentNode.id
    var actualValue = e.target.parentNode.firstChild.innerHTML
    actualValue = actualValue.replace(/<!--.*?-->/sg, "")
    this.shadowRoot.getElementById("add-field").value = actualValue
    this.shadowRoot.getElementById("add-button").innerHTML = "Confirm"
  }

  deleteItem(e, listener) {
    todoItems.splice(e.target.parentNode.id, 1)
    localStorage.setItem("tasks", JSON.stringify(todoItems))
    this.requestUpdate()
  }
}
customElements.define('list-elements', ListElements);

var todoItems

if(localStorage.getItem("tasks")){
  todoItems = JSON.parse(localStorage.getItem("tasks"))
} else {
  todoItems = []
}

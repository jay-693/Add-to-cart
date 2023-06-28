import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
  databaseURL: "https://playground-123a0-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInBD = ref(database, "items")
const inputEl = document.getElementById("input-el")
const addEl = document.getElementById("add-el")
const shoppingListEl = document.getElementById("shoppinglist-el")
addEl.addEventListener("click", function() {
  let getValue = inputEl.value
  push(shoppingListInBD, getValue)
  clearInputElValue()
})
onValue(shoppingListInBD, function(snapshot) {
  if(snapshot.exists())
  {
  let getValue = Object.entries(snapshot.val())
  shoppingListEl.innerHTML = ""
  for (let i = 0; i < getValue.length; i++) {
    let things = getValue[i]
    getShoppingListInBD(things)
  }
  }
  else
  {
    shoppingListEl.innerHTML = ""
  }
})
function clearInputElValue() {
  inputEl.value = ""
}
function getShoppingListInBD(takeItems) {
  let styleId=takeItems[0]
  let styleVal=takeItems[1]
  let itemEl=document.createElement("li")
  itemEl.textContent=styleVal
  itemEl.addEventListener("dblclick",function(){
    let getItemIdshoppingListInBD=ref(database,`items/${styleId}`)
    remove(getItemIdshoppingListInBD)
  })
  shoppingListEl.append(itemEl)
}

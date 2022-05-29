//  Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".add-btn");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

//  New task
const createNewTaskElement = function(taskString) {

  const listItem = document.createElement("li");

  const checkBox = document.createElement("input");

  const label = document.createElement("label");

  const editInput = document.createElement("input");

  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = "task-label";

  listItem.className = "task";

  checkBox.type = "checkbox";
  checkBox.className = "task-cb";

  editInput.type = "text";
  editInput.className = "task-text";

  editButton.innerText = "Edit";
  editButton.className = "btn edit";

  deleteButton.className = "btn delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "remove-btn";
  deleteButtonImg.alt = "Remove button";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function() {
  console.log("Add Task...");
  //  Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  //  Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

const editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;

  const editInput = listItem.querySelector(".task-text");
  const label = listItem.querySelector(".task-label");
  const editBtn = listItem.querySelector(".edit");
  const containsClass = listItem.classList.contains("edit-task");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("edit-task");
};


const deleteTask = function() {
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
};

const taskCompleted = function() {
  console.log("Complete Task...");
  const listItem = this.parentNode;

  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function() {
  console.log("Incomplete Task...");

  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

const ajaxRequest = function() {
  console.log("AJAX Request");
};

addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  const checkBox = taskListItem.querySelector(".task-cb");
  const editButton = taskListItem.querySelector(".edit");
  const deleteButton = taskListItem.querySelector(".delete");

  //  Bind editTask to edit button.
  editButton.onclick = editTask;
  //  Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //  Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
};

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
};

// Issues with usability don't get seen until they are in front of a human tester.
//  prevent creation of empty tasks.
//  Change edit to save when you are in edit mode.
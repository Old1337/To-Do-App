let input = document.querySelector("input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}
getDataFromLocalStorage();

submit.onclick = function () {
  if (input.value !== "") {
    addTasksToArray(input.value);
    input.value = "";
  }
};
tasksDiv.addEventListener("click", (e) => {
  deleteTaskWithId(e.target.parentElement.getAttribute("data-id"));
  if (e.target.classList.contains("Del")) {
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("task")) {
    togglestatusWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});
function addTasksToArray(text) {
  const task = {
    id: Date.now(),
    title: text,
    status: false,
  };
  arrayOfTasks.push(task);

  AddTasksToPage(arrayOfTasks);
  addTasksToLocalStorage(arrayOfTasks);
}

function AddTasksToPage(arrayOfTasks) {
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let createEl = document.createElement("div");
    createEl.classList.add("task");
    createEl.setAttribute("data-id", task.id);
    let span = document.createElement("span");
    span.classList.add("Del");

    //Check If tasks are done

    if (task.status) {
      createEl.className.add("task done");
    }

    //Append Childs
    tasksDiv.appendChild(createEl);
    createEl.appendChild(document.createTextNode(task.title));
    createEl.appendChild(span);
    span.appendChild(document.createTextNode("Delete"));
  });
}
function addTasksToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    AddTasksToPage(tasks);
  }
}
function deleteTaskWithId(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTasksToLocalStorage(arrayOfTasks);
}
function togglestatusWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
}

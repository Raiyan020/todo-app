const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");

// Load saved tasks from the browser, or start with an empty list
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      tasks[index].done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const text = document.createElement("span");
    text.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✕";
    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.append(checkbox, text, deleteBtn);
    list.appendChild(li);
  });

  emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === "") return;

  tasks.push({ text: text, done: false });
  saveTasks();
  renderTasks();
  input.value = "";
});

renderTasks();
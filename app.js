// alert("weeepa"); // This is the alert that I want to show

const todoForm = document.querySelector("form"); // Form where the user writes the todo
const todoInput = document.getElementById("todo-input"); // Input where the user writes the todo
const todoListUL = document.getElementById("todo-list"); // UL where the todos will be rendered

let allTodos = getTodos(); // Array of all todos objects {id, text, completed}
updateTodoList();

todoForm.addEventListener("submit", function (e) {
  // Event listener for the form submit event
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim(); // Get the value of the input and remove the white spaces
  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false,
    };
    // If the input is not empty
    allTodos.push(todoObject); // Add the todo to the array
    updateTodoList(); // Create the todo item
    saveTodos(); // Save the todos in the local storage
    todoInput.value = ""; // Clear the input
  }
}

function updateTodoList() {
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    todoItem = createTodoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  });
}

function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex;
  const todoLI = document.createElement("li");
  const todoText = todo.text;
  todoLI.className = "todo";
  todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label class="custom-checkbox" for="${todoId}">
        <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="${todoId}" class="todo-text">${todoText}</label>
        <button class="delete-btn">
        <svg fill="var(--text-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>        
    `;
  const deleteBtn = todoLI.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });
  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos();
  });
  checkbox.checked = todo.completed;
  return todoLI;
}

function deleteTodoItem(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  const todosJSON = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJSON);
}

function getTodos() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}

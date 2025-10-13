interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let todos: Todo[] = [];
let nextTodoId = 1;

const todoInput = document.createElement('input');
todoInput.type = 'text';
todoInput.placeholder = 'Enter a new todo';

const addButton = document.createElement('button');
addButton.textContent = 'Add Todo';

const todoList = document.createElement('ul');

document.body.appendChild(todoInput);
document.body.appendChild(addButton);
document.body.appendChild(todoList);

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    const label = document.createElement('label');
    label.textContent = todo.text;
    label.style.textDecoration = todo.completed ? 'line-through' : 'none';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTodo(todo.id));

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
  });
}

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;
  const newTodo: Todo = {
    id: nextTodoId++,
    text: text,
    completed: false,
  };
  todos.push(newTodo);
  todoInput.value = '';
  renderTodos();
}

function toggleTodo(id: number) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

function deleteTodo(id: number) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

addButton.addEventListener('click', addTodo);

renderTodos();
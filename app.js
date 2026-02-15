const KEY = 'todos_v1';
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const todoListEl = document.getElementById('todoList');
const incompleteCountEl = document.getElementById('incompleteCount');
const completeCountEl = document.getElementById('completeCount');

let todos = [];

function save(){
  localStorage.setItem(KEY, JSON.stringify(todos));
}
function load(){
  try{ todos = JSON.parse(localStorage.getItem(KEY)) || []; }catch(e){ todos = []; }
}

function render(){
  todoListEl.innerHTML = '';
  let completed = 0;
  let incomplete = 0;

  todos.forEach((t, idx)=>{
    const li = document.createElement('li');
    li.className = 'todo-item';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = !!t.done;
    cb.addEventListener('change', ()=>{
      t.done = cb.checked;
      save();
      render();
    });

    const span = document.createElement('div');
    span.className = 'label' + (t.done? ' completed': '');
    span.textContent = t.text;

    const del = document.createElement('button');
    del.className = 'icon-btn delete-btn';
    del.textContent = '删除';
    del.addEventListener('click', ()=>{
      todos.splice(idx,1);
      save();
      render();
    });

    li.appendChild(cb);
    li.appendChild(span);
    li.appendChild(del);

    todoListEl.appendChild(li);

    if(t.done) completed++; else incomplete++;
  });

  incompleteCountEl.textContent = `未完成：${incomplete}`;
  completeCountEl.textContent = `已完成：${completed}`;
}

function addTask(text){
  const trimmed = text.trim();
  if(!trimmed) return;
  todos.push({text:trimmed, done:false});
  save();
  render();
}

addBtn.addEventListener('click', ()=>{
  addTask(taskInput.value);
  taskInput.value = '';
  taskInput.focus();
});

taskInput.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter'){
    addTask(taskInput.value);
    taskInput.value = '';
  }
});

// init
load();
render();

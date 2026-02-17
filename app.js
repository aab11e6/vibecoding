const KEY = 'todos_v1';
const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const todoListEl = document.getElementById('todoList');
const emptyMsgEl = document.getElementById('emptyMsg');
const incompleteCountEl = document.getElementById('incompleteCount');
const completeCountEl = document.getElementById('completeCount');

let todos = [];
let editingIdx = -1;

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

  if(todos.length === 0){
    emptyMsgEl.classList.add('show');
  } else {
    emptyMsgEl.classList.remove('show');
  }

  todos.forEach((t, idx)=>{
    const li = document.createElement('li');
    li.className = 'todo-item priority-' + (t.priority || 'mid');

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

    const editBtn = document.createElement('button');
    editBtn.className = 'icon-btn edit-btn';
    editBtn.textContent = '编辑';
    editBtn.addEventListener('click', ()=>{
      startEdit(idx);
    });

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
    li.appendChild(editBtn);
    li.appendChild(del);

    todoListEl.appendChild(li);

    if(t.done) completed++; else incomplete++;
  });

  incompleteCountEl.textContent = `未完成：${incomplete}`;
  completeCountEl.textContent = `已完成：${completed}`;
}

function addTask(text, priority){
  const trimmed = text.trim();
  if(!trimmed) return;
  if(editingIdx >= 0){
    todos[editingIdx].text = trimmed;
    todos[editingIdx].priority = priority;
    editingIdx = -1;
  } else {
    todos.push({text:trimmed, priority:priority || 'mid', done:false});
  }
  save();
  render();
}

function startEdit(idx){
  editingIdx = idx;
  taskInput.value = todos[idx].text;
  prioritySelect.value = todos[idx].priority || 'mid';
  addBtn.textContent = '💾 保存';
  taskInput.focus();
}

function cancelEdit(){
  editingIdx = -1;
  taskInput.value = '';
  prioritySelect.value = 'mid';
  addBtn.textContent = '➕ 添加任务';
}

addBtn.addEventListener('click', ()=>{
  addTask(taskInput.value, prioritySelect.value);
  cancelEdit();
});

taskInput.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter'){
    addTask(taskInput.value, prioritySelect.value);
    cancelEdit();
  }
  if(e.key === 'Escape'){
    cancelEdit();
  }
});

clearBtn.addEventListener('click', ()=>{
  todos = todos.filter(t => !t.done);
  save();
  render();
});

clearAllBtn.addEventListener('click', ()=>{
  if(confirm('确定要清空所有任务吗？此操作不可撤销。')){
    todos = [];
    save();
    render();
  }
});

// init
load();
render();

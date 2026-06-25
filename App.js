//getting variables
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const todoFilter=document.querySelector('.filter-todo')

document.addEventListener('DOMContentLoaded',function(e){
    getTodo();
})

todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
todoFilter.addEventListener("change",filterTodo);

function addTodo(e){
    e.preventDefault();

    //creating todo div
    const todoDiv=document.createElement('div');
    todoDiv.className="todo";

    //creating todo li
    const todos=document.createElement("li");
    todos.className='todo-item';
    setTodo(todoInput.value)
    todos.appendChild(document.createTextNode(todoInput.value));
    todoDiv.appendChild(todos);

    // clear input
    todoInput.value=""

    //creating complete-button
    const completeBtn=document.createElement('button')
    completeBtn.className="complete-btn";
    completeBtn.innerHTML='<i class="fas fa-check"></i>'
    todoDiv.appendChild(completeBtn);

    //creating trash button
    const trashBtn=document.createElement('button')
    trashBtn.className="trash-btn";
    trashBtn.innerHTML='<i class="fas fa-trash"></i>'
    todoDiv.appendChild(trashBtn);

    //Add todo to list
    todoList.appendChild(todoDiv);

}
function deleteCheck(e) {
    e.preventDefault();

    const item = e.target;

    // Delete
    if (item.classList.contains("trash-btn") || item.parentElement.classList.contains("trash-btn")) {
        const todo = item.closest(".todo");
        todo.classList.add("fall");

        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }

    // Complete
    if (item.classList.contains("complete-btn") || item.parentElement.classList.contains("complete-btn")) {
        const todo = item.closest(".todo");
        todo.classList.toggle("completed");
    }
}
function filterTodo(e){
    e.preventDefault();
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display="flex";
                break;
                case "completed":
                    if(todo.classList.contains("completed")){
                        todo.style.display="flex";
                    }
                    else{
                        todo.style.display="none";
                    }
                    break;
                    case "uncompleted":
                        if(!todo.classList.contains("completed")){
                            todo.style.display="flex";
                        }else{
                            todo.style.display="none";
                        }
                        break;
                        default:
                            console.log(e.target.value)
        }
    })
}
// to set todo in localStorage

function setTodo(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    //setting to localStorage
    localStorage.setItem('todos',JSON.stringify(todos))
}
function getTodo(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
       const todoDiv=document.createElement('div');
    todoDiv.className="todo";

    //creating todo li
    const todos=document.createElement("li");
    todos.className='todo-item';

    todos.appendChild(document.createTextNode(todo));
    todoDiv.appendChild(todos);

    // clear input
    todoInput.value=""

    //creating complete-button
    const completeBtn=document.createElement('button')
    completeBtn.className="complete-btn";
    completeBtn.innerHTML='<i class="fas fa-check"></i>'
    todoDiv.appendChild(completeBtn);

    //creating trash button
    const trashBtn=document.createElement('button')
    trashBtn.className="trash-btn";
    trashBtn.innerHTML='<i class="fas fa-trash"></i>'
    todoDiv.appendChild(trashBtn);

    //Add todo to list
    todoList.appendChild(todoDiv);

    })
}

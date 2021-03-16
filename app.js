const input = document.querySelector('.todo-input');
const inputButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const select = document.querySelector('.todo-select')
const alert = document.querySelector('.alert')


//Events listeners

inputButton.addEventListener('click', addNewTask);
todoList.addEventListener('click', completeDelete);

select.addEventListener('click', filterTasks)

//Function - create new task
function addNewTask(event) {
    event.preventDefault();

    if (!input.value == '') {
        //create new div for single task
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('todo-container');

        //create new task
        const newTask = document.createElement('li');
        newTask.classList.add('todo-item');
        newTask.innerText = input.value;
        taskContainer.appendChild(newTask);

        //create buttons
        const completeButton = document.createElement('button');
        completeButton.classList.add('complete-btn');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        taskContainer.appendChild(completeButton)

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        taskContainer.appendChild(deleteButton)

        todoList.appendChild(taskContainer)
        input.value = '';
        alert.innerText = '';
    } else {
        alert.innerText = 'Musisz wpisać treść zadania ..'
    }




};

//Function - check complete or delete
function completeDelete(e) {
    if (e.target.classList.contains('complete-btn')) {
        e.target.parentNode.classList.toggle('complete')
    } else if (e.target.classList.contains('delete-btn')) {
        e.target.parentNode.classList.add('delete');
        todoList.addEventListener('transitionend', () => {
            e.target.parentNode.remove();
            if (todoList.childNodes.length === 0) {
                alert.innerText = 'Brak aktywnych zadań do wykonania..'
            }
        })

    }
}

//Function - filter tasks
function filterTasks(e) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                (todo.classList.contains('complete')) ? todo.style.display = 'flex': todo.style.display = 'none';
                break;
            case 'uncompleted':
                (!todo.classList.contains('complete')) ? todo.style.display = 'flex': todo.style.display = 'none';
                break;
        }

    })
}
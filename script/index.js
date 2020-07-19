// function App(todoModel, root) {
//     this.model = todoModel;
//     this.root = root;
// }

// App.prototype.init = function() {
//     // 
// }

function renderTask(task) {
    return `
        <div class="content__block ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <div class="content__text">${task.title}</div>
            <div class="content__item">
                <span class="content__priority content__priority_${task.priority}">${task.priority} Priority</span>
                <div class="content__deadline">
                    <img class="content__label" src="public/images/label.png" alt="label">
                    <p class="content__data">${task.date}</p>
                </div>
                <div class="checkbox">
                    <label>
                        <input class="custom-checkbox" ${task.completed ? 'checked' : ''} type="checkbox">
                        <span></span>
                    </label>
                </div>
                <a class="content__link" href="#">
                    <img class="content__link-icon" src="public/images/garbage.svg" alt="trash">
                </a>
            </div>
        </div>
    `;
}

function renderTasks(tasks) {
    const tasksToRender = [];

    for (let i = 0; i < tasks.length; i++) {
        const taskHTML = renderTask(tasks[i]);

        tasksToRender.push(taskHTML);
    }

    return tasksToRender.join('');
}

const todoApp = new ToDoList([
    new Task(
        'Standup meeting with the team @5pm',
        PRIORITIES.LOW,
        '2020-07-10'
    ),
    new Task(
        'Order pizza for Granny tonight',
        PRIORITIES.MEDIUM,
        '2020-07-10'
    ),
    new Task(
        'Design, Develop and Deploy Apps to Netlify for Clients',
        PRIORITIES.HIGH,
        '2020-07-10'
    )
]);


// cписок задач
const tasksList = document.querySelector('#tasks-list');

tasksList.addEventListener('click', function(event) {
    const idAttribute = 'data-id';
    let id = event.target.getAttribute(idAttribute);

    if (!id) {
        id = event.target.closest('[data-id]').getAttribute(idAttribute);
    }

    todoApp.toggle(id);

    tasksList.innerHTML = renderTasks(todoApp.getTasksList(searchField.value));
});

tasksList.innerHTML = renderTasks(todoApp.getTasksList());

// фильтр
const searchField = document.getElementById('search');

searchField.addEventListener('input', function() {
    tasksList.innerHTML = renderTasks(todoApp.getTasksList(searchField.value));
});


// модальное окно
const modal = document.getElementById('modal');
const modalTrigger = document.getElementById('new-task');

modalTrigger.addEventListener('click', function(event) {
    event.preventDefault();

    modal.classList.add('open');
});
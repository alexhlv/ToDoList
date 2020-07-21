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
                <a class="content__link" href="#" data-action="remove">
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

function updateTasksList(filterValue) {
    const stats = todoApp.getStats();

    for (let key in stats) {
        const statHTML = document.getElementById(`stats-${key}`);

        statHTML.querySelector('span').innerText = stats[key];
    }

    tasksList.innerHTML = renderTasks(todoApp.getTasksList(filterValue));
}

tasksList.addEventListener('click', function(event) {
    const idAttribute = 'data-id';

    if (event.target.getAttribute('data-action') === 'remove' || event.target.closest('[data-action="remove"]')) {
        event.preventDefault();

        const id = event.target.closest('[data-id]').getAttribute('data-id');

        todoApp.removeTask(id);
    } else {
        let id = event.target.getAttribute(idAttribute);

        if (!id) {
            id = event.target.closest('[data-id]').getAttribute(idAttribute);
        }

        todoApp.toggle(id);
    }

    updateTasksList(searchField.value);
});

updateTasksList();

// фильтр
const searchField = document.getElementById('search');

searchField.addEventListener('input', function() {
    updateTasksList(searchField.value);
});


// модальное окно

const modalTrigger = document.getElementById('new-task');

function popupHandler(selector) {
    const modal = document.querySelector(selector);

    const controls = {
        open() {
            modal.classList.add('open');
        },
        close() {
            modal.classList.remove('open');
        }
    };

    return controls;
}

const newTaskModal = popupHandler('#modal');

modalTrigger.addEventListener('click', function(event) {
    event.preventDefault();

    newTaskModal.open();
});

document.querySelector('.modal').addEventListener('click', newTaskModal.close);

document.querySelector('.task').addEventListener('click', e => e.stopPropagation());

document.querySelector('#clear').addEventListener('click', () => {
    todoApp.clear();

    updateTasksList(searchField.value);
});

const newTaskForm = document.querySelector('#new-task-form');

newTaskForm.addEventListener('submit', function() {
    event.preventDefault();

    const formElements = newTaskForm.elements;

    todoApp.addTask(
        new Task(
            formElements.title.value,
            PRIORITIES[formElements.priority.value],
            formElements.date.value
        )
    );

    formElements.title.value = '';
    formElements.date.value = '';
    formElements.priority.value = 0;

    newTaskModal.close();
    updateTasksList(searchField.value);
});
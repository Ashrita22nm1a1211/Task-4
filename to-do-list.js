document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskEl => {
            tasks.push({
                text: taskEl.querySelector('.task-text').innerText,
                completed: taskEl.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTaskToDOM(taskText, completed = false) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        if (completed) {
            li.classList.add('completed');
        }
        taskList.appendChild(li);

        li.querySelector('.task-text').addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTasks();
        });

        li.querySelector('.edit-btn').addEventListener('click', function() {
            const newTaskText = prompt('Edit Task:', li.querySelector('.task-text').innerText);
            if (newTaskText) {
                li.querySelector('.task-text').innerText = newTaskText;
                saveTasks();
            }
        });

        li.querySelector('.delete-btn').addEventListener('click', function() {
            taskList.removeChild(li);
            saveTasks();
        });

        saveTasks();
    }

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToDOM(taskText);
            taskInput.value = '';
        }
    });

    loadTasks();
});
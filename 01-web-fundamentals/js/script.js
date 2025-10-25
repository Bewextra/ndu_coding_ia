// Basic Task Manager logic: add tasks, render list, toggle complete, delete

(function () {
    // State
    /** @type {{ id: string; title: string; description: string; completed: boolean; createdAt: string; }[]} */
    let tasks = [];

    // DOM refs
    const form = document.getElementById('task-form');
    const titleInput = document.getElementById('task-title');
    const detailsInput = document.getElementById('task-details');
    const listEl = document.getElementById('task-list');

    if (!form || !titleInput || !detailsInput || !listEl) {
        console.error('Required elements not found. Check HTML IDs.');
        return;
    }

    function generateId() {
        return Math.random().toString(36).slice(2) + Date.now().toString(36);
    }

    function formatTimestamp(isoString) {
        const date = new Date(isoString);
        const formatter = new Intl.DateTimeFormat(undefined, {
            year: 'numeric', month: 'short', day: '2-digit',
            hour: '2-digit', minute: '2-digit'
        });
        return formatter.format(date);
    }

    function createTask(title, description) {
        return {
            id: generateId(),
            title: title.trim(),
            description: description.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };
    }

    function renderTasks() {
        // Clear list
        listEl.innerHTML = '';

        for (const task of tasks) {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.dataset.taskId = task.id;

            // Checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.setAttribute('aria-label', 'Mark task complete');

            // Content
            const content = document.createElement('div');
            content.className = 'content';

            const titleEl = document.createElement('div');
            titleEl.className = 'title';
            titleEl.textContent = task.title;
            if (task.completed) titleEl.style.textDecoration = 'line-through';

            const descEl = document.createElement('div');
            descEl.className = 'description';
            descEl.textContent = task.description;

            const metaEl = document.createElement('div');
            metaEl.className = 'meta';
            metaEl.textContent = `Added ${formatTimestamp(task.createdAt)}`;

            content.appendChild(titleEl);
            if (task.description) content.appendChild(descEl);
            content.appendChild(metaEl);

            // Actions
            const actions = document.createElement('div');
            actions.className = 'actions';

            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.className = 'btn delete';
            deleteBtn.textContent = 'Delete';
            deleteBtn.setAttribute('aria-label', 'Delete task');

            actions.appendChild(deleteBtn);

            li.appendChild(checkbox);
            li.appendChild(content);
            li.appendChild(actions);

            listEl.appendChild(li);
        }
    }

    function addTaskFromForm(event) {
        event.preventDefault();
        const title = /** @type {HTMLInputElement} */ (titleInput).value;
        const description = /** @type {HTMLTextAreaElement} */ (detailsInput).value;

        if (!title || !title.trim()) {
            // Simple inline validation feedback
            /** @type {HTMLInputElement} */ (titleInput).focus();
            /** @type {HTMLInputElement} */ (titleInput).setCustomValidity('Please enter a task title');
            /** @type {HTMLInputElement} */ (titleInput).reportValidity();
            setTimeout(() => {
                /** @type {HTMLInputElement} */ (titleInput).setCustomValidity('');
            }, 1500);
            return;
        }

        const newTask = createTask(title, description);
        tasks.push(newTask);
        renderTasks();

        // Reset form
        /** @type {HTMLFormElement} */ (form).reset();
        /** @type {HTMLInputElement} */ (titleInput).focus();
    }

    function handleListInteraction(event) {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        // Find parent li
        const li = target.closest('li.task-item');
        if (!li) return;
        const taskId = li.dataset.taskId;
        if (!taskId) return;

        const index = tasks.findIndex(t => t.id === taskId);
        if (index === -1) return;

        if (target.matches('input[type="checkbox"]')) {
            tasks[index].completed = /** @type {HTMLInputElement} */ (target).checked;
            renderTasks();
            return;
        }

        if (target.matches('button.delete')) {
            tasks.splice(index, 1);
            renderTasks();
            return;
        }
    }

    // Event listeners
    form.addEventListener('submit', addTaskFromForm);
    listEl.addEventListener('click', handleListInteraction);
    listEl.addEventListener('change', handleListInteraction);

    // Initial render
    renderTasks();
})();

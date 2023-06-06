// Проекты
let projects = [];

// Текущий проект
let currentProject = null;

// Получение проектов из localStorage
function getProjectsFromLocalStorage() {
  const projectsData = localStorage.getItem('projects');
  const currentProjectId = localStorage.getItem('currentProjectId');

  if (projectsData) {
    projects = JSON.parse(projectsData);
  } else {
    projects = [];
  }

  // Проверка наличия сохраненного идентификатора текущего проекта
  if (currentProjectId) {
    currentProject = projects.find(project => project.id === currentProjectId);
  } else {
    currentProject = null;
  }
}


// Сохранение проектов в localStorage
function saveProjectsToLocalStorage() {
  localStorage.setItem('projects', JSON.stringify(projects));
  localStorage.setItem('currentProjectId', currentProject ? currentProject.id : null); // Здесь изменение ключа на 'currentProjectId' и сохранение идентификатора текущего проекта
}


// Создание заголовка проекта внутри доски
const board = document.querySelector('.project-board');
const projectTitle = document.createElement('h2');

// Получение заголовка проекта из localStorage
function getProjectTitleFromLocalStorage() {
  const projectTitleData = localStorage.getItem('projectTitle');
  if (projectTitleData) {
    projectTitle.innerText = projectTitleData;
  }
}

// Сохранение заголовка проекта в localStorage
function saveProjectTitleToLocalStorage() {
  localStorage.setItem('projectTitle', projectTitle.innerText);
}

// Обновление заголовка проекта
function updateProjectTitle(name) {
  projectTitle.innerText = name;
  saveProjectTitleToLocalStorage();
}

// Добавляем заголовок проекта в доску при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  getProjectTitleFromLocalStorage();
  board.prepend(projectTitle);
});

// Добавить обработчик двойного клика на заголовок проекта
projectTitle.addEventListener('dblclick', () => {
  const newProjectName = prompt('Введите новое название проекта:', projectTitle.innerText);
  if (newProjectName) {
    updateProjectTitle(newProjectName);
    currentProject.name = newProjectName;
    saveProjectsToLocalStorage();
  }
});

// Создание проекта
function createProject(name) {
  const newProject = {
    id: `project-${Date.now()}`,
    name: name,
    kanban: {
      columns: ['new-column', 'in-progress-column', 'completed-column'],
      tasks: {}
    }
  };

  projects.push(newProject);
  saveProjectsToLocalStorage();
  setCurrentProject(newProject);
  updateProjectList();
  updateColumns();
  updateProjectTitle(name);
}

// Добавляем обработчик двойного клика на название проекта в списке проектов
projectTitle.addEventListener('dblclick', () => {
  const newProjectName = prompt('Введите новое название проекта:', project.name);
  if (newProjectName) {
    project.name = newProjectName;
    updateProjectList();
    updateProjectTitle(newProjectName);
    saveProjectsToLocalStorage();
  }
});





function setCurrentProject(project) {
  currentProject = project;
  columns = project.kanban.columns;
  tasks = project.kanban.tasks;
  saveColumnsToLocalStorage();
  saveTasksToLocalStorage();
  saveProjectsToLocalStorage();
  updateColumns();

  // Сохранение идентификатора текущего проекта в localStorage
  localStorage.setItem('currentProjectId', project.id);





// Обработчик клика на кнопку "Создать проект"
function handleCreateProjectClick() {
  const projectName = prompt('Введите название проекта:');
  if (projectName) {
    createProject(projectName);
  }
}

// Обновление списка проектов
function updateProjectList() {
  const projectList = document.getElementById('project-list');
  projectList.innerHTML = '';

  for (const project of projects) {
    const projectItem = document.createElement('li');
    projectItem.innerText = project.name;
    projectItem.addEventListener('click', () => {
      setCurrentProject(project);

      // Добавление класса "active" к выбранному проекту
      const activeProjectItem = document.querySelector('li.active');
      if (activeProjectItem) {
        activeProjectItem.classList.remove('active');
      }
      projectItem.classList.add('active');
    });

    projectList.appendChild(projectItem);
  }
}



// Добавляем обработчик клика на кнопку "Создать проект"
const createProjectBtn = document.getElementById('create-project-btn');
createProjectBtn.addEventListener('click', handleCreateProjectClick);





// Колонки
let columns = [];

// Задачи
let tasks = [];

// Получение колонок из localStorage
function getColumnsFromLocalStorage() {
  const columnsData = localStorage.getItem('columns');
  if (columnsData) {
    columns = JSON.parse(columnsData);
  } else {
    columns = ['new-column', 'in-progress-column', 'completed-column'];
  }
}

// Сохранение колонок в localStorage
function saveColumnsToLocalStorage() {
  localStorage.setItem('columns', JSON.stringify(columns));
}


// Обновление колонок
function updateColumns() {
  const board = document.querySelector('.board');
  board.innerHTML = '';

  for (const columnId of columns) {
    const column = createColumn(columnId);
    board.appendChild(column);

    const tasksContainer = column.querySelector('.tasks');
    tasksContainer.innerHTML = ''; // Очистка контейнера задач

    for (const taskId in tasks) {
      if (tasks.hasOwnProperty(taskId) && tasks[taskId].column === columnId) {
        addTaskToColumn(taskId, columnId);

        // Добавляем обработчик клика на задачу для открытия в новой вкладке
        const taskElement = document.getElementById(taskId);
        taskElement.addEventListener('click', () => {
          openTaskInNewTab(taskId);
        });
      }
    }
  }

  saveColumnsToLocalStorage(); // Сохранение колонок в localStorage
}




// Создание колонки
function createColumn(columnId) {
  const column = document.createElement('div');
  column.classList.add('column');
  column.id = columnId;
 column.innerHTML = `
  <h3 data-column-id="${columnId}">${getColumnTitle(columnId)}</h3>
  <div class="tasks"></div>
`;

  return column;
}

// Получение заголовка колонки по идентификатору
function getColumnTitle(columnId) {
  if (columnId === 'new-column') {
    return 'Новые';
  } else if (columnId === 'in-progress-column') {
    return 'В работе';
  } else if (columnId === 'completed-column') {
    return 'Завершенные';
  } else {
    const taskData = tasks[columnId];
    return taskData && taskData.columnName ? taskData.columnName : columnId;
  }
}



// Получение задач из localStorage
function getTasksFromLocalStorage() {
  const tasksData = localStorage.getItem('tasks');
  if (tasksData) {
    tasks = JSON.parse(tasksData);
  } else {
    tasks = {};
  }
}

// Сохранение задач в localStorage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Создание задачи
function createTaskElement(taskId, taskName, dueDate, label, description) {
  const task = document.createElement('div');
  task.classList.add('task');
  task.id = taskId;
  task.draggable = true;
  task.addEventListener('dragstart', dragStart);

  const formattedDueDate = dueDate ? formatDate(dueDate) : 'Нет срока';

  task.innerHTML = `
    <span class="due-date">
      <i class="material-icons">calendar_today</i>
      ${formattedDueDate}
    </span>
    <h4>${taskName}</h4>
  `;

  task.setAttribute('oncontextmenu', `showContextMenu(event, '${taskId}')`);

  if (label) {
    const labelElement = document.createElement('span');
    labelElement.classList.add('label');
    labelElement.innerText = label;

    const taskData = tasks[taskId];

    if (taskData && taskData.labelColor) {
      labelElement.style.backgroundColor = taskData.labelColor;
    }

    task.appendChild(labelElement);
  }

  // Добавляем описание задачи
  task.dataset.description = description;

  return task;
}



// Функция для форматирования даты в формат "число кратко наименование месяца, год"
function formatDate(dateString) {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', options);
}



// Добавление задачи в колонку
function addTaskToColumn(taskId, columnId) {
  const column = document.getElementById(columnId);
  const tasksContainer = column.querySelector('.tasks');
  const task = createTaskElement(taskId, tasks[taskId].name, tasks[taskId].dueDate, tasks[taskId].label, tasks[taskId].labelColor);
  tasksContainer.appendChild(task);
}

// Функция для открытия задачи в новой вкладке
function openTaskInNewTab(taskId) {
  const taskData = tasks[taskId];

  const url = `task-details.html?taskId=${taskId}&taskName=${encodeURIComponent(taskData.name)}&dueDate=${encodeURIComponent(taskData.dueDate)}&label=${encodeURIComponent(taskData.label)}&description=${encodeURIComponent(taskData.description)}`;
  window.open(url, '_blank');
}

// Обработчик клика на кнопку "Создать задачу"
function handleCreateTaskClick() {
  openCreateTaskModal();
}

// Открытие модального окна создания задачи
function openCreateTaskModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}

// Закрытие модального окна создания задачи
function closeCreateTaskModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  document.querySelectorAll('#modal input').forEach(input => input.value = '');
}


// Обработчик клика на кнопку "Отмена" модального окна создания задачи
function handleCancelTaskModalClick() {
  closeCreateTaskModal();
}

function handleCreateTaskModalClick() {
  const taskInput = document.getElementById('task-name-input');
  const dueDateInput = document.getElementById('due-date-input');
  const labelInput = document.getElementById('label-input');
  const colorInput = document.getElementById('color-input');
  const descriptionInput = document.getElementById('description-input'); // Добавлено описание задачи

  const taskName = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const label = labelInput.value.trim();
  const color = colorInput.value;
  const description = descriptionInput.value.trim(); // Получаем значение описания задачи

  if (taskName !== '') {
    const taskId = `task-${Date.now()}`;
    tasks[taskId] = {
      name: taskName,
      column: 'new-column',
      dueDate: dueDate,
      label: label,
      labelColor: color,
      description: description // Добавляем описание в объект задачи
    };
    saveTasksToLocalStorage();
    addTaskToColumn(taskId, 'new-column');
    taskInput.value = '';
    dueDateInput.value = '';
    labelInput.value = '';
    colorInput.value = '';
    descriptionInput.value = ''; // Очищаем поле ввода описания
    closeCreateTaskModal();
  }
}





// Обработчик события начала перетаскивания задачи
function dragStart(event) {
  const taskId = event.target.id;
  event.dataTransfer.setData('text/plain', taskId);
}

// Обработчик события бросания задачи в колонку
function drop(event) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData('text/plain');
  const column = event.target.closest('.column'); // Найти ближайшую колонку
  if (column) {
    const columnId = column.id;
    const previousColumnId = tasks[taskId].column; // Получить предыдущую колонку задачи
    tasks[taskId].column = columnId; // Обновить колонку задачи
    saveTasksToLocalStorage();
    if (previousColumnId !== columnId) {
      const previousColumn = document.getElementById(previousColumnId);
      const task = document.getElementById(taskId);
      previousColumn.querySelector('.tasks').removeChild(task); // Удалить задачу из предыдущей колонки
      addTaskToColumn(taskId, columnId); // Добавить задачу в новую колонку
    }
  }
}

// Обработчик события разрешения бросания задачи
function allowDrop(event) {
  event.preventDefault();
}

// Обработчик клика на кнопку "Добавить колонку"
function handleAddColumnClick() {
  openCreateColumnModal();
}


// Открытие модального окна создания колонки
function openCreateColumnModal() {
  const modal = document.getElementById('column-modal');
  modal.style.display = 'block';
}

// Закрытие модального окна создания колонки
function closeCreateColumnModal() {
  const modal = document.getElementById('column-modal');
  modal.style.display = 'none';
}


// Обработчик клика на кнопку "Отмена" модального окна создания колонки
function handleCancelColumnModalClick() {
  closeCreateColumnModal();
}

// Обработчик клика на кнопку "Создать колонку" в модальном окне
function handleCreateColumnModalClick() {
  const columnInput = document.getElementById('column-input');
  const columnName = columnInput.value.trim();
  if (columnName !== '') {
    const newColumnId = `column-${columns.length}`;
    columns.push(newColumnId);
    saveColumnsToLocalStorage();
    updateColumns();
    columnInput.value = '';
    closeCreateColumnModal();
    
    const columnTitle = document.querySelector(`h3[data-column-id="${newColumnId}"]`);
    columnTitle.innerText = columnName;

    tasks[newColumnId] = { columnName: columnName };
    saveTasksToLocalStorage();
  }
}

// Открытие модального окна редактирования задачи
function openEditTaskModal(taskId) {
  const taskData = tasks[taskId];
  const editTaskNameInput = document.getElementById('edit-task-name-input');
  const editDueDateInput = document.getElementById('edit-due-date-input');
  const editLabelInput = document.getElementById('edit-label-input');
  const editColorInput = document.getElementById('edit-color-input');
  const editDescriptionInput = document.getElementById('edit-description-input'); // Добавлено поле ввода описания


  editTaskNameInput.value = taskData.name;
  editDueDateInput.value = taskData.dueDate;
  editLabelInput.value = taskData.label;
  editColorInput.value = taskData.labelColor;
  editDescriptionInput.value = taskData.description ? taskData.description : ''; // Устанавливаем значение описания


  const saveTaskBtn = document.getElementById('save-task-btn');
  saveTaskBtn.addEventListener('click', () => {
    updateTask(taskId, {
      name: editTaskNameInput.value,
      dueDate: editDueDateInput.value,
      label: editLabelInput.value,
      labelColor: editColorInput.value
    });
    closeEditTaskModal();
  });

  const cancelEditTaskBtn = document.getElementById('cancel-edit-task-btn');
  cancelEditTaskBtn.addEventListener('click', () => {
    closeEditTaskModal();
  });

  const editTaskModal = document.getElementById('edit-task-modal');
  editTaskModal.style.display = 'block';
}

// Закрытие модального окна редактирования задачи
function closeEditTaskModal() {
  const editTaskModal = document.getElementById('edit-task-modal');
  editTaskModal.style.display = 'none';
}

// Обновление атрибутов задачи
function updateTask(taskId, updatedTaskData) {
  tasks[taskId] = { ...tasks[taskId], ...updatedTaskData };
  saveTasksToLocalStorage();
  updateColumns();
}

// Показ контекстного меню
function showContextMenu(event, taskId) {
  event.preventDefault();

  const contextMenu = document.getElementById('context-menu');
  contextMenu.style.display = 'block';
  contextMenu.style.left = `${event.clientX}px`;
  contextMenu.style.top = `${event.clientY}px`;

  const editMenuItem = document.getElementById('edit-menu-item');
  editMenuItem.setAttribute('onclick', `openEditTaskModal('${taskId}')`);

  const deleteMenuItem = document.getElementById('delete-menu-item');
  deleteMenuItem.setAttribute('onclick', `deleteTask('${taskId}')`);

  const removeContextMenu = () => {
    contextMenu.style.display = 'none';
    document.removeEventListener('click', removeContextMenu);
  };

  document.addEventListener('click', removeContextMenu);
}

// Удаление задачи
function deleteTask(taskId) {
  delete tasks[taskId];
  saveTasksToLocalStorage();
  updateColumns();
}


// Инициализация приложения
function init() {
  getProjectsFromLocalStorage();
  getColumnsFromLocalStorage();
  getTasksFromLocalStorage();
  updateColumns();
  updateProjectList();

  if (projects.length > 0) {
    setCurrentProject(projects[0]);
  } else {
    createProject('Новый проект');
  }

  updateColumns();


  const addColumnBtn = document.getElementById('add-column-btn');
  addColumnBtn.addEventListener('click', handleAddColumnClick);

  const createTaskBtn = document.getElementById('create-task-btn');
  createTaskBtn.addEventListener('click', handleCreateTaskClick);

  const createColumnModalBtn = document.getElementById('create-column-modal-btn');
  createColumnModalBtn.addEventListener('click', handleCreateColumnModalClick)

  const createTaskModalBtn = document.getElementById('create-task-modal-btn');
  createTaskModalBtn.addEventListener('click', handleCreateTaskModalClick);

  const cancelTaskModalButton = document.getElementById('cancel-task-modal-btn');
  cancelTaskModalButton.addEventListener('click', handleCancelTaskModalClick);

  const cancelColumnModalButton = document.getElementById('cancel-column-modal-btn');
  cancelColumnModalButton.addEventListener('click', handleCancelColumnModalClick);


  const board = document.querySelector('.board');
  board.addEventListener('drop', drop);
  board.addEventListener('dragover', allowDrop);
}

init();

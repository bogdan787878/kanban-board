// Получение параметров задачи из URL
function getTaskParametersFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get('id');
  const taskName = urlParams.get('name');
  const taskStatus = urlParams.get('status');

  return { id: taskId, name: taskName, status: taskStatus };
}

// Отображение параметров задачи
function showTaskDetails() {
  const taskDetailsContainer = document.getElementById('task-details');
  const task = getTaskParametersFromURL();

  if (task) {
    const taskElement = document.createElement('div');
    taskElement.textContent = `ID: ${task.id}, Name: ${task.name}, Status: ${task.status}`;
    taskDetailsContainer.appendChild(taskElement);
  }
}

// Вызов функции отображения параметров задачи
showTaskDetails();

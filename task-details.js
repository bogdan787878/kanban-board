window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get('taskId');
  const taskName = urlParams.get('taskName');
  const dueDate = urlParams.get('dueDate');
  const label = urlParams.get('label');
  const description = urlParams.get('description');

  const taskDetails = document.getElementById('task-details');
  taskDetails.innerHTML = `
    <h1>${taskName}</h1>
    <p><strong></strong> ${label}</p>
    <p><strong>Срок исполнения:</strong> ${dueDate}</p>
    <p><strong>Описание:</strong> ${description}</p>
  `;
});

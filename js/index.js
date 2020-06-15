function searchTasks() {
  let searchText = document.getElementById('searchText').value;
  if (searchText.trim()) {
    let filteredTasks = findTasksByName(searchText.trim());
    showTasks(filteredTasks);
  }
}

function search(event) {
  if (event.keyCode === 13) {
    searchTasks();
  }
}

function filterTasksByStatus(status) {
  switch (status) {
    case 'All':
    default:
      showAllTasks();
      break;
    case 'Active':
    case 'Padding':
    case 'Closed':
      showTasks(findTasksByStatus(status));
      break;
  }
}

function showStatisticesCards() {
  let allTasksCount = getAllTasks().length;
  document.getElementById('allTasksCount').textContent = allTasksCount;
  let activeTasksCount = tasks.filter((task) => task.status === 'Active')
    .length;
  document.getElementById('activeTasksCount').textContent = activeTasksCount;
  let activeTasksProportion =
    allTasksCount > 0
      ? Math.round((activeTasksCount / allTasksCount) * 100) + '%'
      : '0%';
  document.getElementById(
    'activeTasksProportion'
  ).textContent = activeTasksProportion;
  let paddingTasksCount = tasks.filter((task) => task.status === 'Padding')
    .length;
  document.getElementById('paddingTasksCount').textContent = paddingTasksCount;
  let paddingTasksProportion =
    allTasksCount > 0
      ? Math.round((paddingTasksCount / allTasksCount) * 100) + '%'
      : '0%';
  document.getElementById(
    'paddingTasksProportion'
  ).textContent = paddingTasksProportion;
  let closedTasksCount = tasks.filter((task) => task.status === 'Closed')
    .length;
  document.getElementById('closedTasksCount').textContent = closedTasksCount;
  let closedTasksProportion =
    allTasksCount > 0
      ? Math.round((closedTasksCount / allTasksCount) * 100) + '%'
      : '0%';
  document.getElementById(
    'closedTasksProportion'
  ).textContent = closedTasksProportion;
}

function showAllTasks() {
  saveAllTasks(tasks);
  renderPage();
}

function renderPage() {
  showStatisticesCards();
  showTasks(getAllTasks());
}

function showTasks(tasks) {
  let taskBody = document.getElementById('taskbody');
  taskBody.innerHTML = '';
  console.log(tasks);
  if (tasks && tasks.length > 0) {
    tasks.forEach((task, index) => {
      let li = generateTaskElement(task, index + 1);
      taskBody.appendChild(li);
    });
  }
}

function generateTaskElement(task, index) {
  let li = document.createElement('li');
  li.classList.add('task-line');
  let indexElement = document.createElement('span');
  indexElement.classList.add('task-num-col');
  indexElement.textContent = index;
  li.appendChild(indexElement);

  let nameElement = document.createElement('span');
  nameElement.classList.add('task-name-col');
  nameElement.textContent = task.name;
  li.appendChild(nameElement);

  let desElement = document.createElement('span');
  desElement.classList.add('task-desc-col');
  desElement.textContent = task.description;
  li.appendChild(desElement);

  let deadlineElement = document.createElement('span');
  deadlineElement.classList.add('task-deadline-col');
  deadlineElement.textContent = task.deadline;
  li.appendChild(deadlineElement);

  let statusElement = document.createElement('span');
  statusElement.classList.add('task-status-col');
  switch (task.status) {
    case 'Active':
      statusElement.classList.add('active');
      break;
    case 'Padding':
      statusElement.classList.add('padding');
      break;
    case 'Closed':
      statusElement.classList.add('closed');
      break;
    default:
  }
  statusElement.textContent = task.status;
  li.appendChild(statusElement);

  let operatorElement = document.createElement('span');
  operatorElement.classList.add('task-operation-col');
  let deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn-icon');
  deleteBtn.setAttribute('onclick', 'showDeleteModalPopover(' + task.id + ')');
  let deleteIcon = document.createElement('img');
  deleteIcon.setAttribute('src', './images/delete.svg');
  deleteBtn.appendChild(deleteIcon);
  operatorElement.appendChild(deleteBtn);

  let updateBtn = document.createElement('button');
  updateBtn.classList.add('btn-icon');
  let uopdateIcon = document.createElement('img');
  uopdateIcon.setAttribute('src', './images/update.svg');
  updateBtn.appendChild(uopdateIcon);
  operatorElement.appendChild(updateBtn);

  li.appendChild(operatorElement);
  return li;
}

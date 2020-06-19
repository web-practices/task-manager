var sort = {
  key: null,
  order: null,
};
function searchTasks() {
  let searchText = document.getElementById('searchText').value;
  if (searchText.trim()) {
    let filteredTasks = findTasksByName(searchText.trim());
    if (sort.key && sort.order) {
      filteredTasks.sort(compareValues(sort.key, sort.order));
    }
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
  let activeTasksCount = getAllTasks().filter(
    (task) => task.status === 'Active'
  ).length;
  document.getElementById('activeTasksCount').textContent = activeTasksCount;
  let activeTasksProportion =
    allTasksCount > 0
      ? Math.round((activeTasksCount / allTasksCount) * 100) + '%'
      : '0%';
  document.getElementById(
    'activeTasksProportion'
  ).textContent = activeTasksProportion;
  let paddingTasksCount = getAllTasks().filter(
    (task) => task.status === 'Padding'
  ).length;
  document.getElementById('paddingTasksCount').textContent = paddingTasksCount;
  let paddingTasksProportion =
    allTasksCount > 0
      ? Math.round((paddingTasksCount / allTasksCount) * 100) + '%'
      : '0%';
  document.getElementById(
    'paddingTasksProportion'
  ).textContent = paddingTasksProportion;
  let closedTasksCount = getAllTasks().filter(
    (task) => task.status === 'Closed'
  ).length;
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
  renderPage();
}

function sortTasks(ele, sortKey, order) {
  let focusElements = document.getElementsByClassName('sort-btn-focus');
  Array.from(focusElements).forEach((element) => {
    element.classList.remove('sort-btn-focus');
    element.classList.add('sort-btn-normal');
  });

  ele.classList.remove('sort-btn-normal');
  ele.classList.add('sort-btn-focus');
  sort.key = sortKey;
  sort.order = order;
  renderPage(sortKey, order);
}

function renderPage(sortKey = 'createDate', order) {
  showStatisticesCards();
  let searchText = document.getElementById('searchText').value;
  let allTask = getAllTasks();
  if (searchText.trim()) {
    allTask = findTasksByName(searchText.trim());
  }
  allTask.sort(compareValues(sortKey, order));
  showTasks(allTask);
}

function compareValues(key, order = 'desc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = varA > varB ? 1 : -1;

    return order === 'asc' ? comparison : comparison * -1;
  };
}

function showTasks(tasks) {
  let taskBody = document.getElementById('taskbody');
  taskBody.innerHTML = '';
  if (tasks && tasks.length > 0) {
    tasks.forEach((task, index) => {
      let row = generateTaskElement(task, index + 1);
      taskBody.appendChild(row);
    });
  }
}

function generateTaskElement(task, index) {
  let row = document.createElement('tr');
  row.classList.add('task-row');
  let indexElement = document.createElement('td');
  indexElement.classList.add('task-num-col');
  indexElement.textContent = index;
  row.appendChild(indexElement);

  let nameElement = document.createElement('td');
  nameElement.classList.add('task-name-col');
  nameElement.textContent = task.name;
  row.appendChild(nameElement);

  let desElement = document.createElement('td');
  desElement.classList.add('task-desc-col');
  desElement.textContent = task.description;
  row.appendChild(desElement);

  let deadlineElement = document.createElement('td');
  deadlineElement.classList.add('task-deadline-col');
  deadlineElement.textContent = task.deadline;
  row.appendChild(deadlineElement);

  let statusElement = document.createElement('td');
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
  row.appendChild(statusElement);

  let operatorElement = document.createElement('td');
  operatorElement.classList.add('task-operation-col');
  let deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn-icon');
  deleteBtn.setAttribute('onclick', 'createDeletePopover(' + task.id + ')');
  let deleteIcon = document.createElement('img');
  deleteIcon.setAttribute('src', './images/delete.svg');
  deleteBtn.appendChild(deleteIcon);
  operatorElement.appendChild(deleteBtn);

  let updateBtn = document.createElement('button');
  updateBtn.classList.add('btn-icon');
  updateBtn.setAttribute('onclick', 'createUpdateTaskPopover(' + task.id + ')');
  let uopdateIcon = document.createElement('img');
  uopdateIcon.setAttribute('src', './images/update.svg');
  updateBtn.appendChild(uopdateIcon);
  operatorElement.appendChild(updateBtn);

  row.appendChild(operatorElement);
  return row;
}

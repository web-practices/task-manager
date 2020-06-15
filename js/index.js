const tasks = [
  {
    id: 1,
    name: 'Learing Javascript',
    description: 'From now, you will learn Javascript. About 3 hours a week.',
    deadline: '2020-12-03',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Learing React',
    description:
      'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
    deadline: '2020-09-03',
    status: 'Padding',
  },
  {
    id: 3,
    name: 'Learing Node',
    description:
      'The API reference documentation provides detailed information about a function or object in Node.js. This documentation indicates what arguments a method accepts, the return value of that method, and what errors may be related to that method. It  also indicates which methods are available for different versions of Node.js.',
    deadline: '2020-03-03',
    status: 'Closed',
  },
  {
    id: 4,
    name: 'Learing Javascript',
    description: 'From now, you will learn Javascript. About 3 hours a week.',
    deadline: '2020-12-03',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Learing React',
    description:
      'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
    deadline: '2020-09-03',
    status: 'Padding',
  },
  {
    id: 6,
    name: 'Learing Node',
    description:
      'The API reference documentation provides detailed information about a function or object in Node.js. This documentation indicates what arguments a method accepts, the return value of that method, and what errors may be related to that method. It  also indicates which methods are available for different versions of Node.js.',
    deadline: '2020-03-03',
    status: 'Closed',
  },
];

function searchTasks() {
  let searchText = document.getElementById('searchText').value;
  if (searchText.trim()) {
    let filteredTasks = tasks.filter((task) =>
      task.name.includes(searchText.trim())
    );
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
      showTasks(tasks.filter((task) => task.status === status));
      break;
  }
}

function showStatisticesCards() {
  let allTasksCount = tasks.length;
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
  let closedTasksCount = tasks.filter((task) => task.status === 'Padding')
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
  showStatisticesCards();
  showTasks(tasks);
}

function showTasks(tasks) {
  let taskBody = document.getElementById('taskbody');
  taskBody.innerHTML = '';
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
  deleteBtn.setAttribute('onclick', 'showMedalPopover()');
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

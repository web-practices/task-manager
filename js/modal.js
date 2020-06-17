function showModalPopover() {
  let modal = document.getElementById('modal');
  modal.classList.add('modal-flex-center');
}

function hideModalPopover() {
  let modal = document.getElementById('modal');
  modal.classList.remove('modal-flex-center');
}

function deleteTask(id) {
  removeTask(id);
  renderPage();
  hideModalPopover();
}

function createTask() {
  let taskName = document.getElementById('taskName');
  let deadline = document.getElementById('taskDeadline');
  let desc = document.getElementById('taskDesc');
  if (requriedCheck([taskName, deadline, desc])) {
    return;
  }
  let allTask = getAllTasks();
  const maxId = allTask.reduce(
    (preId, task) => (preId > task.id ? preId : task.id),
    0
  );
  let task = {
    id: maxId + 1,
    name: taskName.value,
    deadline: deadline.value,
    description: desc.value,
    status: 'Active',
  };
  allTask.push(task);
  saveAllTasks(allTask);
  renderPage();
  hideModalPopover();
}

function requriedCheck(elements) {
  let result = false;
  elements.forEach((element) => {
    if (!element.value || element.value.trim() === '') {
      element.classList.add('invid-input');
      result = true;
    }
  });
  return result;
}

function updateTask(id) {
  let taskName = document.getElementById('taskName');
  let deadline = document.getElementById('taskDeadline');
  let desc = document.getElementById('taskDesc');
  if (requriedCheck([taskName, deadline, desc])) {
    return;
  }
  let statusDoms = document.getElementsByName('Status');
  let status = Array.from(statusDoms).find((redio) => redio.checked).value;
  let tasks = getAllTasks().map((task) => {
    if (task.id === id) {
      task.name = taskName.value;
      task.deadline = deadline.value;
      task.description = desc.value;
      task.status = status;
    }
    return task;
  });
  saveAllTasks(tasks);
  renderPage();
  hideModalPopover();
}

function createDeletePopover(id) {
  const icon = './images/modal_delete_icon.svg';
  const title = 'Delete Task';
  const okBtnClickEvent = 'deleteTask(' + id + ')';
  createPopoverHeaderAndFooter(icon, title, okBtnClickEvent);
  let p = document.createElement('p');
  let taskName = findTask(id).name;
  p.textContent = 'Do you confirm to delete task: "' + taskName + '" ?';
  let modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = '';
  modalContainer.appendChild(p);
  showModalPopover();
}

function createAddTaskPopover() {
  const icon = './images/modal_add_icon.svg';
  const title = 'New A Task';
  createModalPopover(icon, title, 'createTask()');
  showModalPopover();
}

function createUpdateTaskPopover(id) {
  const icon = './images/modal_update_icon.svg';
  const title = 'Update A Task';
  const okBtnClickEvent = 'updateTask(' + id + ')';
  let task = findTask(id);
  createModalPopover(icon, title, okBtnClickEvent, task);
  showModalPopover();
}

function createModalPopover(icon, title, okBtnClickEvent, task) {
  createPopoverHeaderAndFooter(icon, title, okBtnClickEvent);
  createPopoverContent(task);
}

function createPopoverHeaderAndFooter(icon, title, okBtnClickEvent) {
  let modalIcon = document.getElementById('modalIcon');
  modalIcon.setAttribute('src', icon);
  let modalTitle = document.getElementById('modalTitle');
  modalTitle.textContent = title;
  let okBtn = document.getElementById('modalBtnOk');
  okBtn.setAttribute('onclick', okBtnClickEvent);
}

function createPopoverContent(task) {
  let container = document.createElement('p');
  container.classList.add('textContainer');

  let nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'taskName');
  nameLabel.textContent = 'Name';
  container.appendChild(nameLabel);
  let nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('id', 'taskName');
  nameInput.value = task ? task.name : '';
  container.appendChild(nameInput);

  let deadlineLabel = document.createElement('label');
  deadlineLabel.setAttribute('for', 'taskDeadline');
  deadlineLabel.textContent = 'Deadline';
  container.appendChild(deadlineLabel);
  let deadlineInput = document.createElement('input');
  deadlineInput.setAttribute('type', 'text');
  deadlineInput.setAttribute('id', 'taskDeadline');
  deadlineInput.value = task ? task.deadline : '';
  container.appendChild(deadlineInput);

  if (task) {
    let statusLabel = document.createElement('label');
    statusLabel.textContent = 'Status';
    container.appendChild(statusLabel);
    let statusContainer = document.createElement('div');
    statusContainer.classList.add('status-container');
    let activeInput = document.createElement('input');
    activeInput.setAttribute('type', 'radio');
    activeInput.setAttribute('id', 'active');
    activeInput.setAttribute('name', 'Status');
    activeInput.setAttribute('value', 'Active');
    activeInput.checked = task.status === 'Active';
    statusContainer.appendChild(activeInput);
    let activeLable = document.createElement('label');
    activeLable.textContent = 'Active';
    activeLable.setAttribute('for', 'active');
    statusContainer.appendChild(activeLable);

    let paddingInput = document.createElement('input');
    paddingInput.setAttribute('type', 'radio');
    paddingInput.setAttribute('id', 'padding');
    paddingInput.setAttribute('name', 'Status');
    paddingInput.setAttribute('value', 'Padding');
    paddingInput.checked = task.status === 'Padding';
    statusContainer.appendChild(paddingInput);
    let paddingLable = document.createElement('label');
    paddingLable.textContent = 'Padding';
    paddingLable.setAttribute('for', 'padding');
    statusContainer.appendChild(paddingLable);

    let closedInput = document.createElement('input');
    closedInput.setAttribute('type', 'radio');
    closedInput.setAttribute('id', 'closed');
    closedInput.setAttribute('name', 'Status');
    closedInput.setAttribute('value', 'Closed');
    closedInput.checked = task.status === 'Closed';
    statusContainer.appendChild(closedInput);
    let closedLable = document.createElement('label');
    closedLable.textContent = 'Closed';
    closedLable.setAttribute('for', 'closed');
    statusContainer.appendChild(closedLable);

    container.appendChild(statusContainer);
  }

  let descLabel = document.createElement('label');
  descLabel.setAttribute('for', 'taskDesc');
  descLabel.textContent = 'Description';
  container.appendChild(descLabel);
  let descTextarea = document.createElement('textarea');
  descTextarea.setAttribute('id', 'taskDesc');
  descTextarea.setAttribute('rows', '5');
  descTextarea.setAttribute('maxlength', '200');
  descTextarea.setAttribute(
    'placeholder',
    'Please enter task descript, Maximum 200 characters'
  );
  descTextarea.value = task ? task.description : '';
  container.appendChild(descTextarea);

  let modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = '';
  modalContainer.appendChild(container);
}

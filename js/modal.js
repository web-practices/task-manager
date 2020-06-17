function showModalPopover() {
  let modal = document.getElementById('modal');
  modal.classList.add('modal-flex-center');
}

function hideModalPopover() {
  let modal = document.getElementById('modal');
  modal.classList.remove('modal-flex-center');
}

function showDeleteModalPopover(id) {
  const icon = './images/modal_delete_icon.svg';
  const title = 'Delete Task';
  let p = document.createElement('p');
  let taskName = findTask(id).name;
  p.textContent = 'Do you confirm to delete task: "' + taskName + '" ?';
  const okBtnClickEvent = 'deleteTask(' + id + ')';
  createModalPopover(icon, title, p, okBtnClickEvent);
  showModalPopover();
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

function createAddTaskPopover() {
  const icon = './images/modal_add_icon.svg';
  const title = 'New A Task';
  let container = document.createElement('p');
  container.classList.add('textContainer');
  let nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'taskName');
  nameLabel.textContent = 'Name';
  container.appendChild(nameLabel);
  let nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('id', 'taskName');
  container.appendChild(nameInput);

  let deadlineLabel = document.createElement('label');
  deadlineLabel.setAttribute('for', 'taskDeadline');
  deadlineLabel.textContent = 'Deadline';
  container.appendChild(deadlineLabel);
  let deadlineInput = document.createElement('input');
  deadlineInput.setAttribute('type', 'text');
  deadlineInput.setAttribute('id', 'taskDeadline');
  container.appendChild(deadlineInput);

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
  container.appendChild(descTextarea);

  createModalPopover(icon, title, container, 'createTask()');
  showModalPopover();
}

function createModalPopover(icon, title, contentElements, okBtnClickEvent) {
  let modalIcon = document.getElementById('modalIcon');
  modalIcon.setAttribute('src', icon);
  let modalTitle = document.getElementById('modalTitle');
  modalTitle.textContent = title;
  let modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = '';
  modalContainer.appendChild(contentElements);
  let okBtn = document.getElementById('modalBtnOk');
  okBtn.setAttribute('onclick', okBtnClickEvent);
  showModalPopover();
}

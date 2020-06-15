function showModalPopover() {
  let modal = document.getElementById('modal');
  modal.classList.add('modal-flex-center');
}

function hideModalPopover() {
  let modal = document.getElementById('modal');
  modal.classList.remove('modal-flex-center');
}

function showDeleteModalPopover(id) {
  let modalIcon = document.getElementById('modalIcon');
  modalIcon.setAttribute('src', './images/modal_delete_icon.svg');
  let modalTitle = document.getElementById('modalTitle');
  modalTitle.textContent = 'Delete Task';
  let modalContainer = document.getElementById('modalContainer');
  modalContainer.innerHTML = '';
  let p = document.createElement('p');
  let taskName = findTask(id).name;
  p.textContent = 'Do you confirm to delete task: "' + taskName + '" ?';
  modalContainer.appendChild(p);
  let okBtn = document.getElementById('modalBtnOk');
  okBtn.setAttribute('onclick', 'deleteTask(' + id + ')');
  showModalPopover();
}

function deleteTask(id) {
  removeTask(id);
  renderPage();
  hideModalPopover();
}

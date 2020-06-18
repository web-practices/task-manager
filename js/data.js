function saveAllTasks(allTasks) {
  localStorage.setItem('tasks', JSON.stringify(allTasks));
}

function getAllTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  return tasks ? tasks : [];
}

function removeTask(id) {
  let leftTasks = getAllTasks().filter((task) => task.id !== id);
  saveAllTasks(leftTasks);
}

function findTask(id) {
  return getAllTasks().find((task) => task.id === id);
}

function findTasksByName(name) {
  return getAllTasks().filter((task) => task.name.includes(name));
}

function findTasksByStatus(status) {
  return getAllTasks().filter((task) => task.status === status);
}

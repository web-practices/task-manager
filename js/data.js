// const tasks = [
//   {
//     id: 1,
//     name: 'Learing Javascript',
//     description: 'From now, you will learn Javascript. About 3 hours a week.',
//     deadline: '2020-12-03',
//     status: 'Active',
//   },
//   {
//     id: 2,
//     name: 'Learing React',
//     description:
//       'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
//     deadline: '2020-09-03',
//     status: 'Padding',
//   },
//   {
//     id: 3,
//     name: 'Learing Node',
//     description:
//       'The API reference documentation provides detailed information about a function or object in Node.js. This documentation indicates what arguments a method accepts, the return value of that method, and what errors may be related to that method. It  also indicates which methods are available for different versions of Node.js.',
//     deadline: '2020-03-03',
//     status: 'Closed',
//   },
//   {
//     id: 4,
//     name: 'Learing Javascript',
//     description: 'From now, you will learn Javascript. About 3 hours a week.',
//     deadline: '2020-12-03',
//     status: 'Active',
//   },
//   {
//     id: 5,
//     name: 'Learing React',
//     description:
//       'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
//     deadline: '2020-09-03',
//     status: 'Padding',
//   },
//   {
//     id: 6,
//     name: 'Learing Node',
//     description:
//       'The API reference documentation provides detailed information about a function or object in Node.js. This documentation indicates what arguments a method accepts, the return value of that method, and what errors may be related to that method. It  also indicates which methods are available for different versions of Node.js.',
//     deadline: '2020-03-03',
//     status: 'Closed',
//   },
// ];
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

const fs = require('fs');
const path = require('path');

let users = require('../data/users.json');

export const usersRepo = {
  getAll,
  getById,
  create,
};

function getAll() {
  return users;
}

function create(data) {
  // add and save user
  users.push(data);
  saveData();
}

function getById(id) {
  return users.find((x) => x.requestId.toString() === requestId.toString());
}

function saveData() {
  fs.writeFileSync(
    path.join(process.cwd(), 'data/users.json'),
    JSON.stringify(users, null, 4)
  );
}

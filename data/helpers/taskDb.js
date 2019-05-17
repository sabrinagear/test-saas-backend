<<<<<<< HEAD
const db = require("../config");



// Export functions
module.exports = {
  get,
  getByGroup,
  getByUser,
  getById,
  add,
  update,
  remove
}

function get() {
  return db('tasks')
}

function getByGroup(groupId) {
  return db
    .select('*')
    .from('tasks')
    .where('groupID', groupId)
}

function getByUser(userId) {
  return db
    .select('*')
    .from('tasks')
    .where('purchasedBy', userId)
}

function getById(id) {
  return db
    .select('*')
    .from('tasks')
    .where({ id })
}

function add(task) {
  return db('tasks')
    .returning('id')
    .insert(task)
    .into('tasks')
}

function update(id, changes) {
  return db('tasks')
    .returning('id')
    .where({ id })
    .update(changes)
}

function remove(id) {
  return db('tasks')
    .returning('id')
    .where({ id })
    .del()
}
=======
const db = require("../config");

// Export functions
module.exports = {
  get,
  getByGroup,
  assignedTo,
  getById,
  add,
  update,
  remove
};

function get() {
  return db("tasks");
}

function getByGroup(groupId) {
  return db
    .select("*")
    .from("tasks")
    .where("groupId", groupId);
}

function assignedTo(userId) {
  return db
    .select("*")
    .from("tasks")
    .where("assignedTo", userId);
}

function getById(id) {
  return db
    .select("*")
    .from("tasks")
    .where({ id });
}

function add(item) {
  return db("tasks")
    .returning("id")
    .insert(item)
    .into("tasks");
}

function update(id, changes) {
  return db("tasks")
    .returning("id")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("tasks")
    .returning("id")
    .where({ id })
    .del();
}
>>>>>>> 0a1b9e5ee2020e4ad65b0dc4254cc2ee7d1d13a3

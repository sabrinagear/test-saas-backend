const db = require("../config");

<<<<<<< HEAD
=======


>>>>>>> cfeb8baac6ae25d33764a7194fd13ca2faea698d
// Export functions
module.exports = {
  get,
  getByGroup,
<<<<<<< HEAD
  assignedTo,
=======
  getByUser,
>>>>>>> cfeb8baac6ae25d33764a7194fd13ca2faea698d
  getById,
  add,
  update,
  remove
<<<<<<< HEAD
};

function get() {
  return db("tasks");
=======
}

function get() {
  return db('tasks')
>>>>>>> cfeb8baac6ae25d33764a7194fd13ca2faea698d
}

function getByGroup(groupId) {
  return db
<<<<<<< HEAD
    .select("*")
    .from("tasks")
    .where("groupId", groupId);
}

function assignedTo(userId) {
  return db
    .select("*")
    .from("tasks")
    .where("assignedTo", userId);
=======
    .select('*')
    .from('tasks')
    .where('groupID', groupId)
}

function getByUser(userId) {
  return db
    .select('*')
    .from('tasks')
    .where('purchasedBy', userId)
>>>>>>> cfeb8baac6ae25d33764a7194fd13ca2faea698d
}

function getById(id) {
  return db
<<<<<<< HEAD
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
=======
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
>>>>>>> cfeb8baac6ae25d33764a7194fd13ca2faea698d

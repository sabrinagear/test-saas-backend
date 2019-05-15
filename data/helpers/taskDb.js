// Define database from the configuration
const db = require("../data/config.js");

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

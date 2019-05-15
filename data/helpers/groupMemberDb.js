// Define database from the configuration
const db = require("../data/config.js");

// Export functions
module.exports = {
  get,
  getByGroup,
  getByUser,
  getById,
  returnUserGroups,
  add,
  update,
  remove,
  removeGroup
};

function get() {
  return db("groupMembers");
}

function getByGroup(id) {
  return db
    .select("*")
    .from("groupMembers")
    .where("groupId", id);
}

function getByUser(id) {
  return db
    .select("*")
    .from("groupMembers")
    .where("userId", id);
}

function getById(groupId, userId) {
  return db
    .select("*")
    .from("groupMembers")
    .where({ groupId })
    .where({ userId });
}

function returnUserGroups(userId) {
  return db
    .select("groupId")
    .from("groupMembers")
    .where({ userId });
}

function add(groupMember) {
  return db("groupMembers")
    .returning("id")
    .insert(groupMember)
    .into("groupMembers");
}

function update(id, changes) {
  return db("groupMembers")
    .returning("id")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("groupMembers")
    .returning("id")
    .where({ id })
    .del();
}

function removeGroup(groupId) {
  return db("groupMembers")
    .returning("id")
    .where({ groupId })
    .del();
}

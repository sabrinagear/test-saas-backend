// Define database from the configuration
const db = require("../config");

// Export functions
module.exports = {
  get,
  getById,
  getByUser,
  add,
  update,
  remove
};
function get() {
  return db("groups");
}
function getById(id) {
  return db
    .select("*")
    .from("groups")
    .where({ id });
}
function getByUser(creatorId) {
  return db
    .select("*")
    .from("groups")
    .where({ creatorId });
}
function add(group) {
  return db("groups")
    .returning("id")
    .insert(group)
    .into("groups");
}
function update(id, changes) {
  return db("groups")
    .returning("id")
    .where({ id })
    .update(changes);
}
function remove(id) {
  return db("groups")
    .returning("id")
    .where({ id })
    .del();
}

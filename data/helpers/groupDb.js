// Define database from the configuration
const db = require("../data/config.js");

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
function getByUser(userId) {
  return db
    .select("*")
    .from("groups")
    .where({ userId });
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

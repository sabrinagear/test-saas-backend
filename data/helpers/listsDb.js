// Define database from the configuration
const db = require("../data/config.js");

// Export functions
module.exports = {
  get,
  getById,
  getByList,
  add,
  update,
  remove
};

function get() {
  return db("lists");
}

function getById(id) {
  return db
    .select("*")
    .from("lists")
    .where({ id });
}

function getByList(list) {
  return db
    .select("*")
    .from("lists")
    .where({ list });
}

function add(item) {
  return db("lists")
    .returning("id")
    .insert(item)
    .into("lists");
}

function update(id, changes) {
  return db("lists")
    .returning("id")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("lists")
    .returning("id")
    .where({ id })
    .del();
}

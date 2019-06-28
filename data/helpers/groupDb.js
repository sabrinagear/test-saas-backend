// Define database from the configuration
const db = require("../config");

// Export functions
module.exports = {
  get,
  getById,

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

function add(group) {
  return db("groups")
    .insert(group)
    .then(ids => ({ id: ids[0] }));
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

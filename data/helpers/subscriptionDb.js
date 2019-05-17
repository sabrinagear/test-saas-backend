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
  return db("subscriptions");
}

function getById(id) {
  return db
    .select("*")
    .from("subscriptions")
    .where({ id });
}

function add(sub) {
  return db("subscriptions")
    .returning(["id", "name", "amount"])
    .insert(sub)
    .into("subscriptions");
}

function update(id, changes) {
  return db("subscriptions")
    .returning("id")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("subscriptions")
    .returning("id")
    .where({ id })
    .del();
}

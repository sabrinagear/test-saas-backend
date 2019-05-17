const db = require("../config");

module.exports = {
  add,
  remove,
  getById,
  get,
  update,
  getIdByEmail,
  getProfileByEmail
};
function get() {
  return db("users");
}

function getById(id) {
  return db
    .select("*")
    .from("users")
    .where({ id });
}
function getProfileByEmail(email) {
  return db
    .select("*")
    .from("users")
    .where({ email });
}
function getIdByEmail(email) {
  return db
    .select("id")
    .from("users")
    .where({ email });
}
function add(user) {
  return db("users")
    .insert(user)
    .into("users");
}
function update(id, changes) {
  return db('users')
    .returning('id')
    .where({ id })
    .update(changes)
}
function remove(id) {
  return db('users')
    .returning('id')
    .where({ id })
    .del()
}


const db = require("../../data/config.js");

module.exports = {
  get,
  add,
  update,
  remove,
  getById
};
// this should get all the comments (findAll)
function get() {
  return db("comments");
}
// this should get a single note
function getById(id) {
  return db
    .select("*")
    .from("comments")
    .where({ id });
}
//   this is the post function (create)
function add(comment) {
  return (
    db("comments")
      // .returning('id')
      .insert(comment)
      .into("comments")
  );
}
//   edit/(update)
function update(id, changes) {
  return db("comments")
    .returning("id")
    .where({ id })
    .update(changes);
}
//   this is the delete route (delete)
function remove(id) {
  return db("comments")
    .returning("id")
    .where({ id })
    .del();
}

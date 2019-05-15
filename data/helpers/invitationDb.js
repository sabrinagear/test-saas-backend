const db = require("../config");

module.exports = {
  getByCode,
  add,
  update
};
function getByCode(inviteCode) {
  // get the invitation information by passing in the inviteCode
  return db
    .select("*")
    .from("invitations")
    .where("inviteCode", inviteCode);
}
function add(invitation) {
  return db("invitations")
    .returning("id")
    .insert(invitation)
    .into("invitations"); // returns the id of the new invitation
}
function update(id, changes) {
  return db("invitations")
    .returning("id")
    .where({ id })
    .update(changes);
}

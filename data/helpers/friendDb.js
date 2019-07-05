const db = require("../config");

module.exports = {
  get: function(userId) {
    let query = db("friendTable as f");
    if (userId) {
      query.select("*").where("f.userId", userId);
    }
    return query;
  },

  add: function(friend) {
    return db("friendTable")
      .insert(friend)
      .into("friendTable");
  },
  update: function(userId, changes) {
    return db("friendTable")
      .returning("userId")
      .where({ userId })
      .update(changes);
  },
  remove: function(userId) {
    return db("friendTable")
      .returning("userId")
      .where({ userId })
      .del();
  }
};

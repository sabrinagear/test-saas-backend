const db = require("../config");

module.exports = {
  get: function(uid) {
    let query = db("users as u");
    if (uid) {
      query.select("*").where("u.uid", uid);
      const promises = [query, this.getGroupsByUser(uid)]; // [ users, groups ]

      return Promise.all(promises).then(function(results) {
        let [users, groups] = results;
        console.log(users);
        console.log(groups);
        let user = users[0];
        user.groups = groups.map(g => g);
        return user;
      });
    }

    return query;
  },

  getGroupsByUser: function(uid) {
    return db("groups as g")
      .join("groupMembers as m", "g.id", "m.groupId")
      .select("*")
      .where("m.userId", uid);
  },

  getProfileByEmail: function(email) {
    return db
      .select("*")
      .from("users")
      .where({ email });
  },
  getIdByEmail: function(email) {
    return db
      .select("id")
      .from("users")
      .where({ email });
  },
  add: function(user) {
    return db("users")
      .insert(user)
      .into("users");
  },
  update: function(id, changes) {
    return db("users")
      .returning("id")
      .where({ id })
      .update(changes);
  },
  remove: function(id) {
    return db("users")
      .returning("id")
      .where({ id })
      .del();
  }
};

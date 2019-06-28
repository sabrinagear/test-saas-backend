// Define database from the configuration
const db = require("../config");

// Export functions
module.exports = {
  get: function(id) {
    let query = db("groups as g");
    if (id) {
      query.select("*").where("id", id);
      const promises = [query, this.getMembers(id)]; // [ users, groups ]

      return Promise.all(promises).then(function(results) {
        let [groups, members] = results;
        console.log(groups);
        let group = groups[0];
        group.members = members.map(m => m);
        return group;
      });
    }

    return query;
  },

  getMembers: function(id) {
    return db("users as u")
      .join("groupMembers as m", "m.userId", "u.uid" )
      .select("*")
      .where("m.groupId", id);
  },


// getById: function(id) {
//   return db
//     .select("*")
//     .from("groups")
//     .where({ id });
// },

add: function(group) {
  return db("groups")
    .insert(group)
    .then(ids => ({ id: ids[0] }));
 },
update: function(id, changes) {
  return db("groups")
    .return("id")
    .where({ id })
    .update(changes);
},
remove: function(id) {
  return db("groups")
    .return("id")
    .where({ id })
    .del();
}
}
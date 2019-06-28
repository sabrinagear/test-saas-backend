const db = require("../config");

// Export functions
module.exports = {
  get: function(id) {
    let query = db("groupTasks");
    if (id) {
      query.select("*").where("id", id);
    }
    return query;
  },

  add: function(e) {
    return db("groupTasks")
      .insert(e)
      .then(ids => ({ id: ids[0] }));
  },

  update: function(id, changes) {
    return db("groupTasks")
      .return("id")
      .where({ id })
      .update(changes);
  },
  remove: function(id) {
    return db("groupTasks")
      .return("id")
      .where({ id })
      .del();
  }
};

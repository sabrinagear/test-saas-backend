
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, email: 'thor@avengers.com', name: "Thor", subscriptionType: 3},
        {id: 2, email: 'ironman@avengers.com', name: "Iron Man", subscriptionType: 3},
        {id: 3, email: 'captainamerica@avengers.com', name: "Captain America", subscriptionType: 3},
        {id: 4, email: 'antman@avengers.com', name: "Ant-man", subscriptionType: 3},
      ]);
    });
};

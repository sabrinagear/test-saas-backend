
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
<<<<<<< HEAD
        {id: 1, email: 'thor@avengers.com', name: "Thor"},
        {id: 2, email: 'ironman@avengers.com', name: "Iron Man"},
        {id: 3, email: 'captainamerica@avengers.com', name: "Captain America"},
        {id: 4, email: 'antman@avengers.com', name: "Ant-man"},
=======
        {id: 1, email: 'thor@avengers.com', name: "Thor", subscriptionType: 3},
        {id: 2, email: 'ironman@avengers.com', name: "Iron Man", subscriptionType: 3},
        {id: 3, email: 'captainamerica@avengers.com', name: "Captain America", subscriptionType: 3},
        {id: 4, email: 'antman@avengers.com', name: "Ant-man", subscriptionType: 3},
>>>>>>> 0a1b9e5ee2020e4ad65b0dc4254cc2ee7d1d13a3
      ]);
    });
};

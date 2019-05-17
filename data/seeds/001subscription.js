
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return (function () {
      // Inserts seed entries
      return knex('subscriptions').insert([
        {id: 1, name: 'Free', price: 0 },
<<<<<<< HEAD
        {id: 2, name: 'Pro', price: 1 },
        {id: 3, name: 'Business', price: 2 }
=======
        {id: 2, name: 'Pro', price: 9 },
        {id: 3, name: 'Business', price: 9999 }
>>>>>>> 0a1b9e5ee2020e4ad65b0dc4254cc2ee7d1d13a3
      ]);
    });
};

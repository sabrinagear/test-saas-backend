
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return (function () {
      // Inserts seed entries
      return knex('subscriptions').insert([
        {id: 1, name: 'Free', price: 0 },
<<<<<<< HEAD
        {id: 2, name: 'Pro', price: 9 },
        {id: 3, name: 'Business', price: 9999 }
=======
        {id: 2, name: 'Pro', price: 1 },
        {id: 3, name: 'Business', price: 2 }
>>>>>>> 9b39c5865229407dc39ae368382b3ff8b5ae0ee5
      ]);
    });
};

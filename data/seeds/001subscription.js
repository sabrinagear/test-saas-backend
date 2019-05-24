exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return function() {
    // Inserts seed entries
    return knex("subscriptions").insert([
      { name: "Free", price: 0 },
      { name: "Pro", price: 1 },
      { name: "Business", price: 2 }
    ]);
  };
};

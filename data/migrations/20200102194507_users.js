exports.up = function(knex) {
    return knex.schema.createTable('users', t => {
        t.increments();
        t.string('first_name', 255);
        t.string('last_name', 255);
        t.string('email').unique();
        t.string('address');
        t.string('phone');
        t.string('avatar', 255);
        t.integer('balance', 128).defaultTo(0);
        t.boolean('isBoarded').defaultTo(false);
        t.string('stripe_id').unique();
        t.string('payout_id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};

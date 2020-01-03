exports.up = function(knex) {
    return knex.schema
        .createTable('coffeemakers', t => {
            t.increments();
            t.string('coffeemaker_name', 255)
                .unique()
                .notNullable();
        })
        .createTable('flavors', t => {
            t.increments();
            t.string('flavor_name', 255);
            t.integer('FK_coffeemakers')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('coffeemakers')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');

            t.string('name', 255).notNullable();
            t.string('description', 500);
        })
        .createTable('coffees', t => {
            t.increments();
            t.string('coffee_name', 255).notNullable();
            t.integer('price').defaultTo(0);
            t.integer('stock').defaultTo(0);
            t.integer('FK_coffeemakers')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('coffeemakers')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');
            t.integer('FK_flavors')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('flavors')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');
        })
        .createTable('accessories', t => {
            t.increments();
            t.string('accessory_name', 255).notNullable();
            t.integer('price').defaultTo(0);
            t.integer('stock').defaultTo(0);
            t.integer('FK_coffeemakers')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('coffeemakers')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');
        })
        .createTable('gifts', t => {
            t.increments();
            t.string('gift_name').notNullable();
            t.integer('price').defaultTo(0);
            t.integer('stock').defaultTo(0);
            t.integer('FK_coffeemaker')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('coffemakers')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('coffeemakers')
        .dropTableIfExists('flavors')
        .dropTableIfExists('coffees')
        .dropTableIfExists('accessories')
        .dropTableIfExists('gifts');
};

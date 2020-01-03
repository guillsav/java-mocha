const db = require('../../data/dbConfig.js');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById
};

async function insert(coffeemaker) {
    const [id] = await db('coffeemakers').insert(coffeemaker);
    return findById(id);
}

function update(id, changes) {
    return db('coffeemaker')
        .where({id})
        .first()
        .update(changes, '*');
}

function remove(id) {
    return db('coffeemakers')
        .where({id})
        .del();
}

function getAll() {
    return db('coffeemakers').select('id', 'coffeemaker_name');
}

function findById(id) {
    return db('coffeemakers')
        .where({id})
        .first();
}

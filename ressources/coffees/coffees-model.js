const db = require('../../data/dbConfig');

module.exports = {
    find,
    findById,
    insert,
    update,
    remove
};

async function find(coffees) {
    return await db('coffees').select('*');
}

async function findById(id) {
    return await db('coffees')
        .where({id})
        .first();
}

async function insert(coffee) {
    const [id] = await db('coffees').insert(coffee, 'id');
    return findById(id);
}

async function update(id, changes) {
    const coffee = await db('coffees')
        .where({id})
        .update(changes, '*');
    return findById(id);
}

async function remove(id) {
    return await db('coffees')
        .where({id})
        .del();
}

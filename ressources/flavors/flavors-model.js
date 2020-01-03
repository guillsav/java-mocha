const db = require('../../data/dbConfig.js');

module.exports = {
    insert,
    update,
    remove,
    find,
    findById
};

async function find() {
    return await db('flavors').select('*');
}

async function findById(id) {
    return await db('flavors')
        .where({id})
        .first();
}

async function insert(flavor) {
    const [id] = await db('flavors').insert(flavor);
    return findById(id);
}

async function update(id, changes) {
    const flavor = await db('flavors')
        .where({id})
        .update(changes, '*');
    return findById(id);
}

async function remove(id) {
    return await db('flavors')
        .where({id})
        .del();
}

const db = require('../../data/dbConfig.js');

module.exports = {
    find,
    findById,
    insert,
    update,
    remove
};

async function find() {
    return await db('gifts').select('*');
}

async function findById(id) {
    return await db('gifts')
        .where({id})
        .first();
}

async function insert(gift) {
    const [id] = await db('gifts').insert(gifts, 'id');
    return findById(id);
}

async function update(id, change) {
    const gift = await db('gifts')
        .where({id})
        .update(change, '*');
    return findById(id);
}

async function remove(id) {
    return await db('gifts')
        .where({id})
        .del();
}

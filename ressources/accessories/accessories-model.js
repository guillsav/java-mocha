const db = require('../../data/dbConfig.js');

module.exports = {
    find,
    findById,
    insert,
    update,
    remove
};

async function find() {
    return await db('accessories').select('*');
}

async function findById(id) {
    return await db('accessories')
        .where({id})
        .first();
}

async function insert(item) {
    const [id] = await db('accessories').insert(item, 'id');
    return findById(id);
}

async function update(id, changes) {
    const item = await db('accessories')
        .where({id})
        .update(changes, '*');
    return findById(id);
}

async function remove(id) {
    return await db('accessories')
        .where({id})
        .del();
}

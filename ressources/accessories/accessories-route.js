const router = require('express').Router();
const db = require('./accessories-model.js');
const validation = require('../../api/middlewares/routes-validation/accessoriesValidation.js');

router.get('/', async (req, res) => {
    try {
        const item = await db.find();
        res.status(200).json(item);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Server could not retrieve the items from the database.`
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await db.findById(req.params.id, req.body);
        if (!item)
            res.status(404).json({
                errorMessage: `Item with ID ${req.params.id} not found.`
            });
        res.status(200).json(item);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Server could not retrieve the items from the database.`
        });
    }
});

router.post('/', validation, async (req, res) => {
    try {
        const item = await db.insert(req.body);
        res.status(201).json(item);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Server could not add the item to the database.`
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const item = await db.update(req.params.id, req.body);
        if (!item)
            res.status(404).json({
                errorMessage: `Item with ID ${req.params.id} not found.`
            });
        res.status(201).json(item);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Server could not update the item in the database.`
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const item = await db.remove(req.params.id);
        if (!item)
            res.status(404).json({
                errorMessage: `Item with ID ${req.params.id} not found.`
            });
        res.status(204).end();
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Server could not delete the item from the database.`
        });
    }
});

module.exports = router;

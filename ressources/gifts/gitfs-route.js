const router = require('express').Router();
const db = require('./gifts-model.js');

router.get('/', async (req, res) => {
    try {
        const gifts = await db.find();
        res.status(200).json(gifts);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Server could not retrieve the gifts from the database.`
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const gift = await db.findById(req.params.id, req.body);
        if (!gift)
            res.status(404).json({
                errorMessage: `Gift with ID ${req.params.id} not found.`
            });
        res.status(200).json(gift);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Server could not retrieve the gift from the database.`
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const gift = await db.insert(req.body);
        res.status(201).json(gift);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Server could not add new gift to the database.`
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const gift = await db.update(req.params.id, req.body);
        if (!gift)
            res.status(404).json({
                errorMessage: `Gift with ID ${req.params.id} not found.`
            });
        res.status(201).json(gift);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Server could not edit the gift in the database.`
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const gift = await db.remove(req.params.id);
        if (!gift)
            res.status(404).json({
                errorMessage: `Gift with ID ${req.params.id} not found.`
            });
        res.status(204).end();
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Server could not delete the gift from the database.`
        });
    }
});

module.exports = router;

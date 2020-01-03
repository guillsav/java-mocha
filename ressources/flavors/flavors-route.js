const router = require('express').Router();
const db = require('./flavors-model.js');

router.get('/', async (req, res) => {
    try {
        const flavors = await db.find();
        res.status(200).json(flavors);
    } catch ({message}) {
        res.status(500).json({
            errorMessage:
                'Server could not retrieve the flavors from the database.'
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const flavor = await db.findById(req.params.id);
        if (!flavor)
            res.status(404).json({
                errorMessage: `Flavor with ID ${req.params.id} not found.`
            });
        res.status(200).json(flavor);
    } catch ({message}) {
        res.status(500).json({
            errorMessage:
                'Server could not retrieve the flavor from the database.'
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const newFlavor = await db.insert(req.body);
        res.status(201).json(newFlavor);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: 'Server could not post a new flavor to the database.'
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const flavor = await db.update(req.params.id, req.body);
        if (!flavor)
            res.status(404).json({
                errorMessage: `Flavor with ID ${req.params.id} not found.`
            });
        res.status(201).json(flavor);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: 'Server could not edit the flavor in the database.'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const flavor = await db.remove(req.params.id);
        if (!flavor)
            res.status(404).json({
                errorMessage: `Flavor with ID ${req.params.id} not found.`
            });
        res.status(204).end();
    } catch ({message}) {
        res.status(500).json({
            errorMessage: 'Server could not find the flavor to delete.'
        });
    }
});

module.exports = router;

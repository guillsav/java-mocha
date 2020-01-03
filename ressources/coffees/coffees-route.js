const router = require('express').Router();
const db = require('./coffees-model.js');

router.get('/', async (req, res) => {
    try {
        const coffees = await db.find();
        res.status(200).json(coffees);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Server could not retrieve the coffees from the database.`
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const coffee = await db.findById(req.params.id);
        if (!coffee)
            res.status(404).json({
                errorMessage: `Coffee with ID ${req.params.id} not found.`
            });
        res.status(200).json(coffee);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Server could not retrive the coffee from the database.`
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const coffee = await db.insert(req.body);
        res.status(201).json(coffee);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Server could not add the new coffee in the database.`
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const coffee = await db.update(req.params.id, req.body);
        if (!coffee)
            res.status(404).json({
                errorMessage: `Coffee with ID ${req.params.id} not found.`
            });
        res.status(201).json(coffee);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Server could not edit the coffee in the database.`
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const coffee = await db.remove(req.params.id);
        if (!coffee)
            res.status(404).json({
                errorMessage: `Coffee with ID ${req.params.id} not found.`
            });
        res.status(204).end();
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Server could not delete the coffee from the database.`
        });
    }
});

module.exports = router;

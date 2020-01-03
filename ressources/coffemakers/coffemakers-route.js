const router = require('express').Router();
const db = require('./coffemakers-model');

router.get('/', async (req, res) => {
    try {
        const coffemakers = await db.getAll();
        res.status(200).json(coffemakers);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Server could not retrieve the coffemakers`
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const coffeemaker = await db.findById(req.params.id);
        if (!coffeemaker)
            res.status(404).json({
                errorMessage: `Coffeemaker with ID ${req.params.id} could not be found!`
            });
        res.status(200).json(coffeemaker);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Server could not retrieve coffeemaker.`
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const newCoffeemaker = await db.insert(req.body);
        res.status(201).json(newCoffeemaker);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Could not add a new coffeemaker to the database.`
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const coffeemaker = await db.update(req.params.id, req.body);
        if (!coffeemaker)
            res.status(404).json({
                errorMessage: `Coffeemaker with ID ${req.params.id} could not be found!`
            });
        res.status(201).json(coffeemaker);
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Could not retrieve coffeemaker from the database.`
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const coffeemaker = await db.remove(req.params.id);
        if (!coffeemaker)
            res.status(404).json({
                errorMessage: `Coffeemaker with ID ${req.params.id} could not be found!`
            });
        res.status(204).end();
    } catch ({message}) {
        res.status(500).json({
            errorMessage: `Could not delete the coffeemaker from the database.`
        });
    }
});

module.exports = router;

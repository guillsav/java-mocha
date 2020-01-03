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

module.exports = router;

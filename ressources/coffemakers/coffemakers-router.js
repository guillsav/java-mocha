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

module.exports = router;

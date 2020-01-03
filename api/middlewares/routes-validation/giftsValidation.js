const Joi = require('@hapi/joi');

const validation = async (req, res, next) => {
    const schema = Joi.object().keys({
        gift_name: Joi.string()
            .alphanum()
            .min(3)
            .max(255)
            .required(),
        price: Joi.number().default(0),
        stock: Joi.number().default(0),
        Fk_coffeemakers: Joi.number().required()
    });

    try {
        const value = await schema.validateAsync(req.body);
        if (value) next();
    } catch (error) {
        res.status(400).json({message: 'Please provide a name for the gift.'});
    }
};

module.exports = validation;

const Joi = require('@hapi/joi');

const validation = async (req, res, next) => {
    const schema = Joi.object().keys({
        flavor_name: Joi.string()
            .alphanum()
            .min(3)
            .max(255)
            .require(),
        FK_coffeemakers: Joi.number().required()
    });

    try {
        const value = await schema.validateAsync(req.body);
        if (result) next();
    } catch (error) {
        res.status(400).json({message: 'Please provide name for flavor.'});
    }
};

module.exports = validation;

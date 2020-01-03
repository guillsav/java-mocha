const Joi = require('@hapi/joi');

const validation = async (req, res, next) => {
    const schema = Joi.object().keys({
        coffeemaker_name: Joi.string()
            .alphanum()
            .min(3)
            .max(255)
            .required()
    });

    try {
        const value = await schema.validateAsync(req.body);
        if (value) next();
    } catch (error) {
        res.status(400).json({message: 'Please provide coffemaker name.'});
    }
};

module.exports = validation;

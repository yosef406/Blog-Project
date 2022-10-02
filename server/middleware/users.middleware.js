const usersSchema = require('../models/Users.model');

exports.getUserWithID = async (req, res, next) => {
    try {
        let user = await usersSchema.findById(req.params.id);
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
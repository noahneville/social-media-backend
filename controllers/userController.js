const { User, Thought } = require('../models');

module.exports = {

    // get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // Get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.username})
    }

}
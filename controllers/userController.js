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
        User.findOne({ _id: req.params.userId})
            .select('-__v')
            .then((user) => 
                !user 
                ? res.status(404).json({ message: 'no user found with that ID'})
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // update a user 
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'no user found with that ID'})
                : res.json(user)

        )
        .catch((err) => res.status(500).json(err));
    },
    // delete user
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'no user found with that ID'})
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
                )
                .then(() => res.json({ message: 'User and associated thoughts have been deleted.'}))
                .catch((err) => res.status(500).json(err));
    }
}
// TODO: /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list
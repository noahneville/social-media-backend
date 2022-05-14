const { Schema, Types, model} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            TODO: email validation,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: Thought,
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: User,
            }
        ],
    },
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
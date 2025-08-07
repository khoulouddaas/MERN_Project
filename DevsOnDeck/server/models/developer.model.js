const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DeveloperSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter a first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please enter a last name"]
    },
    email: {
        type: String,
        required: [true, "Email address is required"]
    },
    address: {
        type: String,
        required: [false]
    },
    city: {
        type: String,
        required: [false]
    },
    state: {
        type: String,
        required: [false]
    },
    password: {
        type: String,
        required: [true, "Please enter a valid password"],
        minlength: [6, "Password must be at least 6 characters"]
    }
}, { timestamps: true });

// Hash password before saving
DeveloperSchema.pre('save', async function(next) {
    try {
        if (this.isModified('password')) {
            const hashed = await bcrypt.hash(this.password, 10);
            this.password = hashed;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Developer = mongoose.model('Developer', DeveloperSchema);

module.exports = Developer;

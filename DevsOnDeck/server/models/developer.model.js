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
        required: [true, "Please enter an address"]
    },
    city: {
        type: String,
        required: [true, "Please enter a city"]
    },
    state: {
        type: String,
        required: [true, "State is required"],
        enum: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
            'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA',
            'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY',
            'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX',
            'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
    },
    password: {
        type: String,
        required: [true, "Please enter a valid password"],
        minlength: [6, "Password must be at least 6 characters"]
    }
}, { timestamps: true });

// Virtual for confirmPassword (not stored in DB)
DeveloperSchema.virtual('confirmPassword')
    .set(function(value) {
        this._confirmPassword = value;
    });

// Validation middleware: check if password and confirmPassword match
DeveloperSchema.pre('validate', function(next) {
    if (this.password !== this._confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match!');
    }
    next();
});

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

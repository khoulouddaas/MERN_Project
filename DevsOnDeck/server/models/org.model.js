const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const OrganizationSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter a company name."]
    },
    email: {
        type: String,
        required: [true, "Please enter a company email"]
    },
  address: {
  type: String,
  required: [true, "Address is required"]
},
city: {
  type: String,
  required: [true, "City is required"]
},
state: {
  type: String,
  required: [true, "State is required"]
},

    password: {
        type: String,
        required: [true, "Please enter a valid password"],
        minlength: [6, "Password must be at least 6 characters"]
    }
}, {timestamps: true })

OrganizationSchema.virtual("confirmPassword")
    .get(()=> this._confirmPassword)
    .set((value)=> this._confirmPassword = value)

OrganizationSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', "Passwords do not match!");
        console.log("Passwords do not match!");
    }
    next();
})

OrganizationSchema.pre("save", function (next) {
    console.log("In pre-save --------------------------------");
    bcrypt.hash(this.password, 10)
        .then((hashedpw)=> {
            this.password = hashedpw
            next();
        })
})

const Organization = mongoose.model("Organization", OrganizationSchema);

module.exports =  Organization ;
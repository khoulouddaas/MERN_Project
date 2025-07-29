const Organization = require('../models/org.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    register: (req, res) => {
        const organization = new Organization(req.body);
        console.log("Registering organization.....");
        organization.save()
            .then((newOrganization) => {
                console.log(newOrganization);
                console.log("Successfully registered organization!");
                res.json({
                    successMessage: "Successfully registered organization",
                    organization: newOrganization
                });
            })
            .catch((err) => {
                console.log("Registration failed.....");
                res.status(400).json(err);
            });
    },

    login: (req, res) => {
        Organization.findOne({ email: req.body.email })
            .then((orgRecord) => {
                if (orgRecord === null) {
                    res.status(400).json({ message: "Invalid login attempt! Please enter your information again." });
                } else {
                    bcrypt.compare(req.body.password, orgRecord.password)
                        .then((isPasswordValid) => {
                            if (isPasswordValid) {
                                console.log("Password is valid!-------------->");
                                res.cookie(
                                    "organizationtoken",
                                    jwt.sign(
                                        {
                                            id: orgRecord._id,
                                            name: orgRecord.name,
                                            email: orgRecord.email,
                                        },
                                        `${process.env.JWT_SECRET}`
                                    ),
                                    {
                                        httpOnly: true,
                                        expires: new Date(Date.now() + 900000)
                                    }
                                ).json({
                                    message: "Successfully logged in!",
                                    organizationLoggedIn: orgRecord.name,
                                    organizationId: orgRecord._id
                                });
                            } else {
                                res.status(400).json({ message: "Invalid login credentials. Please try again." });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json({ message: "Something went wrong...", error: err });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ message: "Something went wrong...", error: err });
            });
    },

    logout: (req, res) => {
        console.log("Logging out...");
        res.clearCookie("organizationtoken");
        res.json({
            message: "Successfully logged out!"
        });
    },

    getLoggedInOrganization: (req, res) => {
        console.log("Getting logged in organization....");
        Organization.findOne({ _id: req.jwtpayload.id })
            .then((organization) => {
                console.log(organization);
                res.json(organization);
            })
            .catch((err) => {
                console.log("Couldn't get logged in organization....");
                console.log(err);
            });
    },

    findAllOrganizations: (req, res) => {
        Organization.find()
            .then((allOrganizations) => {
                res.json(allOrganizations);
            })
            .catch((err) => {
                console.log("Couldn't find all organizations");
                res.json({ message: "Something went wrong finding all the organizations.", error: err });
            });
    }
};

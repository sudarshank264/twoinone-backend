const jwt = require('jsonwebtoken');
const joi = require('joi');
const Admin = require('../models/Admin');

// Optional: you can move validation to a separate utils file or keep it here
const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const loginAdmin = async (req, res, next) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            res.status(400);
            throw new Error(error.details[0].message);
        }

        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (admin && (await admin.matchPassword(password))) {
            res.json({
                _id: admin._id,
                email: admin.email,
                token: generateToken(admin._id)
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    } catch (error) {
        next(error);
    }
};

// Seed initial admin if needed
const seedAdmin = async (req, res, next) => {
    try {
        const adminExists = await Admin.findOne({ email: 'admin@twoinone.com' });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        const admin = await Admin.create({
            email: 'admin@twoinone.com',
            password: 'newpassword123'
        });
        res.status(201).json({ message: 'Admin seeded', email: admin.email });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    loginAdmin,
    seedAdmin
};

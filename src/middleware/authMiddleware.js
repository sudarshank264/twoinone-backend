const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            if (!token || token === 'null' || token === 'undefined') {
                return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get admin from the token
            req.admin = await Admin.findById(decoded.id).select('-password');
            
            if (!req.admin) {
                 return res.status(401).json({ success: false, message: 'Not authorized, admin not found' });
            }

            next();
        } catch (error) {
            console.error('Auth error:', error.message);
            return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
    }
};

module.exports = { protect };

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Admin = require('./src/models/Admin');

const updateAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        let admin = await Admin.findOne();
        if (!admin) {
            admin = new Admin({ email: 'admin@twoinone.com', password: 'newpassword123' });
            console.log('Admin created');
        } else {
            admin.email = 'admin@twoinone.com';
            admin.password = 'newpassword123';
            console.log('Admin updated');
        }
        await admin.save();
        console.log('Done');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

updateAdmin();

const Admin = require('../models/Admin');
const Blog = require('../models/Blog');
const Service = require('../models/Service');
const PzActivity = require('../models/PzActivity');
const Lead = require('../models/Lead');

const getDashboardStats = async (req, res, next) => {
    try {
        const [
            usersCount,
            blogsCount,
            servicesCount,
            pzActivitiesCount,
            doctorLeads,
            playzoneLeads
        ] = await Promise.all([
            Admin.countDocuments(),
            Blog.countDocuments(),
            Service.countDocuments(),
            PzActivity.countDocuments(),
            Lead.countDocuments({ source: 'doctor' }),
            Lead.countDocuments({ source: 'playzone' })
        ]);

        res.json({
            totalUsers: usersCount,
            activeBlogs: blogsCount,
            services: servicesCount,
            pzActivities: pzActivitiesCount,
            doctorLeads,
            playzoneLeads
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboardStats
};
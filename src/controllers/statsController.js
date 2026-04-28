const Blog = require('../models/Blog');
const Service = require('../models/Service');
const PzActivity = require('../models/PzActivity');
const Lead = require('../models/Lead');

const getDashboardStats = async (req, res, next) => {
    try {
        const [activeBlogs, services, pzActivities, doctorLeads, playzoneLeads] = await Promise.all([
            Blog.countDocuments(),
            Service.countDocuments(),
            PzActivity.countDocuments(),
            Lead.countDocuments({ source: 'doctor' }),
            Lead.countDocuments({ source: 'playzone' })
        ]);

        res.json({
            totalUsers: 1, // Assuming admin is the only user for now
            activeBlogs,
            services,
            pzActivities,
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

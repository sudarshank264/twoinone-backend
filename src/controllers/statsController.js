const Admin = require('../models/Admin');
const Service = require('../models/Service');
const PzActivity = require('../models/PzActivity');
const Lead = require('../models/Lead');

const getDashboardStats = async (req, res, next) => {
    try {
        const [
            usersCount,
            servicesCount,
            pzActivitiesCount,
            doctorLeads,
            playzoneLeads
        ] = await Promise.all([
            Admin.countDocuments(),
            Service.countDocuments(),
            PzActivity.countDocuments(),
            Lead.countDocuments({ source: 'doctor' }),
            Lead.countDocuments({ source: 'playzone' })
        ]);

        res.json({
            totalUsers: usersCount,
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
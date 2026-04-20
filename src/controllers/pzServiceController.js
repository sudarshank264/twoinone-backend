const PzService = require('../models/PzService');
const Joi = require('joi');

const serviceSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    icon: Joi.string().optional()
});

// @desc    Get all services
// @route   GET /api/playzone/services
// @access  Public
const getServices = async (req, res) => {
    try {
        const services = await PzService.find().sort({ createdAt: -1 });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching services' });
    }
};

// @desc    Create a new service
// @route   POST /api/playzone/services
// @access  Private/Admin
const createService = async (req, res) => {
    try {
        const { error } = serviceSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const service = await PzService.create(req.body);
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Server Error creating service' });
    }
};

// @desc    Delete a service
// @route   DELETE /api/playzone/services/:id
// @access  Private/Admin
const deleteService = async (req, res) => {
    try {
        const service = await PzService.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        await service.deleteOne();
        res.status(200).json({ message: 'Service removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error deleting service' });
    }
};

module.exports = {
    getServices,
    createService,
    deleteService
};

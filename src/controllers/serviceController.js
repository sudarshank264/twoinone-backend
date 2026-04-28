const Service = require('../models/Service');
const joi = require('joi');
const fs = require('fs');
const path = require('path');

const serviceSchema = joi.object({
    title: joi.string().required(),
    shortDescription: joi.string().required(),
    mainContent: joi.string().required()
});

const getServices = async (req, res, next) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.json(services);
    } catch (error) {
        next(error);
    }
};

const getServiceById = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            res.status(404);
            throw new Error('Service not found');
        }
        res.json(service);
    } catch (error) {
        next(error);
    }
};

const createService = async (req, res, next) => {
    try {
        const { error } = serviceSchema.validate(req.body);
        if (error) {
            res.status(400);
            throw new Error(error.details[0].message);
        }

        if (!req.file) {
            res.status(400);
            throw new Error('Please upload an image');
        }

        const service = await Service.create({
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            mainContent: req.body.mainContent,
            image: `/uploads/${req.file.filename}`
        });

        res.status(201).json(service);
    } catch (error) {
        next(error);
    }
};

const updateService = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            res.status(404);
            throw new Error('Service not found');
        }

        const { error } = joi.object({
            title: joi.string(),
            shortDescription: joi.string(),
            mainContent: joi.string()
        }).validate(req.body);

        if (error) {
            res.status(400);
            throw new Error(error.details[0].message);
        }

        let updatedData = { ...req.body };

        if (req.file) {
            // Remove old image
            const oldImagePath = path.join(__dirname, '../../public/uploads', path.basename(service.image));
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            updatedData.image = `/uploads/${req.file.filename}`;
        }

        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true, runValidators: true }
        );

        res.json(updatedService);
    } catch (error) {
        next(error);
    }
};

const deleteService = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            res.status(404);
            throw new Error('Service not found');
        }

        const imagePath = path.join(__dirname, '../../public/uploads', path.basename(service.image));
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await service.deleteOne();
        res.json({ message: 'Service removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};

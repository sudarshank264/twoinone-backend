const Lead = require('../models/Lead');
const joi = require('joi');

const leadSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().allow('', null),
    age: joi.string().allow('', null),
    phone: joi.string().required(),
    service: joi.string().allow('', null),
    message: joi.string().allow('', null),
    source: joi.string().valid('doctor', 'playzone').required()
});

const getLeads = async (req, res, next) => {
    try {
        const query = {};
        if (req.query.source) {
            query.source = req.query.source;
        }
        const leads = await Lead.find(query).sort({ createdAt: -1 });
        res.json(leads);
    } catch (error) {
        next(error);
    }
};

const createLead = async (req, res, next) => {
    try {
        const { error } = leadSchema.validate(req.body);
        if (error) {
            res.status(400);
            throw new Error(error.details[0].message);
        }

        const lead = await Lead.create(req.body);
        res.status(201).json(lead);
    } catch (error) {
        next(error);
    }
};

const updateLeadStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        if (!['new', 'contacted', 'resolved'].includes(status)) {
            res.status(400);
            throw new Error('Invalid status');
        }

        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!lead) {
            res.status(404);
            throw new Error('Lead not found');
        }

        res.json(lead);
    } catch (error) {
        next(error);
    }
};

const deleteLead = async (req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            res.status(404);
            throw new Error('Lead not found');
        }

        await lead.deleteOne();
        res.json({ message: 'Lead removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getLeads,
    createLead,
    updateLeadStatus,
    deleteLead
};

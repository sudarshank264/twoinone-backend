const Blog = require('../models/Blog');
const joi = require('joi');
const fs = require('fs');
const path = require('path');

const blogSchema = joi.object({
    title: joi.string().required(),
    shortDescription: joi.string().required(),
    mainContent: joi.string().required()
});

const getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        next(error);
    }
};

const getBlogById = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            res.status(404);
            throw new Error('Blog not found');
        }
        res.json(blog);
    } catch (error) {
        next(error);
    }
};

const createBlog = async (req, res, next) => {
    try {
        const { error } = blogSchema.validate(req.body);
        if (error) {
            res.status(400);
            throw new Error(error.details[0].message);
        }

        if (!req.file) {
            res.status(400);
            throw new Error('Please upload an image');
        }

        const blog = await Blog.create({
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            mainContent: req.body.mainContent,
            image: `/uploads/${req.file.filename}`
        });

        res.status(201).json(blog);
    } catch (error) {
        next(error);
    }
};

const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            res.status(404);
            throw new Error('Blog not found');
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
            const oldImagePath = path.join(__dirname, '../../public', blog.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            updatedData.image = `/uploads/${req.file.filename}`;
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true, runValidators: true }
        );

        res.json(updatedBlog);
    } catch (error) {
        next(error);
    }
};

const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            res.status(404);
            throw new Error('Blog not found');
        }

        const imagePath = path.join(__dirname, '../../public', blog.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await blog.deleteOne();
        res.json({ message: 'Blog removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};

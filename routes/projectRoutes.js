const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Public (in production, this should be protected)
 */
router.post('/', async (req, res) => {
    try {
        const { title, description, imageUrl, technologies, liveLink, githubLink, featured } = req.body;

        // Validate required fields
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'Title and description are required'
            });
        }

        // Create new project
        const project = new Project({
            title,
            description,
            imageUrl,
            technologies: technologies || [],
            liveLink,
            githubLink,
            featured: featured || false
        });

        // Save project to database
        const savedProject = await project.save();

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: savedProject
        });

    } catch (error) {
        console.error('Error creating project:', error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/projects
 * @desc    Get all projects
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        const { featured, limit, sort } = req.query;
        
        // Build query
        let query = {};
        if (featured === 'true') {
            query.featured = true;
        }

        // Build sort options
        let sortOptions = { createdAt: -1 }; // Default: newest first
        if (sort === 'title') {
            sortOptions = { title: 1 };
        } else if (sort === 'oldest') {
            sortOptions = { createdAt: 1 };
        }

        // Execute query
        let projectsQuery = Project.find(query).sort(sortOptions);
        
        // Apply limit if specified
        if (limit && !isNaN(parseInt(limit))) {
            projectsQuery = projectsQuery.limit(parseInt(limit));
        }

        const projects = await projectsQuery.exec();

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });

    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/projects/:id
 * @desc    Get a single project by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid project ID format'
            });
        }

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            data: project
        });

    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

/**
 * @route   PUT /api/projects/:id
 * @desc    Update a project by ID
 * @access  Public (in production, this should be protected)
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Validate MongoDB ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid project ID format'
            });
        }

        // Remove fields that shouldn't be updated directly
        delete updateData._id;
        delete updateData.createdAt;

        // Add updatedAt timestamp
        updateData.updatedAt = new Date();

        const project = await Project.findByIdAndUpdate(
            id,
            updateData,
            { 
                new: true, // Return updated document
                runValidators: true // Run schema validators
            }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            data: project
        });

    } catch (error) {
        console.error('Error updating project:', error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project by ID
 * @access  Public (in production, this should be protected)
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid project ID format'
            });
        }

        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Project deleted successfully',
            data: project
        });

    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

module.exports = router;

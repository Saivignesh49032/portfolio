const mongoose = require('mongoose');

/**
 * Project Schema
 * Defines the structure for project documents in MongoDB
 */
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Project description is required'],
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    imageUrl: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                // Optional URL validation
                return !v || /^https?:\/\/.+/.test(v);
            },
            message: 'Image URL must be a valid HTTP/HTTPS URL'
        }
    },
    technologies: {
        type: [String],
        default: [],
        validate: {
            validator: function(v) {
                return v.length <= 10; // Limit to 10 technologies
            },
            message: 'Cannot have more than 10 technologies'
        }
    },
    liveLink: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                return !v || /^https?:\/\/.+/.test(v);
            },
            message: 'Live link must be a valid HTTP/HTTPS URL'
        }
    },
    githubLink: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                return !v || /^https?:\/\/.+/.test(v);
            },
            message: 'GitHub link must be a valid HTTP/HTTPS URL'
        }
    },
    featured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
projectSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create and export the Project model
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

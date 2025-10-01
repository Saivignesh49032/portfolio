const express = require('express');
const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate admin with PIN
 * @access  Public
 */
router.post('/login', async (req, res) => {
    try {
        const { pin } = req.body;

        // Validate PIN input
        if (!pin) {
            return res.status(400).json({
                success: false,
                message: 'PIN is required'
            });
        }

        // Get admin PIN from environment variables
        const adminPin = process.env.ADMIN_PIN;

        // Check if admin PIN is configured
        if (!adminPin) {
            console.error('ADMIN_PIN environment variable is not set');
            return res.status(500).json({
                success: false,
                message: 'Server configuration error'
            });
        }

        // Compare PINs
        if (pin === adminPin) {
            // Successful authentication
            res.status(200).json({
                success: true,
                message: 'Authentication successful',
                data: {
                    authenticated: true,
                    timestamp: new Date().toISOString()
                }
            });
        } else {
            // Failed authentication
            res.status(401).json({
                success: false,
                message: 'Invalid PIN',
                data: {
                    authenticated: false
                }
            });
        }

    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

/**
 * @route   POST /api/auth/verify
 * @desc    Verify if a PIN is valid (without logging in)
 * @access  Public
 */
router.post('/verify', async (req, res) => {
    try {
        const { pin } = req.body;

        // Validate PIN input
        if (!pin) {
            return res.status(400).json({
                success: false,
                message: 'PIN is required'
            });
        }

        // Get admin PIN from environment variables
        const adminPin = process.env.ADMIN_PIN;

        // Check if admin PIN is configured
        if (!adminPin) {
            console.error('ADMIN_PIN environment variable is not set');
            return res.status(500).json({
                success: false,
                message: 'Server configuration error'
            });
        }

        // Check if PIN is valid
        const isValid = pin === adminPin;

        res.status(200).json({
            success: true,
            data: {
                valid: isValid,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Error during PIN verification:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

/**
 * @route   GET /api/auth/status
 * @desc    Check authentication status
 * @access  Public
 */
router.get('/status', async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Authentication service is running',
            data: {
                service: 'Portfolio Admin Auth',
                version: '1.0.0',
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Error checking auth status:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

module.exports = router;

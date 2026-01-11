const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST /api/upload
// @desc    Upload a file
// @access  Private (Admin only ideally)
router.post('/', authMiddleware, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`/${req.file.path.replace(/\\/g, '/')}`); // Return relative path
});

module.exports = router;

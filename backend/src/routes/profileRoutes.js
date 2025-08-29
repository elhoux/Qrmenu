const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const upload = require('../middleware/upload');

router.get('/', profileController.getAllProfiles);
router.post('/', upload.single('profileImage'), profileController.createProfile);
router.get('/:id', profileController.getProfile);
router.put('/:id', upload.single('profileImage'), profileController.updateProfile);
router.delete('/:id', profileController.deleteProfile);

module.exports = router;
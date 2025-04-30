const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const apiKeyMiddleware = require('../config/apiKey');

router.use(apiKeyMiddleware);

router.get('/marcas/pdf', reportController.exportMarcasPDF);

module.exports = router;

const router = require('express').Router();
const ReportController = require('../controllers/reportController');

router.get('/', ReportController.index);

module.exports = router;

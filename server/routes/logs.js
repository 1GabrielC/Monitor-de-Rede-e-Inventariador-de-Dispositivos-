const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/logsController');

router.get('/', ctrl.list);
router.post('/', ctrl.create);

module.exports = router;

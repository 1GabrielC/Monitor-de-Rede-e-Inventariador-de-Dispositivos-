const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usuariosController');

router.post('/', ctrl.create);
router.get('/:id', ctrl.getById);

module.exports = router;

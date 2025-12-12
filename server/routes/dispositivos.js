const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/dispositivosController');

router.get('/', ctrl.list);
router.post('/', ctrl.create);
router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

// testes
router.post('/:id/teste', ctrl.runTest);
router.get('/:id/testes', ctrl.history);

module.exports = router;

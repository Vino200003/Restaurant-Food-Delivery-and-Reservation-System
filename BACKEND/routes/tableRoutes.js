const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

// Remove /tables prefix from all routes since they're mounted under /api/tables in app.js
router.post('/', tableController.createTable);
router.get('/:table_no', tableController.getTableByNo);
router.put('/:table_no', tableController.updateTableDetails);
router.get('/', tableController.getAllTables);
router.delete('/:table_no', tableController.deleteTable);	

module.exports = router;
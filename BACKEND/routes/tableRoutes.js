const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.post('/tables', tableController.createTable);
router.get('/tables/:table_no', tableController.getTableByNo);
router.put('/tables/:table_no', tableController.updateTableDetails);
router.get('/tables', tableController.getAllTables);
router.delete('/tables/:table_no', tableController.deleteTable);	

module.exports = router;
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.post('/menu', menuController.createMenu);
router.get('/menu/:menu_id', menuController.getMenuById);
router.put('/menu/:menu_id', menuController.updateMenuDetails);
router.get('/menu', menuController.getAllMenu);
router.delete('/menu/:menu_id', menuController.deleteMenu);




module.exports = router;
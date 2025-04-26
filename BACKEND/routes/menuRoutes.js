const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.post('/', menuController.createMenu);
router.get('/:menu_id', menuController.getMenuById);
router.put('/:menu_id', menuController.updateMenuDetails);
router.get('/', menuController.getAllMenu);
router.get('/category/:category_code', menuController.getMenuByCategory);
router.get('/subcategory/:subcategory_code', menuController.getMenuBySubcategory);
router.delete('/:menu_id', menuController.deleteMenu);

module.exports = router;
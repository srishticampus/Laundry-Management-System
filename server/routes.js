const express = require("express");
const router = express.Router();

const ContactUs=require('./controllers/contactController')
const ShopController=require('./controllers/shopController')

// contacts
router.post('/addContat', ContactUs.addContat);
router.post('/viewAllContacts', ContactUs.viewAllContacts);

// Shops
router.post('/addShop',ShopController.uploadSingle, ShopController.registerShop);
router.post('/viewAllShops', ShopController.viewShops);
router.post('/viewShop/:id', ShopController.viewShopById);
router.post('/editShop/:id', ShopController.uploadSingle,ShopController.editShopById);
router.post('/deleteShop/:id', ShopController.deleteShopById);
router.post('/toggleShopActivation/:id', ShopController.toggleShopActivation);

router.post('/shopLogin', ShopController.login);


module.exports = router;


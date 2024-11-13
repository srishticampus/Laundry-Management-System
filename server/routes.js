const express = require("express");
const router = express.Router();

const ContactUs=require('./controllers/contactController')
const ShopController=require('./controllers/shopController')
const Service=require('./controllers/serviceController')
const Material=require('./controllers/materialController')
const WorkingHours=require('./controllers/workingHoursController')

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

// Services
router.post('/addService', Service.addService);
router.post('/viewAllServices', Service.viewAllServices);
router.post('/viewAllServiceByShopId/:id', Service.viewAllServiceByShopId);
router.post('/viewServiceById/:id', Service.viewServiceById);
router.post('/editServiceById/:id', Service.editServiceById);


// Materials
router.post('/addMaterial', Material.addMaterial);
router.post('/viewAllMaterials', Material.viewAllMaterials);
router.post('/viewAllMaterialByShopId/:id', Material.viewAllMaterialByShopId);
router.post('/viewMaterialById/:id', Material.viewMaterialById);
router.post('/editMaterialById/:id', Material.editMaterialById);

// Materials
router.post('/viewWorkingHoursById/:id', WorkingHours.viewWorkingHoursById);
router.post('/viewWorkingHoursByShopId/:id', WorkingHours.viewWorkingHoursByShopId);
router.post('/editWorkingHoursById/:id', WorkingHours.editWorkingHoursById);
module.exports = router;


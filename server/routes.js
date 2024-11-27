const express = require("express");
const router = express.Router();

const ContactUs=require('./controllers/contactController')
const ShopController=require('./controllers/shopController')
const Service=require('./controllers/serviceController')
const Material=require('./controllers/materialController')
const WorkingHours=require('./controllers/workingHoursController')
const Customer=require('./controllers/custController')
const Order=require('./controllers/orderController')
const orderServiceController=require('./controllers/orderServiceController')
const cardController=require('./controllers/cardController')


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
router.post('/viewServiceByName/:id', Service.viewServiceByName);


// Materials
router.post('/addMaterial', Material.addMaterial);
router.post('/viewAllMaterials', Material.viewAllMaterials);
router.post('/viewAllMaterialByShopId/:id', Material.viewAllMaterialByShopId);
router.post('/viewMaterialById/:id', Material.viewMaterialById);
router.post('/editMaterialById/:id', Material.editMaterialById);
router.post('/viewMaterialByName/:id', Material.viewMaterialByName);

// Materials
router.post('/viewWorkingHoursById/:id', WorkingHours.viewWorkingHoursById);
router.post('/viewWorkingHoursByShopId/:id', WorkingHours.viewWorkingHoursByShopId);
router.post('/editWorkingHoursById/:id', WorkingHours.editWorkingHoursById);


// Customer
router.post('/registerCustomer',Customer.uploadSingle, Customer.registerCustomer);
router.post('/viewAllCustomer', Customer.viewCustomers);
router.post('/viewCustomer/:id', Customer.viewCustomerById);
router.post('/editCustomer/:id', Customer.uploadSingle,Customer.editCustomerById);
router.post('/deleteCustomerById/:id', Customer.deleteCustomerById);
Customer
router.post('/custLogin', Customer.login);





// Orders
router.post('/addOrder', Order.addOrder);
router.post('/viewAllOrders', Order.viewAllOrders);
router.post('/viewAllOrderByShopId/:id', Order.viewAllOrderByShopId);
router.post('/viewOrderById/:id', Order.viewOrderById);
router.post('/editOrderById/:id', Order.editOrderById);
router.post('/viewOrderByName/:id', Order.viewOrderByName);
router.post('/addAddressOrderById/:id', Order.addAddressOrderById);
router.post('/addPickUpDateOrderById/:id', Order.addPickUpDateOrderById);
router.post('/addPayment/:id', Order.addPayment);
router.post('/viewAllOrderByCustId/:id', Order.viewAllOrderByCustId);


//oerder services

router.post('/addServiceOrder', orderServiceController.addServiceOrder);
router.post('/viewAllServiceOrders', orderServiceController.viewAllServiceOrders);
router.post('/viewServiceOrderById/:id', orderServiceController.viewServiceOrderById);
router.post('/viewAllServiceOrdersByShopId/:shopId', orderServiceController.viewServiceOrdersByShopId);
router.post('/editServiceOrderById/:id', orderServiceController.editServiceOrderById);
router.post('/deleteServiceOrderById/:id', orderServiceController.deleteServiceOrderById);
router.post('/viewServiceOrdersBycustId/:id', orderServiceController.viewServiceOrdersBycustId);

// Card routes

router.post('/addCard', cardController.addCard);
router.post('/viewAllCardsByCustomerId/:custId', cardController.viewAllCardsByCustomerId);
router.post('/viewCardById/:id', cardController.viewCardById);
router.post('/editCardById/:shopId', cardController.editCardById);
router.post('/deleteCardById/:id', cardController.deleteCardById);
module.exports = router;


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
const agentController=require('./controllers/agentController')
const feedbackController=require('./controllers/feedbackController')
const issue=require('./controllers/issueController')


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
router.post('/viewActiveShops', ShopController.viewActiveShops);

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

router.post('/custLogin', Customer.login);
router.post('/forgotPasswordCustomer', Customer.forgotPWDsentMail);
router.post('/resetPasswordCustomer/:id', Customer.custresetpswd);




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
router.post('/viewAllOrderByCustId/:id', Order.viewAllOrderByCustId);
router.post('/viewAllDropOrderforAgent', Order.viewAllDropOrderforAgent);
router.post('/viewAllCompletedOrderByShopId/:id', Order.viewAllCompletedOrderByShopId);

router.post('/UpdateServiceStatus/:id', Order.UpdateServiceStatus);
router.post('/viewAllOrderforAgent', Order.viewAllOrderforAgent);
router.post('/approveOrderByAgent/:id', Order.approveOrderByAgent);
router.post('/approvedropOrderByAgent/:id', Order.approvedropOrderByAgent);

router.post('/viewAllAssignedOrdersByAGIdPickUp/:id', Order.viewAllAssignedOrdersByAGIdPickUp);
router.post('/viewAllAssignedOrdersByAGIdDrop/:id', Order.viewAllAssignedOrdersByAGIdDrop);
router.post('/viewAllCompletedOrdersByAGIdDrop/:id', Order.viewAllCompletedOrdersByAGIdDrop);
router.post('/viewAllCompletedOrdersByAGIdPickUp/:id', Order.viewAllCompletedOrdersByAGIdPickUp);

router.post('/viewAllServiceOrderss', Order.viewAllServiceOrders);
router.post('/updateOrderByIdonDropIssue/:id', Order.updateOrderByIdonDropIssue);
router.post('/updateOrderByIdonPickupIssue/:id', Order.updateOrderByIdonPickupIssue);


//oerder services

router.post('/addServiceOrder', orderServiceController.addServiceOrder);
router.post('/viewAllServiceOrders', orderServiceController.viewAllServiceOrders);
router.post('/viewServiceOrderById/:id', orderServiceController.viewServiceOrderById);
router.post('/viewAllServiceOrdersByShopId/:shopId', orderServiceController.viewServiceOrdersByShopId);
router.post('/editServiceOrderById/:id', orderServiceController.editServiceOrderById);
router.post('/deleteServiceOrderById/:id', orderServiceController.deleteServiceOrderById);
router.post('/viewServiceOrdersBycustId/:id', orderServiceController.viewServiceOrdersBycustId);
router.post('/viewServiceOrdersByOrderId/:id', orderServiceController.viewServiceOrdersByOrderId);

// Card routes

router.post('/addCard', cardController.addCard);
router.post('/viewAllCardsByCustomerId/:custId', cardController.viewAllCardsByCustomerId);
router.post('/viewCardById/:id', cardController.viewCardById);
router.post('/editCardById/:shopId', cardController.editCardById);
router.post('/deleteCardById/:id', cardController.deleteCardById);

// Agent
// Customer
router.post('/registerAgent',agentController.upload, agentController.registerAgent);
router.post('/viewAgents', agentController.viewAgents);
router.post('/viewAgentById/:id', agentController.viewAgentById);
router.post('/editAgentById/:id', agentController.upload,agentController.editAgentById);
router.post('/deleteAgentById/:id', agentController.deleteAgentById);
router.post('/viewApprovedAgents', agentController.viewApprovedAgents);
router.post('/viewAgentsforApproval', agentController.viewAgentsforApproval);
router.post('/agentLogin', agentController.login);
router.post('/approveAgentById/:id', agentController.approveAgentById);

router.post('/toggleAgentActivationAgent/:id', agentController.toggleAgentActivation);




// Feedback
router.post('/registerFeedback', feedbackController.registerFeedback);
router.post('/viewFeedbacks', feedbackController.viewFeedbacks);
router.post('/viewFeedbacksforLanding', feedbackController.viewFeedbacksforLanding);

// Feedback
router.post('/registerIssue', issue.registerIssue);
router.post('/viewIssues', issue.viewIssues);
router.post('/viewIssuesByShopId/:id', issue.viewIssuesByShopId);
router.post('/viewIssuesByCustId/:id', issue.viewIssuesByCustId);
router.post('/updateIssuesByShopId/:id', issue.updateIssuesByShopId);
router.post('/delIssuesById/:id', issue.delIssuesById);
router.post('/updateIssuesByCustId/:id', issue.updateIssuesByCustId);

module.exports = router;


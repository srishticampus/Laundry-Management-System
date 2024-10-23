const express = require("express");
const router = express.Router();

const ContactUs=require('./controllers/contactController')


router.post('/addContat', ContactUs.addContat);
router.post('/viewAllContacts', ContactUs.viewAllContacts);

module.exports = router;


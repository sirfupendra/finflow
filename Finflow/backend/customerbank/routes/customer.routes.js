const express=require('express');
const router=express.Router();
const customercontroller=require('../controllers/customer.controller');
router.post('/register',customercontroller.register);
router.post('/customer_data',customercontroller.customer_data);
//router.login('/login',customercontroller.login);
module.exports=router;
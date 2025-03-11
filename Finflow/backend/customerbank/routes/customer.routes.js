const express=require('express');
const router=express.Router();
const customercontroller=require('../controllers/customer.controller');
router.post('/register',customercontroller.register);
//router.login('/login',customercontroller.login);
module.exports=router;
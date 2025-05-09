const express = require('express');
const router = express.Router();
const MerchantController = require('../controllers/merchant.controller');

router.post('register',MerchantController.registerMerchant);
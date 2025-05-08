const Merchant = require('../models/merchant.model');

exports.registerMerchant = async (req, res) => {
    const{ name, accountNumber, balance } = req.body;
    try{
        const newMerchant =new Merchant({
            Name: name,
            AccountNumber: accountNumber,
            Balance: balance
        });
        await newMerchant.save();
        res.status(201).json({ message: 'Merchant registered successfully', merchant: newMerchant });

    }
    catch (error) {
        console.error('Error registering merchant:', error);
        res.status(500).json({ message: 'Error registering merchant', error });
    }
}
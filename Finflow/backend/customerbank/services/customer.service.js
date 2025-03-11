const customer = require('../models/customer.model');
const bcrypt = require('bcrypt');

exports.registercustomer = async (Name, AccountNumber, CardNumber, ExpiryDate, Cvv, Amount) => {
    try {
        const newcustomer = new customer({
            Name,
            AccountNumber,
            CardNumber,
            ExpiryDate,
            Cvv,
            Amount
        });
        console.log('New Customer Object:', newcustomer); // Debugging statement
        await newcustomer.save();
        console.log('Saved Customer:', newcustomer); // Debugging statement
        return newcustomer;
    } catch (err) {
        console.error('Service Error:', err); // Debugging statement
        throw err;
    }
}
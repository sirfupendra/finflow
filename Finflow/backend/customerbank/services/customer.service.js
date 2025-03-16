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

exports.validatecustomer = async(Name, AccountNumber, CardNumber, ExpiryDate, Cvv) => {
    // Implement validation logic here
    const customerfound = await customer.findOne({ Name, AccountNumber, CardNumber, ExpiryDate, Cvv });
    if (!customerfound) {
        return false;
    }
    return true;
}

exports.updatecustomer = async (Name, AccountNumber, CardNumber, ExpiryDate, Cvv, Amount) => {
    try {
        // Fetch the customer's current amount
        const customerfound = await customer.findOne({ Name, AccountNumber, CardNumber, ExpiryDate, Cvv });
        if (!customerfound) {
            throw new Error('Customer not found');
        }

        // Calculate the new amount
        const newAmount = customerfound.Amount - Amount;
        if (newAmount < 0) {
            throw new Error('Insufficient funds');
        }

        // Update the customer's amount
        const updatedCustomer = await customer.findOneAndUpdate(
            { Name, AccountNumber, CardNumber, ExpiryDate, Cvv },
            { Amount: newAmount },
            { new: true }
        );

        console.log('Updated Customer:', updatedCustomer); // Debugging statement
        return updatedCustomer;
    } catch (err) {
        console.error('Update Error:', err); // Debugging statement
        throw err;
    }
}
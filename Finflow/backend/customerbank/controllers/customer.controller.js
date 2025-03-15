const customerservice = require('../services/customer.service');

exports.register = async (req, res) => {
    try {
        const { Name, AccountNumber, CardNumber, ExpiryDate, Cvv, Amount } = req.body;
        console.log('Request Body:', req.body); // Debugging statement
        const customer = await customerservice.registercustomer(Name, AccountNumber, CardNumber, ExpiryDate, Cvv, Amount);
        console.log('Customer:', customer); // Debugging statement
        res.status(200).json(customer.Name + ' has been registered successfully');
    } catch (err) {
        console.error('Error:', err); // Debugging statement
        res.status(400).json(err.message);
    }
}

exports.customer_data = (req, res) => {
    try {
        const { Name, AccountNumber, CardNumber, ExpiryDate, Cvv, Amount } = req.body;
        console.table({ Name, AccountNumber, CardNumber }); // Debugging statement
        res.json({ message: "Data received successfully", receivedData: req.body });
    } catch (err) {
        console.error('Error:', err); // Debugging statement
        res.status(400).json(err.message);
    }
}
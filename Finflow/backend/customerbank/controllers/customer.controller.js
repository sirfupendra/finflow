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
        console.table({ Name, AccountNumber, CardNumber ,ExpiryDate,Cvv,Amount}); // Debugging statement
        const validcustomer = customerservice.validatecustomer(Name, AccountNumber, CardNumber, ExpiryDate, Cvv);
        if(validcustomer){
            
            customerservice.updatecustomer(Name, AccountNumber, CardNumber, ExpiryDate, Cvv, Amount);
            res.json({ 
                "status": "valid",
                "message": "payment successful", 
                "customer": Name, 
                "Amountleft": Amount 
            });
            
        }
        else{
            res.json({ message: "Data received successfully at customerbank but invalid", receivedData: req.body });
        }
       
    } catch (err) {
        console.error('Error:', err); // Debugging statement
        res.status(400).json(err.message);
    }
}
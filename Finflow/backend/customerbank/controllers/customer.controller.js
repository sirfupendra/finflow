const customerservice = require('../services/customer.service');
const customer=require('../models/customer.model');

exports.register = async (req, res) => {
    try {
        const { Name, AccountNumber, CardNumber, ExpiryDate, Cvv, Amount } = req.body;
        console.log('Request Body:', req.body); // Debugging statement
        const customer = await customerservice.registercustomer(Name, AccountNumber, CardNumber, ExpiryDate, Cvv, Amount);
        console.log('Customer:', customer); // Debugging statement
        res.status(200).json(customer.Name + ' has been registered successfully');
    } catch (err) {
        console.error('Error:', err); // Debugging statementr
        res.status(400).json(err.message);
    }
}

exports.customer_data = async (req, res) => {
    try {
        const { Name, AccountNumber, CardNumber, ExpiryDate, Cvv, Amount } = req.body;
        console.table({ Name, AccountNumber, CardNumber, ExpiryDate, Cvv, Amount }); // Debugging statement

        const validcustomer = await customerservice.validatecustomer(Name, AccountNumber, CardNumber, ExpiryDate, Cvv);
        console.log('Is Customer Valid:', validcustomer); // Debugging statement

        if (validcustomer) {
            const updatedCustomer = await customerservice.updatecustomer(Name, AccountNumber, CardNumber, ExpiryDate, Cvv, Amount);
            console.log('Updated Customer in Controller:', updatedCustomer); // Debugging statement

            res.json({
                status: "valid",
                message: "Payment successful",
                customer: updatedCustomer.Name,
                Amountleft: updatedCustomer.Amount // Send the updated amount
            });
        } else {
            res.json({ message: "Data received successfully at customerbank but invalid", receivedData: req.body });
        }
    } catch (err) {
        console.error('Error:', err); // Debugging statement
        res.status(400).json(err.message);
    }
};

exports.login= async(req,res)=>{
    try{
        const{account,cvv}=req.body;
        const Customer=await customer.findOne({AccountNumber:account,Cvv:cvv});
        if(!customer){
            throw new Error('Invalid account or cvv');
        }
        res.json({message:'Logged in successfully',Customer:Customer});
    }
    catch(err){
        console.error('Error:',err);
        res.status(400).json(err.message);
    }
}
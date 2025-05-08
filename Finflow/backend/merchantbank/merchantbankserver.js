const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const Merchant = require('./models/merchant.model'); // Adjust the path as necessary
const cors = require('cors');
const app = express();

main = async () => {
    await mongoose.connect('mongodb://localhost:27017/merchantbankdatabase');
    console.log('Database Connected');
}
main().catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('hello from merchant bank server');
});

function customEncrypt(text) {
    return Buffer.from(text).toString('base64');
}

function customDecrypt(text) {
    return Buffer.from(text, 'base64').toString('utf-8');
}
 let issuccess = false;
 let merchantdata={};
app.post('/merchantbank_data', async (req, res) => {
    const { customerobjectencrypteddata, merchantobjectencrypteddata } = req.body;
    console.log('Encrypted Customer Data:', customerobjectencrypteddata);
    console.log('Encrypted Merchant Data:', merchantobjectencrypteddata);

    try {
        const customerobjectdata = JSON.parse(customDecrypt(JSON.stringify(customerobjectencrypteddata)));
        const merchantobjectdata = JSON.parse(customDecrypt(JSON.stringify(merchantobjectencrypteddata)));
          merchantdata = merchantobjectdata;
        console.log('Decrypted Customer Data:', customerobjectdata);
        console.log('Decrypted Merchant Data:', merchantobjectdata);

        const response = await axios.post('http://localhost:3005/customer/customer_data', customerobjectdata);
        console.log('Response:', response.data);
        if(response.data.status === 'valid'){
            // now allow merchant server to send settlement request 
            issuccess = true;

            res.json({ "staus":"valid", "message":"payment successful", "customer":response.data.customer, "Amountleft":response.data.Amountleft });
        }
        else{
            res.json({ message: "Data received successfully at merchantbank but invalid", receivedData: customerobjectdata });
        }
       // res.json({ message: "Customer Data sent successfully to customerbank", response: response.data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error sending customer data');
    }


});

app.get('/getstatus',async (req,res)=>{
    if(issuccess){
        const {merchantname, merchantaccountnumber,balance}=merchantdata;
         
        
     }
})
 

app.listen(3010, () => {
    console.log('App Server is running on port 3010');
});
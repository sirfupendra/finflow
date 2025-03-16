const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const app = express();

// Define the schema and model for encrypted data
const encryptedDataSchema = new mongoose.Schema({
    customerData: Object,
    merchantData: Object
});
const EncryptedData = mongoose.model('EncryptedData', encryptedDataSchema);

main = async () => {
    await mongoose.connect('mongodb://localhost:27017/paymentgatewaydatabase');
    console.log('Database Connected');
}
main().catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('hello from payment gateway server');
});

function customEncrypt(text) {
    return Buffer.from(text).toString('base64');
}

function customDecrypt(text) {
    return Buffer.from(text, 'base64').toString('utf-8');
}

app.post('/customer-data', async (req, res) => {
    const { customerobjectdata, merchantobjectdata } = req.body;
    console.log('Request Body:', req.body); // Debugging statement
    console.log('Customer Data:', customerobjectdata);
    console.log('Merchant Data:', merchantobjectdata);

    if (!customerobjectdata || !merchantobjectdata) {
        return res.status(400).json({ error: 'Missing customer or merchant data' });
    }

    const customerobjectencrypteddata = customEncrypt(JSON.stringify(customerobjectdata));
    const merchantobjectencrypteddata = customEncrypt(JSON.stringify(merchantobjectdata));

    console.log('Encrypted Customer Data:', customerobjectencrypteddata);
    console.log('Encrypted Merchant Data:', merchantobjectencrypteddata);

    // Save non-encrypted data to the database
    const encryptedData = new EncryptedData({
        customerData: customerobjectdata,
        merchantData: merchantobjectdata
    });

    try {
        await encryptedData.save();
        console.log('Non-encrypted data saved to database');

        const response = await axios.post('http://localhost:3010/merchantbank_data', {
            customerobjectencrypteddata,
            merchantobjectencrypteddata
        });
        console.log('Response:', response.data);
        res.json({ message: "Customer and merchant Data sent successfully to merchantbank", response: response.data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error sending customer data');
    }
});

app.listen(3020, () => {
    console.log('App Server is running on port 3020');
});
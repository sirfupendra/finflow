const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
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

app.post('/merchantbank_data', async (req, res) => {
    const { customerobjectencrypteddata, merchantobjectencrypteddata } = req.body;
    console.log('Encrypted Customer Data:', customerobjectencrypteddata);
    console.log('Encrypted Merchant Data:', merchantobjectencrypteddata);

    try {
        const customerobjectdata = JSON.parse(customDecrypt(customerobjectencrypteddata));
        const merchantobjectdata = JSON.parse(customDecrypt(merchantobjectencrypteddata));

        console.log('Decrypted Customer Data:', customerobjectdata);
        console.log('Decrypted Merchant Data:', merchantobjectdata);

        const response = await axios.post('http://localhost:3005/customer/customer_data', customerobjectdata);
        console.log('Response:', response.data);
        res.json({ message: "Customer Data sent successfully", response: response.data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error sending customer data');
    }
});

app.listen(3010, () => {
    console.log('App Server is running on port 3010');
});
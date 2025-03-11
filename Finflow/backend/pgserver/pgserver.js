const express=require('express');
const app=express();

const mongoose=require('mongoose');
 main = async () => {
    await mongoose.connect('mongodb://localhost:27017/paymentgatewaydatabase');
    console.log('Database Connected');
}
main().catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('hello from payment gateway server');
});

app.post('/customer-data',(req,res)=>{
    const [customerobjectdata,merchantobjectdata]=req.body;
    console.log(customerobjectdata, merchantobjectdata);

    res.send('Customer Data is reached successfully');
})

app.listen(3020,()=>{
    console.log(' app Server is running on port 3020');
});
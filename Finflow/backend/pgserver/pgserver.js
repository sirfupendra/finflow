const express=require('express');
const app=express();

const mongoose=require('mongoose');
 main = async () => {
    await mongoose.connect('mongodb://localhost:27017/paymentgatewaydatabase', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    console.log('Database Connected');
}
main().catch(err => console.log(err));



app.get('/',(req,res)=>{
    res.send('hello from payment gateway server');
});

app.listen(3020,()=>{
    console.log(' app Server is running on port 3020');
});
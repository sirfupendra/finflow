const express=require('express');
const app=express();
const customerroutes=require('./routes/customer.routes');

const mongoose=require('mongoose');
 main = async () => {
    await mongoose.connect('mongodb://localhost:27017/customerbankdatabase');
    console.log('Database Connected');
}
main().catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('hello from customer bank server');
});

app.use('/customer',customerroutes);


app.listen(3005,()=>{
    console.log(' app Server is running on port 3005');
});
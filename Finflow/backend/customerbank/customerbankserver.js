const express=require('express');
const app=express();

const mongoose=require('mongoose');
 main = async () => {
    await mongoose.connect('mongodb://localhost:27017/customerbankdatabase', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    console.log('Database Connected');
}
main().catch(err => console.log(err));



app.get('/',(req,res)=>{
    res.send('hello from customer bank server');
});

app.listen(3005,()=>{
    console.log(' app Server is running on port 3005');
});
const express=require('express');
const app=express();

const mongoose=require('mongoose');
 main = async () => {
    await mongoose.connect('mongodb://localhost:27017/merchantbankdatabase', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    console.log('Database Connected');
}
main().catch(err => console.log(err));



app.get('/',(req,res)=>{
    res.send('hello from merchant bank server');
});

app.listen(3010,()=>{
    console.log(' app Server is running on port 3010');
});
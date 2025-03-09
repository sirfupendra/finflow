const express=require('express');
const app=express();

const mongoose=require('mongoose');
 main = async () => {
    await mongoose.connect('mongodb://localhost:27017/appdatabase', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    console.log('Database Connected');
}
main().catch(err => console.log(err));



app.get('/',(req,res)=>{
    res.send('hello from app server');
});

app.listen(3000,()=>{
    console.log(' app Server is running on port 3000');
});
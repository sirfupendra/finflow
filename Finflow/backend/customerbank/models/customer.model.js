const mongoose=require('mongoose');

const customerschema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    AccountNumber:{
        type:Number,
        required:true,
        unique:true,
        minilength:16,
        maxLength:16
    },
    CardNumber:{
        type:Number,
        required:true,
        unique:true,
        minilength:16,
        maxLength:16
    },
    ExpiryDate:{
        type:String,
        required:true
    },
    Cvv:{
        type:Number,
        required:true

    },
    Amount:{
        type:Number,
        required:true,
        min:0
    },
})

// here i will implent otp for security purpose
const customer=mongoose.model('customer',customerschema);
module.exports=customer;
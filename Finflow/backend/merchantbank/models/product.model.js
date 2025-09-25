const mongoose=require('mongoose');
const merchant=require('./merchant.model');
const productschema=new mongoose.Schema({
    ProductName:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true,
        min:0
    },
    Category:{
        type:String,
        required:true
    },
    ImageUrl:{
        type:String,
        required:false
    },
    
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'merchant',
        required:true
    }
})
const product=mongoose.model('product',productschema);
module.exports=product;
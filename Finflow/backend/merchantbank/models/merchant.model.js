const mongoose = require('mongoose');
const merchantSchema =new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    AccountNumber:{
        type:String,
        required:true
    },
    Balance:{
        type:Number,
        required:true
    }
});
const Merchant =mongoose.model('merchant',merchantSchema);
module.exports = Merchant;

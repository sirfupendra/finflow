const Merchant = require('../models/merchant.model');

exports.registerMerchant = async (req, res) => {
    const{ name, accountNumber, balance } = req.body;
    try{
        const newMerchant =new Merchant({
            Name: name,
            AccountNumber: accountNumber,
            Balance: balance
        });
        await newMerchant.save();
        res.status(201).json({ message: 'Merchant registered successfully', merchant: newMerchant });

    }
    catch (error) {
        console.error('Error registering merchant:', error);
        res.status(500).json({ message: 'Error registering merchant', error });
    }
}
   

// i will shift it in merchant server later
exports.addproduct = async(req,res)=>{
    if(!req.body.ProductName || !req.body.Price || !req.body.Category || !req.body.owner){
        return res.status(400).json({message:'All fields are required'});
    }
    if(req.body.Price<0){
        return res.status(400).json({message:'Price cannot be negative'});
    }
    try{
        const merchant=await Merchant.findById(req.body.owner);
        if(!merchant){
            return res.status(404).json({message:'Merchant not found'});
        }
        const product=new Product({
            ProductName:req.body.ProductName,
            Price:req.body.Price,
            Category:req.body.Category,
            ImageUrl:req.body.ImageUrl,
            owner:req.body.owner
        });
        await product.save();
        res.status(201).json({message:'Product added successfully',product});
    }
    catch(err){
        console.error('Error adding product:',err);
        res.status(500).json({message:'Error adding product',err});
    }

}
const Product = require('../models/productModel');

//business Logic

const getProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();

        if (!allProducts || allProducts.length === 0) {
            res.json({
                message: "There is No Product"
            });
        }

        //if we have products >= 1
        res.status(200).json({
            success: true,
            products: allProducts,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server"
        });
    }
}


const createProduct = async (req,res) => {
    try {
        const {name,price,description,category} = req.body;
        const newProduct = new Product({name, price, description, category});
        await newProduct .save();
        res.status(200).json({
            Product: newProduct
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server"
        });
    }
}


const updateProduct = async(req,res) => {
    try{
        console.log("PUT ki request aayi hai ")
        const {id} = req.params;
        const {name,price,description,category} = req.body;

        const updateProduct = await Product.findByIdAndUpdate
        (id, {name, price, description, category}, {new:true});

        if(!updateProduct) {
            res.json({
                message: "cannot find product"
            })
        }

        res.status(200).json({
            Product:updateProduct
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server"
        });
    } 
}

const deleteProduct =async (req ,res) =>{
    try{
        const {id} = req.params;
        const deleteProduct = await Product.findByIdAndDelete(id);

        if(!deleteProduct) {
            res.json({
                message: "Product not found, cannat delete"
            })
        }

        res.status(200).json({
            message: "Product Deleted Successfully",
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server"
        });
    } 
}
module.exports =  { getProducts , updateProduct , createProduct , deleteProduct};
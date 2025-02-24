import productModel from "../models/product.model.js";

// Create product
const createProduct = async (req, res) => {
    try {

        let { title, description, img, price, color, size, categories } = req.body;

        if(!title || !description || !img || !price) {
            return res.status(500).json("All fields are required");
        }

        const newProduct = await productModel.create(
            {
                title,
                description,
                img,
                price, 
                color,
                size, 
                categories
            }
        );
        if(!newProduct) {
            return res.status(500).json("Something went wrong");
        }

        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

// Update the user
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        );


        return res.status(201).json(updatedProduct);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

// Delete the user
const deleteProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        return res.status(200).json("Product deleted successfully");
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

// Get the user
const getProduct = async (req, res) => {
    try {
        const product = await productModel.findById({ _id: req.params.id });
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

// Get all the users
const getAllProducts = async (req, res) => {
    const queryNew = req.query.new;
    const queryCategory = req.query.category;
    try {
        // check if there's any query with-in the header
        // if there's query then take action based on the query
        // otherwise show all the data 

        let products;
        if(queryNew) {
            products = await productModel
            .find()
            .sort({ createdAt: -1 })
            .limit(5);
        } 
        else if(queryCategory) {
            products = await productModel.find(
                {
                    categories: {
                        $in: [queryCategory]
                    }
                }
            );
        }
        else {
            products = await productModel.find();
        }

        return res.status(200).json(products);
        
    } catch (err) {
        return res.status(500).json(err.message)
    }
};

export { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts };
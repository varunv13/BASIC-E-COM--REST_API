import cartModel from "../models/cart.model.js";

// Create Cart
const createCart = async (req, res) => {
    try {


        if(!req.body.userId) {
            return res.status(500).json("All fields are required");
        }

        const newCart = await cartModel.create( req.body );
        if(!newCart) {
            return res.status(500).json("Something went wrong");
        }

        return res.status(201).json(newCart);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

// Update the cart
const updateCart = async (req, res) => {
    try {
        const updatedCart = await cartModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        );


        return res.status(201).json(updatedCart);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

// Delete the user
const deleteCart = async (req, res) => {
    try {
        await cartModel.findByIdAndDelete(req.params.id);
        return res.status(200).json("Cart deleted successfully");
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

// Get the user
const getCart = async (req, res) => {
    try {
        const Cart = await cartModel.findOne({ userId: req.params.userId });
        return res.status(200).json(Cart);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

// Get all the users
const getAllCarts = async (req, res) => {
    const queryNew = req.query.new;
    const queryCategory = req.query.category;
    try {
        // check if there's any query with-in the header
        // if there's query then take action based on the query
        // otherwise show all the data 

        let Carts;
        if(queryNew) {
            Carts = await cartModel
            .find()
            .sort({ createdAt: -1 })
            .limit(5);
        } 
        else if(queryCategory) {
            Carts = await cartModel.find(
                {
                    categories: {
                        $in: [queryCategory]
                    }
                }
            );
        }
        else {
            Carts = await cartModel.find();
        }

        return res.status(200).json(Carts);
        
    } catch (err) {
        return res.status(500).json(err.message)
    }
};

export { createCart, updateCart, deleteCart, getCart, getAllCarts };
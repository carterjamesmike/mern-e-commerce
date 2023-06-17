const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
    userId: {
        type: String,
    },
    products: [{
        productId: {
            type: String,
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity must be at least 1"],

        },
        price: Number
    }],
    total: {
        type: Number,
        required: true,
        default: 0,
    },
});

const Cart = model("Cart", cartSchema);

module.exports = Cart;

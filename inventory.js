const express = require('express');
const router = express.Router();

// internal data structures for the implementation

let inventory = {}; // { productId: quantity }
let carts = {}; // { customerId: { productId: quantity } }
let discounts = {}; // { discountId: { discountPercentage: number, maxDiscountCap: number } }


// (1) AddItemToInventory(productId, quantity)

router.post("/add-item-to-inventory", (req, res) => {
    const { productId, quantity }  = req.body;

    if(!productId || !quantity){
        return res.status(400).json({
            success: false,
            message: "Please Provide productId and quantity"
        });
    }

    if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid quantity. Quantity should be a positive number."
        });
    }


    if (!inventory[productId]) {
        inventory[productId] = 0;
        
    }

    inventory[productId] += quantity;
    
    res.status(200).json({
        success: true,
        message:`Added ${quantity} units of product ${productId} to inventory`
      });
});

// (2) RemoveItemFromInventory(productId, quantity)

router.put("/remove-item-from-inventory", (req, res) => {

    const { productId, quantity } = req.body;

    if(!productId || !quantity){
        return res.status(400).json({
            success: false,
            message: "Please Provide productId and quantity"
        });
    }

    if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid quantity. Quantity should be a positive number."
        });
    }

    if (!inventory[productId] || inventory[productId] < quantity) {

        return res.status(400).json({
            success: false,
            message: `Insufficient quantity in inventory. Available quantity: ${inventory[productId] || 0}`
            
        })
    }

    inventory[productId] -= quantity;
    
    res.status(200).json({
        success: true,
        message:`Removed ${quantity} units of product ${productId} from inventory`
    })
});

// (3) AddItemToCart(customerId, productId, quantity)

router.post("/add-item-to-cart", (req, res) => {
    const { customerId, productId, quantity } = req.body;

    if(!customerId || !productId || !quantity){
        return res.status(400).json({
            success: false,
            message: "Please Provide customerId, productId and quantity"
        });
    }

    
    if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid quantity. Quantity should be a positive number."
        });
    }

    if (!inventory[productId] || inventory[productId] < quantity) {
        return res.status(400).json({
            success: false,
            message: `Insufficient quantity in inventory. Available quantity: ${inventory[productId] || 0}`
            
        })
    }

    if (!carts[customerId]) {
        carts[customerId] = {};
    }

    if (!carts[customerId][productId]) {
        carts[customerId][productId] = 0;
    }

    carts[customerId][productId] += quantity;

    res.status(200).json({
        success:true,
        message: `Added ${quantity} units of product ${productId} to customer ${customerId}'s cart`
    });

})

// (4) ApplyDiscountCoupon(cartValue, discountId)
router.post("/apply-discount", (req, res) => {
    const { cartValue, discountId } = req.body;

    if(!cartValue || !discountId){
        return res.status(400).json({
            success: false,
            message: "Please Provide cartValue and discountId"
        });
    }

    
    if (typeof cartValue !== 'number' || cartValue <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid cartValue. cartValue should be a positive number."
        });
    }

    if (!discounts[discountId]) {

        return res.status(400).json({
            success:false,
            message:"Invalid discount ID"
        });
    }

    const discount = discounts[discountId];
    const discountAmount = (cartValue * discount.discountPercentage) / 100;
    const cappedDiscount = Math.min(discountAmount, discount.maxDiscountCap);

    const discountedValue = cartValue - cappedDiscount;

    res.status(200).json({
        success:true,
        message:`Final cart value after discount: ${discountedValue}`,
        discount:`Discounted amount: ${cappedDiscount}`
    });

});

// API to get the cart data 

router.get("/getcart-details",(req, res) => {

    const {customerId} = req.body;

    if(!carts[customerId]){
        return res.status(400).json({
            success: false,
            message: `Cart is Empty for the Customer ${customerId}.`
        });
    }

    res.json(carts[customerId]);
    
})



// API to add a new discount coupon

router.post("/add-coupon-code", (req, res) => {

    const { discountId, discountPercentage, maxDiscountCap } = req.body;

    if (!discountId || isNaN(discountPercentage) || discountPercentage < 0 || isNaN(maxDiscountCap) || maxDiscountCap < 0) {

        return res.status(400).json({
            success:false,
            message:"Invalid input data"
        });
    }

    discounts[discountId] = {
        discountPercentage: parseFloat(discountPercentage),
        maxDiscountCap: parseFloat(maxDiscountCap),
    };

    res.status(200).json({ 
        success:true,
        message: `Added discount ${discountId} with ${discountPercentage}% discount and max cap of ${maxDiscountCap}`
    });
});

// Setup a discount for testing
discounts["SUMMER20"] = {
    discountPercentage: 20,
    maxDiscountCap: 150,
};

module.exports = router;
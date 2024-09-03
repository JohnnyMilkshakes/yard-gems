import Cart from "../models/cart.js";
import Item from "../models/item.js";
import User from "../models/user.js";
import mongoose from "mongoose";

// Get Cart by User ID
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId).populate('itemsInCart')

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a Cart for a User
export const createCart = async (req, res) => {
  try {
    const existingCart = await Cart.findOne({ cartOwner: req.params.userId });

    if (existingCart) {
      return res
        .status(400)
        .json({ error: "Cart already exists for this user" });
    }

    const newCart = await Cart.create({
      cartOwner: req.params.userId,
      itemsInCart: [],
      totalCost: 0,
    });

    let user = await User.findById(req.params.userId);

    user.cart = newCart._id;

    user.save();

    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Item to Cart
export const addItemToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { itemId, quantity } = req.body;

    const cart = await Cart.findOne({ cartOwner: userId });
    const item = await Item.findById(itemId);

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Check if item is already in the cart
    const existingItemIndex = cart.itemsInCart.findIndex(
      (cartItem) => cartItem._id.toString() === itemId
    );

    if (existingItemIndex > -1) {
      // Update quantity if the item is already in the cart
      cart.itemsInCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to the cart
      cart.itemsInCart.push({ _id: itemId, quantity });
    }

    // Update the total cost of the cart
    cart.totalCost += item.price * quantity;

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { userId, cartId } = req.params;
    let { itemsInCart } = req.body;

    console.log("Received itemsInCart:", itemsInCart);

    const validatedItems = [];

    // Check if each item exists in the database
    for (const itemId of itemsInCart) {
      // Check if the itemId is a valid ObjectId
      if (mongoose.Types.ObjectId.isValid(itemId)) {
        // Check if the item exists in the database
        const itemExists = await Item.findById(itemId);
        if (itemExists) {
          validatedItems.push(itemExists._id); // Add the ObjectId to the validatedItems array
        } else {
          console.log(`Item not found: ${itemId}`);
        }
      } else {
        console.log(`Invalid ObjectId: ${itemId}`);
        return res.status(400).json({ error: `Invalid item ID: ${itemId}` });
      }
    }

    // Find the cart by ID
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Update the cart's itemsInCart with the validated items
    cart.itemsInCart = validatedItems;

    // Save the updated cart
    await cart.save();

    // Return the updated cart
    return res.status(200).json(cart);
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error updating cart:", error);
    return res.status(500).json({ error: error.message });
  }
};
// Delete Item from Cart
export const deleteItemFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    const cart = await Cart.findOne({ cartOwner: userId });
    const item = await Item.findById(itemId);

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Find the item in the cart
    const itemIndex = cart.itemsInCart.findIndex(
      (cartItem) => cartItem._id.toString() === itemId
    );

    if (itemIndex > -1) {
      const removedItem = cart.itemsInCart[itemIndex];

      // Adjust the total cost
      cart.totalCost -= removedItem.quantity * item.price;

      // Remove the item from the cart
      cart.itemsInCart.splice(itemIndex, 1);

      await cart.save();

      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import Cart from "../models/cart.js";
import Item from "../models/item.js";
import User from "../models/user.js";

// Get Cart by User ID
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId ).populate("cart");

    if (user) {
      res.status(200).json(user.cart);
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
      return res.status(400).json({ error: "Cart already exists for this user" });
    }

    const newCart = await Cart.create({
      cartOwner: req.params.userId,
      itemsInCart: [],
      totalCost: 0,
    });

    await User.findByIdAndUpdate(req.params.userId, { cart: newCart._id });

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

// Update Cart (Update quantity of items)
export const updateCart = async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ cartOwner: userId });
    const item = await Item.findById(itemId);

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Find the item in the cart
    const existingItemIndex = cart.itemsInCart.findIndex(
      (cartItem) => cartItem._id.toString() === itemId
    );

    if (existingItemIndex > -1) {
      const existingItem = cart.itemsInCart[existingItemIndex];

      // Adjust the total cost
      cart.totalCost -= existingItem.quantity * item.price;
      existingItem.quantity = quantity;
      cart.totalCost += quantity * item.price;

      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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


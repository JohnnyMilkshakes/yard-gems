import Cart from "../models/cart.js";
import ForSaleItem from "../models/forSaleItem.js"; // Assuming you have a model for items for sale
import User from "../models/user.js";

// Get the cart for the logged-in user
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ cartOwner: req.user._id }).populate('itemsInCart');

    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new cart or add an item to the existing cart
export const createCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // Check if the user already has a cart
    let cart = await Cart.findOne({ cartOwner: user._id });

    if (!cart) {
      // Create a new cart if the user doesn't have one
      cart = new Cart({ cartOwner: user._id, itemsInCart: [] });
    }

    const item = await ForSaleItem.findById(req.body.itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found." });
    }

    // Add item to cart
    cart.itemsInCart.push(item._id);
    cart.totalCost += item.price;

    await cart.save();

    // Associate the cart with the user if it's a new cart
    if (!user.cart) {
      user.cart = cart._id;
      await user.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update the quantity of an item in the cart
export const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ cartOwner: req.user._id }).populate('itemsInCart');

    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    const { itemId, quantity } = req.body;
    const item = await ForSaleItem.findById(itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found." });
    }

    const itemIndex = cart.itemsInCart.findIndex(i => i._id.toString() === itemId);
    
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not in cart." });
    }

    // Update total cost before changing quantity
    const oldQuantity = cart.itemsInCart[itemIndex].quantity || 1;
    cart.totalCost += item.price * (quantity - oldQuantity);

    cart.itemsInCart[itemIndex].quantity = quantity;

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an item from the cart
export const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ cartOwner: req.user._id });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    const { itemId } = req.params;
    const itemIndex = cart.itemsInCart.indexOf(itemId);

    if (itemIndex > -1) {
      const item = await ForSaleItem.findById(itemId);
      cart.totalCost -= item.price;
      cart.itemsInCart.splice(itemIndex, 1);
      await cart.save();
      return res.status(200).json(cart);
    }

    res.status(404).json({ error: "Item not found in cart." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import YardSale from "../models/yard-sale.js";
import User from "../models/user.js";
import Item from "../models/item.js";
import mongoose from "mongoose";


export const getYardSale = async (req, res) => {
  try {
    const yardSale = await YardSale.findById(req.params.yardId).populate('itemsForSale');

    if (yardSale) {
      res.status(200).json({ yardSale });
    } else {
      res.status(401).json({ error: "Not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getYardSales = async (req, res) => {
  try {
    let yardSales = await YardSale.find();
    res.json(yardSales);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createYardSale = async (req, res) => {
  req.body.yardOwner = req.params.userId;

  try {
    let user = await User.findById(req.params.userId);

    const newYardSale = await YardSale.create(req.body);

    user.yardSale = newYardSale._id
    
    user.save()

    res.status(201).json(newYardSale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateYardSale = async (req, res) => {
  try {

    const { userId, yardId } = req.params;
    let { itemsForSale } = req.body;

    console.log("Received itemsForSale:", itemsForSale);

    const validatedItems = [];

    // Check if each item exists in the database
    for (const itemId of itemsForSale) {
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
    const yardSale = await YardSale.findById(yardId);

    if (!yardSale) {
      return res.status(404).json({ error: "YardSale not found" });
    }

    // Update the cart's itemsInCart with the validated items
    yardSale.itemsForSale = validatedItems;

    // Save the updated cart
    await yardSale.save();

    res.status(201).json(yardSale);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteYardSale = async (req, res) => {
  try {
    const { yardId } = req.params;
    const deleted = await YardSale.findByIdAndDelete(yardId);

    if (deleted) {
      return res.status(200).send("Yard Sale Deleted!");
    }

    throw new Error("Yard Sale not found");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

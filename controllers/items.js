import Item from "../models/item.js";
import User from "../models/user.js";
import YardSale from "../models/yard-sale.js";

export const getItem = async (req, res) => {
  try {
    console.log(req.params.itemId)
    const item = await Item.findById(req.params.itemId);

    if (item) {
      res.status(200).json({ item });
    } else {
      res.status(401).json({ error: "Not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await Item.find()
    res.status(201).json(items)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createItem = async (req, res) => {
    req.body.itemOwner = req.params.userId
  try {
    let user = await User.findById(req.params.userId)

    let yardSale = await YardSale.findById(user.yardSale)

    const newItem = await Item.create(req.body)

    yardSale.itemsForSale.push(newItem)

    yardSale.save()

    res.status(201).json(newItem)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { itemId } = req.params;    

    const item = await Item.findByIdAndUpdate(itemId, req.body);
    res.status(201).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const deleted = await Item.findByIdAndDelete(itemId);

    if (deleted) {
      return res.status(200).send("Item Deleted!");
    }

    throw new Error("Cart not found");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

import Item from "../models/item.js";
import User from "../models/user.js";

export const getItem = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getItems = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createItem = async (req, res) => {
    req.body.itemOwner = req.params.userId
  try {
    const newItem = await Item.create(req.body)
    res.status(201).json(newItem)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Item.findByIdAndDelete(id);

    if (deleted) {
      return res.status(200).send("Cart Deleted!");
    }

    throw new Error("Cart not found");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

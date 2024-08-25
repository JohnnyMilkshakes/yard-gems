import Cart from "../models/cart.js";


export const getCart = async (req, res) => {
    try {


    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

export const createCart = async (req, res) => {
    try {

      } catch (error) {
        res.status(400).json({ error: error.message });
      }

};

export const updateCart = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cart.findByIdAndDelete(id);

    if (deleted) {
      return res.status(200).send("Cart Deleted!");
    }

    throw new Error("Cart not found");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

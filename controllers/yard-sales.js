import YardSale from "../models/yard-sale.js";


export const getYardSale = async (req, res) => {
    try {


    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

export const getYardSales = async (req, res) => {
    try {


    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

export const createYardSale = async (req, res) => {
    try {

      } catch (error) {
        res.status(400).json({ error: error.message });
      }

};

export const updateYardSale = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteYardSale = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await YardSale.findByIdAndDelete(id);

    if (deleted) {
      return res.status(200).send("Cart Deleted!");
    }

    throw new Error("Cart not found");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
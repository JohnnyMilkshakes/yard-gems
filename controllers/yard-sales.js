import YardSale from "../models/yard-sale.js";

export const getYardSale = async (req, res) => {
  try {
    const yardSale = await YardSale.findById(req.params.yardId);

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
    const newYardSale = await YardSale.create(req.body);
    res.status(201).json(newYardSale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateYardSale = async (req, res) => {
  try {
    const { yardId } = req.params;

    const updatedYardSale = await YardSale.findByIdAndUpdate(yardId, req.body);
    res.status(201).json(updatedYardSale);
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

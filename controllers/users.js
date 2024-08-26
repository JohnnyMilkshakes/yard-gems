import User from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(401).json({ error: "Not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // filter out the password to prevent accidental overwrite
    const {password, ...filteredBody} = req.body

    const user = await User.findByIdAndUpdate(userId, filteredBody);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deleted = await User.findByIdAndDelete(userId);

    if (deleted) {
      return res.status(200).send("User Deleted!");
    }

    throw new Error("User not found");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

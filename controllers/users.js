import User from "../models/Users.js";

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

      const user = await User.findOne({ username: req.body.username });

      if (user && bcrypt.compareSync(req.body.password, user.password)) {

        const token = jwt.sign(
          { username: user.username, _id: user._id },
          process.env.JWT_SECRET
        );

        res.status(200).json({ token });

      } else {

        res.status(401).json({ error: 'Invalid username or password.' });

      }
    } catch (error) {

      res.status(400).json({ error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        // Check if the username is already taken
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (userInDatabase) {
          return res.json({ error: 'Username already taken.' });
        }
        // Create a new user with hashed password
        const user = await User.create({
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, SALT_LENGTH),
        });
        const token = jwt.sign(
          { username: user.username, _id: user._id },
          process.env.JWT_SECRET
        );
        res.status(201).json({ user, token });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }

};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);

    if (deleted) {
      return res.status(200).send("User Deleted!");
    }

    throw new Error("User not found");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

import User from "../models/user.js";

async function  identityCheck(req, res, next) {
  try {

    const user = await User.findById(req.params.userId);

    // check to ensure the user ID of the auth token matches the ID found in the request
    if (req.user._id !== req.params.id){ 
        return res.status(401).json({ error: "Unauthorized"})
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
}

export default identityCheck;
const User = require("../models/User");

const authenticateJWT = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return res
      .status(401)
      .send({ message: "User is not authorized to proceed" });
  const user = new User();
  try {
    const decoded = user.verifyJWT(token);
    req.user = await User.findById({ _id: decoded.data._id });
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "User is not authorized to proceed" });
  }
};

module.exports = {
  authenticateJWT,
};

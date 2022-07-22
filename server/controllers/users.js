const User = require("../models/User");

const createAccount = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(405).send({ message: "User info is not valid" });

  const isUserExists = await User.findOne({ username });

  if (isUserExists)
    return res
      .status(405)
      .send({ message: "User already exists", isExist: true });
  const user = new User({ username, books: [] });

  await user.setPassword(password);
  try {
    const newUser = await user.save();
    res
      .status(201)
      .send({ user: newUser, message: "User created successfully" });
  } catch (error) {
    res.status(405).send({ message: "Unable to create a user", error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user)
    return res
      .status(401)
      .send({ message: "Username or password is not correct" });

  const isPasswordValid = await user.validatePassword(password);
  if (!isPasswordValid)
    return res
      .status(401)
      .send({ message: "Username or password is not correct" });

  user.generateJWT((err, token) => {
    if (err)
      return res
        .status(401)
        .send({ message: "Unable to generate a token", logError: err });
    res.status(200).send({ token });
  });
};

const getUserInfo = async (req, res) => {
  try {
    const user = await req.user;
    const { hashedPass, salt, ...userInfo } = user?._doc;
    return res.status(201).send({ user: userInfo });
  } catch (error) {
    return res
      .status(401)
      .send({ logError: error, message: "Unable to get user info" });
  }
};

const getGeneratedBookToken = async (req, res) => {
  try {
    const user = await req.user;
    const generatedBookToken = await user.generatedBookToken();
    return res.status(201).send({ bookToken: generatedBookToken });
  } catch (error) {
    return res.status(401).send({
      logError: error,
      message: "Unable to get user presisted book token",
    });
  }
};

module.exports = {
  createAccount,
  login,
  getUserInfo,
  getGeneratedBookToken,
};

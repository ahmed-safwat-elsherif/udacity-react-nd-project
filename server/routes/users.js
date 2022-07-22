const {
  createAccount,
  login,
  getUserInfo,
  getGeneratedBookToken,
} = require("../controllers/users");
const { authenticateJWT } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/create", createAccount);
router.post("/login", login);
router.get("/info", authenticateJWT, getUserInfo);
router.get("/mybookstoken", authenticateJWT, getGeneratedBookToken);

module.exports = router;

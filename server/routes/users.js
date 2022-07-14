const { createAccount, login, getUserInfo } = require("../controllers/users");
const { authenticateJWT } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/create", createAccount);
router.post("/login", login);
router.get("/info", authenticateJWT, getUserInfo);

module.exports = router;

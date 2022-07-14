const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema(
  {
    username: { type: String, unique: true },
    hashedPass: String,
    salt: String,
  },
  {
    timestamps: true,
    methods: {
      async setPassword(password) {
        this.salt = await bcrypt.genSalt(10);
        this.hashedPass = await bcrypt.hash(password, this.salt);
      },
      async validatePassword(password) {
        return await bcrypt.compare(password, this.hashedPass);
      },
      generateJWT(callback) {
        const privateKey = process.env.JWT_PRIVATE_KEY;
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        jwt.sign(
          {
            data: { username: this.username, _id: this._id },
            // exp: Math.floor(Date.now() / 1000) + 60 * 60, // Signing a token with 1 hour of expiration
          },
          privateKey,
          null,
          callback
        );
      },
      verifyJWT(token) {
        const privateKey = process.env.JWT_PRIVATE_KEY;
        return jwt.verify(token, privateKey);
      },
    },
  }
);

module.exports = model("User", UserSchema);

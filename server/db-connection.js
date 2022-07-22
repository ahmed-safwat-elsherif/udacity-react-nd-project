const mongoose = require("mongoose");
const dbConfig = require("./config/db");
main().catch((err) => {
  console.log({ err });
});

async function main() {
  await mongoose.connect(dbConfig.mongoUrl);
}

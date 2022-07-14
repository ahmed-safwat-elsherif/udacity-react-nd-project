module.exports = {
  mongoUrl: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.5tbd5.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`,
};

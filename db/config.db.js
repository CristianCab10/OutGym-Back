const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));
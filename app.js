const express = require("express");
const mongoose = require("mongoose");
const postRoute = require("./api/routes/postRoute");
const commentRoute = require("./api/routes/commentRoute");

const app = express();
const port = 3000;

mongoose.connect("mongodb://127.0.0.1/apinode");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

postRoute(app);
commentRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

var corsOptions = {
    origin: process.env.CLIENT_ORIGIN
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const DBUSER = process.env.MONGODB_USER;
const DBPASS = process.env.MONGODB_PASSWORD;
const DBNAME = process.env.MONGODB_DATABASE;
mongoose
  .connect(
      `mongodb+srv://${DBUSER}:${DBPASS}@cluster0.vq4uo.mongodb.net/${DBNAME}`
      , { useNewUrlParser: true }
  )
  .then(() => {
      app.listen(process.env.NODE_LOCAL_PORT);
  })
  .catch((err) => {
    console.log(err);
  });
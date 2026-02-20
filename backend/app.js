const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const Book = require("./models/Book");
const User = require("./models/User");

mongoose
  .connect(
    "mongodb+srv://datauser1:user1234@cluster0.fmuonpl.mongodb.net/?appName=Cluster0",
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !", error));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});

app.post("/api/auth/signup", (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.post("/api/auth/login", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      if (user.password !== req.body.password) {
        return res.status(401).json({ error: "Mot de passe incorrect !" });
      }
      res.status(200).json({ userId: user._id });
    })
    .catch((error) => res.status(500).json({ error }));
});

module.exports = app;

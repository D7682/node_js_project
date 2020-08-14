const path = require("path");
const dotenv = require("dotenv").config({ path: "./config/.env" });
const fetch = require("node-fetch");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", async (req, res) => {
  let city = req.body.city;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.SECRET_KEY}&units=imperial`;
  let response = await fetch(url)
    .then((response) => response.json())
    .then((response) => (data = response))
    .then((data) =>
      res.render("index", {
        weather: `It's ${data.main.temp} degress in ${data.name}!`,
        error: null,
      })
    )
    .catch((err) =>
      res.render("index", {
        weather: null,
        error: "Error, please try again!",
      })
    );
});

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

const express = require('express');

const app = express();
const port = 5000;

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("landing");
});

app.listen(port, () => console.log(`Yelp Camp is running on http://127.0.0.1:${port}`));
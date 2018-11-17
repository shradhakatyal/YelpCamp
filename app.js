const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

const app = express();
const port = 5000;

// Setting up the Schema

const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render("landing");
});

// Getting all the camp grounds
app.get('/campgrounds', (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if(err) {
            res.json({err});
        } else {
            res.render("campgrounds", {campgrounds});
        }
    });
});

app.get('/campgrounds/new', (req, res) => {
    res.render("new");
});

app.post('/campgrounds', (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let campground = {name, image};
    Campground.create(campground, (err, cg) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
});

app.listen(port, () => console.log(`Yelp Camp is running on http://127.0.0.1:${port}`));
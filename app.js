const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const Campground = require('./models/campground');
const seedDB = require('./seeds');

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

const app = express();
const port = 5000;

// seedDB();

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

app.get('/campgrounds/:id', (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground});
        }
    });
});

app.post('/campgrounds', (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let campground = {name, image, description};
    console.log(campground);
    Campground.create(campground, (err, cg) => {
        if(err) {
            console.log(err);
        } else {
            console.log(cg);
            res.redirect("/campgrounds");
        }
    });
});

app.listen(port, () => console.log(`Yelp Camp is running on http://127.0.0.1:${port}`));
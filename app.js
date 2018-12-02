const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
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
            res.render("campgrounds/campgrounds", {campgrounds});
        }
    });
});

app.get('/campgrounds/new', (req, res) => {
    res.render("campgrounds/new");
});

app.get('/campgrounds/:id', (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
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

// ========================
// COMMENTS ROUTE
// ========================

app.get('/campgrounds/:id/comments/new', (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(!err) {
            res.render("comments/new", {campground});
        }
    });
    
});

app.post('/campgrounds/:id/comments', (req, res) => {
    // console.log(req.body.comment);
    // res.redirect('/campgrounds/'+req.params._id);
    Campground.findById(req.params.id, (err, cg) => {
        if(err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err);
                } else {
                    cg.comments.push(comment);
                    cg.save();
                    res.redirect("/campgrounds");
                }
            });
        }
    })
});

app.listen(port, () => console.log(`Yelp Camp is running on http://127.0.0.1:${port}`));
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

let campgrounds = [
    {name: "Salmon Creek", image: "http://campingsehnsucht-lwl-blog.de/wp-content/uploads/sites/517/2018/02/best-camping-spots-in-pa-6-624x435.jpg"},
    {name: "Granite Hill", image: "https://www.planetware.com/photos-large/USSD/south-dakota-black-hills-national-forest-horsethief-lake-campground-tent-site.jpg"},
    {name: "Mountain Goats Rest", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/munmorah-state-conservation-area/freemans-campground/freemans-campground-03.jpg"}
]

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render("landing");
});

// Getting all the camp grounds
app.get('/campgrounds', (req, res) => {
    res.render("campgrounds", {campgrounds});
});

app.post('/campgrounds', (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let campground = {name, image};
    campgrounds.push(campground);
    res.redirect("/campgrounds");
});

app.listen(port, () => console.log(`Yelp Camp is running on http://127.0.0.1:${port}`));
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
    {
        name: "Cloud's rest",
        image: "https://www.nps.gov/shen/planyourvisit/images/20170712_A7A9022_nl_Campsites_BMCG_960.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
        description: "A dummy describes a dummy campground"
    },
    {
        name: "Doggo Ground",
        image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg",
        description: "A dummy describes a dummy campground"
    },
    {
        name: "Caravan Park",
        image: "https://img.sunset02.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/image/2016/10/main/hoodview-campground-0510.jpg?itok=xo0RuR6u",
        description: "A dummy describes a dummy campground"
    }
];

const seedDB = () => {
    // Remove all campgrounds
    Campground.deleteMany({}, (err) => {
        if(err) {
            console.log(err);
        }
        console.log("Campgrounds removed");
        // Add a few dummy campgrounds
        data.forEach((cg) => {
            Campground.create(cg, (err, campground) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Added a campground");

                    // Create a commment
                    Comment.create(
                        {
                            text: "This place is great",
                            author: "Homer"
                        }, (err, comment) => {
                            if(err) {
                                console.log(err);
                            } else {
                                // Associating comment with the particular campground.
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a new comment");
                            }
                            
                        });
                }
            });
        });
    });

    
}

module.exports = seedDB;

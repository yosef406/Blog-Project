const express = require('express');
const cors = require('cors');
const imageRoute = express.Router();
const ImageSchema = require('../models/Images.model');

// imageRoute.use(express.json());

imageRoute.post('/new', (req, res) => {
    // console.log("new Image: ", req.body);
    const image = new ImageSchema(req.body);
    image.save().then((result) => {
        res
            .status(200)
            .json({ message: "image saved", success: true });
    }).catch((err) => {
        res
            .status(500)
            .json({ message: "image not saved", success: false, error: err });
    });

});

imageRoute.get('/all', (req, res) => {
    ImageSchema.find({}, { _id: 1 }).then((result) => {
        if (result) res
            .status(200)
            .json({ message: "images found", success: true, images: result });
        else res
            .status(500)
            .json({ message: "cant find images", success: false });

    }).catch((err) =>
        res
            .status(500)
            .json({ message: "cant find images", success: false, error: err })
    )
});

imageRoute.get('/:id', (req, res) => {
    console.log("new image fetch: ", req.params.id);
    ImageSchema.findById(req.params.id).then((result) => {
        if (result) res
            .status(200)
            .json({ message: "images found", success: true, image: result });
        else res
            .status(500)
            .json({ message: "cant find images", success: false });

    }).catch((err) =>
        res
            .status(500)
            .json({ message: "cant find images", success: false, error: err })
    )
});

module.exports = imageRoute;
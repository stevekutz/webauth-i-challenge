const express = require('express');
const router = express.Router();
const Restricted = require('./restricted-model')


// GET ALL items in restricto table
router.get('/', async (req, res) => {
    try {
        const colors = await Restricted.getColors();
        res.status(200).json(colors);
     } 
     catch(err) {
         res.status(500).json({
            message: `Can't get any restricted colors`,
            error: err,
         })
     }
});

router.post('/', async(req, res) => {
    if(req.body.fav_color === '') {
        res.status(400).json({
            message: `you need to enter a color`
        })
    } else {
        const color = await Restricted.addColors(req.body);
        res.status(200).json(color);
    }

})



// DON'T FORGET THIS !!!!!!!!
module.exports = router;
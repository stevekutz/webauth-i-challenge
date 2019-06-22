const express = require('express');  // MUST add this, not needed in other routers
const router = express.Router();
const Restricted = require('./restricted-model')


// GET ALL color items in restricto table
router.get('/colors', async (req, res) => {
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

// GET all food items in restricto table
router.get('/foods', async (req, res) => {
    await Restricted.getFoods()
        .then(foods => {
            res.status(451).json(foods);
        })
        .catch(err => res.send(err));
})


router.get('/words', (req, res) => {
    Restricted.getWords()
        .then(words => {
            res.status(452).json(words);
        })
        .catch(err => res.send(err));
})



// ADD to restricto table
router.post('/', async(req, res) => {
    if(req.body.fav_color === '') {
        res.status(400).json({
            message: `you need to enter a color`
        })
    } else {
        const color = await Restricted.add(req.body);
        res.status(200).json(color);
    }

})



// DON'T FORGET THIS !!!!!!!!
module.exports = router;
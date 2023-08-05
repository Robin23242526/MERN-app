const express = require('express')
const router = express.Router()

router.post('/FoodData', (req , res) => {
    try{
        res.send([global.food_items, global.food_category])
    } catch(err) {
        console.error(err.message);
        res.send("server error")
    }
});
module.exports = router
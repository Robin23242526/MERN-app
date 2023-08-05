const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const SecKey = "qwerasdftyuioplkjhgfvbnmcxzadgjl";
router.post('/create', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const salt  = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password , salt);
        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPass
            })
            res.json({ success: true });
        } catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    });
router.post('/loginuser',[
    body('email').isEmail(),
    body('password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userdata = await User.findOne({ email });
            if (!userdata) {
                return res.status(400).json({ err: "try logging with correct credentials mail " })
            }
            const pwdchecker = bcrypt.compare(req.body.password,userdata.password);
            if (!pwdchecker) {
                return res.status(400).json({ err: "try logging with correct credentials pass" })
            }

            const data = {
                user: {
                    id: userdata.id
                }
            }
            const authToken = jwt.sign(data, SecKey);
            return res.json({ success: true, authToken: authToken });
        } catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    });
module.exports = router;
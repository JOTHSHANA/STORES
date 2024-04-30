const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const path = require('path');
require('dotenv').config({path:path.resolve(__dirname,'../../.env')});

const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback route
router.get("/google/callback", 
    passport.authenticate("google", { failureRedirect: "/login" }),
    function(req, res) {
        req.user.token = generateToken(req.user, 600, req.user.name, req.user.role_id);
        console.log("token:", req.user.token);
        const redirectUrl = new URL(process.env.CLIENT_URL + "/dashboard?token=" + req.user.token);
        redirectUrl.searchParams.append('token', req.user.token);
        redirectUrl.searchParams.append('role', req.user.role_id);
        redirectUrl.searchParams.append('name', req.user.name);
        res.redirect(redirectUrl.toString());
    }
);

const generateToken = (user, expiresIn, name, role_id) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    return jwt.sign({ userId: user.id, name:name, role:role_id }, JWT_SECRET, { expiresIn:'1h' });
};

module.exports = router;

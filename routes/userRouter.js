const express = require('express')
const router = express.Router()





// Register user route 
router.post("/register", (req, res)=>{
    res.send("Register user!!");
})

// Login user router
router.post("/login", (req, res)=>{
    res.send("Login user!!");
})

// Check user route 
router.get("/check", (req, res)=>{
    res.send("Register user!!");
})

module.exports  = router  
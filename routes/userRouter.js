const express = require('express')
const router = express.Router()

// User controllers 

const {register, login, check} = require("../controller/userController") 




// Register user route 
router.post("/register", register)

// Login user router
router.post("/login", login );


// Check user route 
router.get("/check", check)

module.exports = router  
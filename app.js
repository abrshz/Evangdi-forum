const express = require('express')
const app = express()
const port = 2025

// User routes middleware 
const userRouter = require("./routes/userRouter")


// User routes middleware
app.use("/api/users", userRouter)



app.listen(port, (err)=>{
    if (err){
    console.log(err.message)
    }else {
        console.log(`Listening on ${port}`);
    }
})
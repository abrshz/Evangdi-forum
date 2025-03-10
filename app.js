const express = require('express')
const app = express()
const port = 2025

// DB connection 
const dbConnection = require("./db/dbConfigue")

// User routes middleware 
const userRouter = require("./routes/userRouter")

// Jason middleware 
app.use(express.json())


// User routes middleware
app.use("/api/users", userRouter)

async function start() {
    try {
        const result = await dbConnection.execute("select 'test' ")
        app.listen(port)
        console.log("Database connected ")
        console.log(`Listening in ${port}`);
    }   catch (error) {
            console.log(error.message);
        }
}

start()
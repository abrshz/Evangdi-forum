const mysql = require("mysql2");

const dbConnection = mysql.createPool({
    user: "evangadiAdmin",
    database: "evangadi_db",
    host: "localhost",
    password: "123456",
    connectionLimit: 10
})



module.exports = dbConnection.promise()
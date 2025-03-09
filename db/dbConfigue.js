const mysql = require("mysql2");

const dbconnection = mysql.createPool({
    user: "evangadiAdmin",
    database: "evangadi_db",
    host: "localhost",
    password: "123456",
    connectionLimit: 10
})

dbconnection.execute("select  'test' ", (err, result) => {
    if (err) {
        console.log(err);
        } else {
            console.log(result);
        }
})
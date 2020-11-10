const mysql = require('mysql');

const sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "chatapp"
})

sql.connect((err) => {
    if(err){
        throw err;
    }
    console.log("database connected");
})

module.exports = sql
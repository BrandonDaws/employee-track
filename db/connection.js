const mysql = require('mysql2');
require('dotenv').config();

// create connection to our database, pass in your MySQL information for username and password
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "employee_tracker_db"
});
db.connect(err => {
    if(err) throw err
        console.log("successfully connected to db!") 
        
    
})
module.exports = db;
const express = require('express');
const app = express();
const http = require('http');
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const url = require('url')
const port = 666;


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "chatapp"
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    console.log('nouvelle connection')
})

app.listen(port, () => {
    console.log(`Server listening at port : ${port}`)
})

app.post('/', (req, res) => {

    // let lucas = {
    //     pseudo: lucas,
    //     password: lucas
    // }

    // con.connect(function (err) {
    //     if (err) throw err;
    //     console.log("connected");
    //     var sql = `INSERT INTO user(pseudo, password) VALUES (${lucas.pseudo}, ${lucas.password}) `;
    //     con.query(sql, function (err, result) {
    //         if (err) throw err;
    //         console.log("Register information saved.");
    //     });
    // });
})
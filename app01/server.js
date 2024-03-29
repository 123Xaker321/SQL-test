const express = require('express');
const mysql = require('mysql');
const app = express();
const port = "3000";
const createPath = require('./helpers/create-path');
const { create } = require('domain');

//createPool() for big apps
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: null,
    database: "users"
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log("connection successful")
});
app.use(express.urlencoded({ extended: true}))
app.use(express.static('app01/public/css'));
app.get("/", (req, res) => {
    res.sendFile(createPath('index'))
})
app.get("/register", (req, res) => {
    res.sendFile(createPath('register'));
})
app.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try{
        const sql = `SELECT COUNT(*) AS count FROM users WHERE email = "${email}"`;
        db.query(sql, (err, result, fields) => {
            if (result[0].count > 0) {
            res.status(401).send('Такий користувач вже існує');
        } else {
            db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
            res.send('Ваші дані успішно занесені до бази даних')
        }
        })
        
        
    }
    catch(err){
        console.log(err);
        res.status(500).send("Помилка серверу - 500")
    }

})
app.get("/login", (req, res) => {
    res.sendFile(createPath('login'));
})
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try{
        const sql = `SELECT COUNT(*) AS count FROM users WHERE email = "${email}" AND password = ${password}`;
        db.query(sql, (err, result, fields) => {
            if (result[0].count > 0) {
            res.status(200).send('Ви ввійшли в акаунт!');
        } else {
            res.send('Неправильний логін або пароль')
        }
        })
        
        
    }
    catch(err){
        console.log(err);
        res.status(500).send("Помилка серверу - 500")
    }

})
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
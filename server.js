const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());


// Replace with your database configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'testdb'
});

connection.connect();

app.post('/search', (req, res) => {
    const userInput = req.body.userInput;
    const query = `SELECT * FROM users WHERE username = '${userInput}'`;

    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error in database operation');
        } else {
            res.json(results);
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

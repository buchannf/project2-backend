const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function rowToObject(row) {
        return {
                author: row.author,
                message: row.message,
		id: row.id,
        };
}

app.get('/quotes', (request, response) => {
        const query = 'SELECT author, message, id FROM quote WHERE is_deleted = 0';
        const params = [request.params.author, request.params.message, request.params.id];
        connection.query(query, params, (error, rows) => {
                response.send({
                        ok: true,
                        quotes: rows.map(rowToObject),
                });
        });
});


app.get('/quotes/:author', (request, response) => {
        const query = 'SELECT author, message, id FROM quote WHERE is_deleted = 0';
        const params = [request.params.author, request.params.message];
        connection.query(query, params, (error, rows) => {
                response.send({
                        ok: true,
                        quotes: rows.map(rowToObject),
                });
        });
});


app.post('/quotes', (request, response) => {
        const query = 'INSERT INTO quote(author, message) VALUES (?, ?)';
        const params = [request.body.author, request.body.message];
        connection.query(query, params, (error, result) => {
                response.send({
                        ok: true,
                        id: result.insertID,
                });
        });
});

app.patch('/quotes/:id', (request, response) => {
        const query = 'UPDATE quote SET author = ?, message = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
        const params = [request.body.author, request.body.message, request.params.id];
        connection.query(query, params, (error, result) => {
                response.send({
                        ok: true,
                });
        });
});

app.delete('/quotes/:id', (request, response) => {
        const query = 'UPDATE quote SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
        const params = [request.params.id];
        connection.query(query, params, (error, result) => {
                response.send({
                        ok: true,
                });
        });
});


const port = 3442;
app.listen(port, () => {
        console.log(`We're live on port ${port}`);
});


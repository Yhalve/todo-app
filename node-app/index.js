const express = require('express');

const mysql = require('mysql2');

const app = express();

app.use(express.json());



// MySQL connection
 const db = mysql.createConnection({

   host: process.env.MYSQL_HOST || 'db',

     user: process.env.MYSQL_USER || 'root',

       password: process.env.MYSQL_PASSWORD || 'password',

         database: 'todo_db'

         });

         db.connect(err => {

           if (err) throw err;

             console.log('MySQL connected');

             });
// Create table

             db.query(`

               CREATE TABLE IF NOT EXISTS todos (

                   id INT AUTO_INCREMENT PRIMARY KEY,

                       task VARCHAR(255) NOT NULL,

                           completed BOOLEAN DEFAULT FALSE

                             )
                             `);


// GET all todos
                             app.get('/todos', (req, res) => {

                               db.query('SELECT * FROM todos', (err, results) => {

                                   if (err) throw err;
                                       res.json(results);
                                         });
                                         });

// POST a todo
                                         app.post('/todos', (req, res) => {

                                           const { task } = req.body;

                                             db.query('INSERT INTO todos (task) VALUES (?)', [task], (err, result) => {

                                                 if (err) throw err;

                                                     res.json({ id: result.insertId, task, completed: false});
					     });
				          });

app.listen(3000,() => console.log('Server running on port 3000'));

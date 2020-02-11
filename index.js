const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Value*12',
    database : 'mydb',
    port : 3306,
    insecureAuth : true
    

});

connection.connect(err => {
    if(err) {
        console.log(err);  
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('list of tasks')
});

app.get('/tasks/add', (req, res) => {
    const { item } = req.query;
    const Insert_Tasks_Query = `INSERT INTO todolist (taskdata) VALUES ('${item}')`
    connection.query(Insert_Tasks_Query, (err, results) => {
        if(err) {return res.send(err)}
        else {res.send("Success")}
    });
});

app.get('/tasks/delete', (req, res) => {
    const { id } = req.query;
    const Delete_Task_Query = `DELETE FROM todolist WHERE taskid='${id}'`
    connection.query(Delete_Task_Query, (err, results) => {
        if(err) {return res.send(err)}
        else {res.send("Deleted")}
    });
});

app.get('/tasks/deleteAll', (req, res) => {
    const Delete_All_Tasks_Query = 'DELETE FROM todolist';
    connection.query(Delete_All_Tasks_Query, (err, results) => {
        if(err) {return res.send(err)}
        else {res.send("Done")}
    });
});

app.get('/tasks', (req, res) => {
    const Select_All_Tasks_Query = 'SELECT * FROM todolist';
    connection.query(Select_All_Tasks_Query, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else{
            return res.json({
                data: results
            })
        }
    })
});

app.listen(4000, () => {
    console.log('Welcome');
});
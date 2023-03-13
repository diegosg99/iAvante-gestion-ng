const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require('mysql');
const moment = require('moment');


const formatComplete = 'YYYY-MM-DD HH:mm:ss'

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'asistencia'
});

connection.connect();

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '500mb'}));

app.get('/courses/name',(req,res) => {
    try{
        let sql = `SELECT code,name FROM cursos;`;
        connection.query(sql, function(err, rows, fields) {
            if (err) throw err;
            res.status(200).send({rows});
            });
    }catch(error){
        res.status(400).send({msg:"Error"});
    }
})

app.get('/students/course/:id',(req,res) => {
  try{
      let data = req.params.id;
      let sql = `SELECT dni,name,surname FROM alumnos WHERE course = '`+data+`';`;
      connection.query(sql, function(err, rows, fields) {
          if (err) throw err;
          res.status(200).send({rows});
          });
  }catch(error){
      res.status(400).send({msg:"Error"});
  }
})

app.get('/students',(req,res) => {
  try{
      let sql = `SELECT * FROM alumnos;`;
      connection.query(sql, function(err, rows, fields) {
          if (err) throw err;
          res.status(200).send({rows});
          });
  }catch(error){
      res.status(400).send({msg:"Error"});
  }
})

app.get('/student/data/:id',(req,res) => {
  try{
      let data = req.params.id;
      let sql = `SELECT * FROM alumnos WHERE dni = '`+data+`';`;
      connection.query(sql, function(err, rows, fields) {
          if (err) throw err;
          res.status(200).send({rows});
          });
  }catch(error){
      res.status(400).send({msg:"Error"});
  }
})

app.get('/courses',(req,res) => {
  try{
      let sql = `SELECT * FROM cursos;`;
      connection.query(sql, function(err, rows, fields) {
          if (err) throw err;
          res.status(200).send({rows});
          });
  }catch(error){
      res.status(400).send({msg:"Error"});
  }
})

app.get('/course/documentation/:courseCode',(req,res) => {
  let courseCode = req.params.courseCode;
  try{
      let sql = `SELECT documentationUrl FROM cursos WHERE code = '${courseCode}';`;
      connection.query(sql, function(err, rows, fields) {
          if (err) throw err;
          res.status(200).send({rows});
          });
  }catch(error){
      res.status(400).send({msg:"Error"});
  }
})

app.put('/student/update',(req,res) => {
  try{
    let data = req.body;

    let timestamp = moment().unix();

    let sql = `UPDATE alumnos 
                  SET dni='${data.dni}',
                  name='${data.name}',
                  surname='${data.surname}',
                  email='${data.email}',
                  phone='${data.phone}',
                  details='${data.details}',
                  rights='${data.rights}',
                  entry='${moment.unix(timestamp).format("YYYY-MM-DD HH:mm:ss")}'
                  WHERE dni = '${data.dni}';`;

    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        res.status(200).send("exito");
        });
  }catch(error) {
    res.status(400).send(req);
  }
})

app.post('/courses/uploadExcel',(req,res) => {
  try{
    let data = req.body;

//IF NOT EXISTS (select code from cursos where code='${item.code}')
//...
//BEGIN
//...

    data.forEach(item =>{
      let sql = `INSERT INTO cursos VALUES ('${item.id}','${item.code}','${item.name}','${item.tutor}','${item.room}','${item.day}','${item.documentation}')`;

    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        res.status(200).send("exito");
        });
    })
  }catch(error) {
    res.status(400).send(req);
  }
})

app.listen(3003, () =>
  console.log(`¡Aplicación escuchando en el puerto 3003!`),
);
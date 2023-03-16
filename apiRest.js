const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require('mysql');
const moment = require('moment');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const formatComplete = 'YYYY-MM-DD HH:mm:ss'

const SECRET = "614f4f4a6568e9ae881c76e8753f65c9";

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'asistencia'
});

const adminDB = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'iavante'
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
        res.status(200).send(data);
        });
  }catch(error) {
    res.status(400).send(req);
  }
})

app.post('/courses/uploadExcel',(req,res) => {
  try{
    let data = req.body;

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

//---------------------->  Control de administradores  <-------------------------

app.post('/admins/register',async (req,res) => {
  try{
    let item = req.body;
    let encodedPassword = await encodePassword(item.password);
    console.log(encodedPassword);

    let sql = `INSERT INTO admins VALUES ('${item.id}','${item.name}','${item.dni}','${item.username}','${item.email}','${item.phone}','${encodedPassword}','${item.photo}')`;

    adminDB.query(sql, function(err, rows, fields) {
        if (err) throw err;
        res.status(200).send("exito");
    });

  }catch(error) {
    res.status(400).send(item,req);
  }
})

app.post('/admins/login', async (req,res) => {
  try{
    let data = req.body;
    
    console.log(data);

    const token = jwt.sign(data.username,SECRET);
    data.token = token;

    let sql = `SELECT username,password FROM admins WHERE username = '${data.username}'`;

    adminDB.query(sql, function(err, rows, fields) {

    bcrypt.compare(data.password,rows[0].password).then(bool=>{

      if (bool===true) {
        res.status(200).send(data);
      }
      
      else{
        res.status(300).send("Credenciales incorrectas");
      }   
    });   
  })
  }catch(error) {
    res.status(400).send(req);
  }
})


app.get('/admins/checkToken/:token',(req,res) => {
  try{
    let token = req.params.token;
    let username = jwt.verify(token,SECRET);
  
    res.status(200).send(JSON.stringify(username))
  
  }catch(error) {
    res.status(400).send(req);
  }
})

//--------------------Encode/Decode Passwords---------------------------

encodePassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

comparePassword = async (plaintextPassword, hash) => {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}
//----------------------------------------------------
app.listen(3003, () =>
  console.log(`¡Aplicación escuchando en el puerto 3003!`),
);
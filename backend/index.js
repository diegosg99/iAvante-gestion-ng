//-------------------------------- SETTINGS --------------------------------

const express = require("express");
const cors = require("cors");
const mysql = require('mysql');
const moment = require('moment');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const morgan = require('morgan');
//const {connection,adminDB} = require ('./database');  --------------------> externalizacion de BD pero da error

            //---------------------- CONSTS
const formatComplete = 'YYYY-MM-DD HH:mm:ss'
const PORT = 3003;
const SECRET = "614f4f4a6568e9ae881c76e8753f65c9";

const app = express();
app.set('port', process.env.PORT || PORT)

            //----------------------BD Alumnos
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'asistencia'
});
            //----------------------BD Admin
const adminDB = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'iavante'
});

connection.connect(err => {
  err ?console.error('error connecting: ' + err.stack)
  :console.log('connected as id ' + connection.threadId);
});
adminDB.connect(err => {
  err ?console.error('error connecting: ' + err.stack)
      :console.log('connected as id ' + connection.threadId);
});

//--------------------------------------- MIDDLEWARES --------------------------------------

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({limit: '500mb'}));

          //-------------Encode/Decode Passwords------------------

encodePassword = async (password) => {
const hash = await bcrypt.hash(password, 10);
return hash;
}

comparePassword = async (plaintextPassword, hash) => {
const result = await bcrypt.compare(plaintextPassword, hash);
return result;
}

//--------------------------------------- ROUTES -------------------------------------------

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

app.get('/course/room/:courseCode',(req,res) => {
let courseCode = req.params.courseCode;
try{
    let sql = `SELECT room FROM cursos WHERE code = '${courseCode}';`;
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

app.get('/course/:courseCode',(req,res) => {
let courseCode = req.params.courseCode;
try{
    let sql = `SELECT * FROM cursos WHERE code = '${courseCode}';`;
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        res.status(200).send(rows[0]);
        });
}catch(error){
    res.status(400).send({msg:"Error"});
}
})

app.post('/courses/uploadExcel',(req,res) => {
try{
  let data = req.body;

  data.forEach(item =>{
    let sql = `INSERT IGNORE INTO cursos VALUES ('${item.id}','${item.code}','${item.name}','${item.tutor}','${item.room}','${item.day}','${item.documentation}')`;

  connection.query(sql, function(err, rows, fields) {
      if (err) throw err;
      res.status(200).send("exito");
      });
  })
}catch(error) {
  res.status(400).send(req);
}
})

app.post('/students/uploadExcel',(req,res) => {
try{
  let data = req.body;

  data.forEach(item =>{
    let sql = `INSERT IGNORE INTO alumnos VALUES ('${item.dni}','${item.name}','${item.surname}','${item.email}',${item.phone},'${item.details}','${item.course}','${item.rights}','${item.entry}','${item.exit}')`;

  connection.query(sql, function(err, rows, fields) {
      if (err) throw err;
      //res.status(200).send("exito");
      });
  })
}catch(error) {
  res.status(400).send(req);
}
})

app.post('/upload/survey', (req,res) => {
  let item = req.body;
  console.log(item);
  let sumglobal = (item.question1 + item.question2 + item.question3);
  let global = (sumglobal/3).toFixed(2);

  let sql = `INSERT INTO valoracion VALUES ('${item.id}','${item.course}','${item.student}',${item.question1},${item.question2},${item.question3},'${item.question4}', ${global})`;

  res.status(200).send("exito");
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

app.get('/admins/admin/:username', (req,res) => {
  try{
    let data = req.params.username;
  
    let sql = `SELECT * FROM admins WHERE username = '${data}'`;

    adminDB.query(sql, function(err, rows, fields) {
      res.status(200).send(rows[0]);
      
  })
  }catch(error) {
    res.status(400).send(req);
  }
})


app.get('/admins/checkToken/:token',(req,res) => {
try{
  let token = req.params.token;
  let username = jwt.verify(token,SECRET);

  res.status(200).send(username)

}catch(error) {
  res.status(400).send(req);
}
})

//-------------------- Start Server ------------------------------------
app.listen(PORT, () =>
console.log(`¡Aplicación escuchando en el puerto ${app.get('port')}!`),
);
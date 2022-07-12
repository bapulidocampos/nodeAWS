'use strict';

const express = require('express');
const config = require('./config.js');
const cors = require( 'cors' ); 
var bodyParser=require('body-parser');
//para crear un id
const uuidv4 = require('uuid/v4');
//para leer el archivo}
const fs = require('fs');
const json_books = fs.readFileSync('./db/db.json', 'utf-8');
let books = JSON.parse(json_books);

// Constants
const PORT = config.PORT;
const HOST = config.HOST;

// App
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET -----------------------------------------
app.get('/', (req, res) => {
  // res.send('Hola mundo desde pruebaAWS');
  res.json(books);

});
// --------------------------------------------------------

//POST ----------------------------------------------------
app.post('/', (req, res) => {

  const { nombre, apellido} = req.body;
  var newPerson = {
    id: uuidv4(),
    nombre,
    apellido,
  }
  //  agregar un nuevo producto al array
  books.push(newPerson);
  const json_books = JSON.stringify(books);
  fs.writeFileSync('./db/db.json', json_books, 'utf-8');
  res.send('Persona creada con exito');
});
// ---------------------------------------------------------

// PUT------------------------------------------------------
app.put('/:id',(req,res) =>{
  //buscamos a todos los productos menos el enviamos 
  books = books.filter(book => book.id != req.params.id);
  //agregamos el objeto modificado
  books.push(req.body);
  //guardamos en el archivo
  const json_books = JSON.stringify(books);
  fs.writeFileSync('./db/db.json', json_books, 'utf-8');
  res.status(200).send("persona modificado");
})
// ---------------------------------------------------------

// DELETE --------------------------------------------------
app.delete('/:id',(req,res) =>{
  books = books.filter(book => book.id != req.params.id);
     // guardando informacion
  const json_books = JSON.stringify(books);
  fs.writeFileSync('./db/db.json', json_books, 'utf-8');
  res.status(200).send("persona eliminada");
})
// ---------------------------------------------------------



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
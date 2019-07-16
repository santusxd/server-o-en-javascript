const express = require('express');
const mongoose = require ('mongoose');
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config({path: './variables.env'});

mongoose.connect(process.env.DATABASE);


mongoose.connection.on('error', function(error){


console.log('Error de mongoose:', error);

});




app.use(bodyParser());

app.get('/', function(req,res){
    res.send('Hola!');


})

app.listen(process.env.PORT, function(){
    console.log('Escuchando...');

})
app.get('/jaja', function(req,res){
    res.send('loco');
    

})

app.get("/nuevapersona", function (req,res){
    const miPersona = new modeloPersona({
        name:"Ionut",
        username:"Iountsito",
        email:"ionut@example.com",
        password:"juegolol",
        age: 15
    })
    miPersona.save().then(function(){
        res.send('Persona guardada');
    })
})
require("./Schemas/Persona");
const modeloPersona = mongoose.model('Persona');

app.get('/personas', function(req,res){
    
    const search = {
        username: req.query.name
    }
   modeloPersona.find(search).then(function(users){

       res.send(users);
   })
})

const express = require('express');
const app = express ();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require ('dotenv').config({path:'./variables.env'});
require('./Models/Device');
require('./Models/Data');

mongoose.connect(process.env.DATABASE);
mongoose.connection.on('error', function(error){
    console.log('Database error:', error);
})
app.use(bodyParser());
app.use(cors());

app.get('/', function(req,res){
    res.send('It works!');
});

const routes = require('./Routes/routes');

app.use('/', routes);

app.listen(process.env.PORT, function(){
console.log('App listening on port', process.env.PORT);

});



const mongoose = require('mongoose');
const DataModel = mongoose.model('Data');

module.exports.saveData = function(req, res){
    const deviceId = req.body.deviceId;
    const value = req.body.value;

        if(!deviceId){
            res.status(400).send('Missing Id');
        }

    const newData = new DataModel({
        device: deviceId,
        value : value

    });
    newData.save().then(function(data){
        if(data){
            res.status(200).send("Dato guardado correctamente")

        } else {
            res.status(400).send("El dato no se guardó correctamente")
        }
    })
}

module.exports.getDeviceData = function(req,res){
    const deviceId = req.query.id;
    DataModel.find({device:deviceId}).then(function(data){
        if(data){
            res.status(200).json(data);

        } else {
            res.status(404).send('No data found');

        }
    })
}
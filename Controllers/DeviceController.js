const mongoose = require('mongoose');
const DeviceModel = mongoose.model('Device');
const nodemailer = require('nodemailer');
require('dotenv').config({path: '../variables.env'});
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.createDevice = function (req, res) {
    const name = req.body.name;
    const type = req.body.type;
    if (!name) {
        res.status(400).send('Missing name');
    }

    const newDevice = new DeviceModel({
        name: name,
        type: type

    });
    newDevice.save().then(function (device) {
        if (device) {
            res.status(200).send('Device created');
        }
        else {
            res.status(400).send('Device creaton failed');
        }
    })
};

module.exports.getDevices = function (req, res) {
    DeviceModel.find({}).then(function (devices) {
        res.json(devices);
    });
};


module.exports.getDevicesById = function (req, res) {
    const deviceId = req.query.id;
    DeviceModel.findById(deviceId).then(function (device) {
        if (device) {
            res.json(device);
        } else {
            res.status(404).send('No device found with this id');
        }
    })
        .catch(function (error) {
            console.log(error);
        })

}


module.exports.updateDevice = function (req, res) {

    const deviceId = req.body.deviceId;
    const newStatus = req.body.status;
    DeviceModel.findByIdAndUpdate(deviceId, { status: newStatus }).then(function (device) {
        if (device) {
            res.status(200).send('Device Updated')

        } else {
            res.status(400).send('No se pudo device update')
        }

    });

};

module.exports.sendEmail = function(req,res){
    const deviceId = req.body.device;
    const date = new Date();
    const formattedDate = date.toISOString();
    const msg = {
        from: 'santiago.bar.mor@techtalents.club',
        to:'santiagodelbarriomorales@gmail.com',
        subject:`Alert from device: ${deviceId} || Date: ${formattedDate}`,
        text: `Alert from device: ${deviceId} || Date: ${formattedDate}`,
        html: `<h1>Alert from device: ${deviceId} || Date: ${formattedDate}</h1>`
    };

sgMail.send(msg).then(function(message){
    console.log(message);
    if (message){
        res.status(200).send('Email sent');
    }
})

    


}



const mongooose = require('mongoose')
const Schema = mongooose.Schema;
const config = {
    value:{
        type: Number,
        default:0,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now()
    },
    device:{
        type: mongooose.Schema.ObjectId,
        ref: 'Device',
        required: true
    }
};
const DataSchema = new Schema(config);
module.exports = mongooose.model('Data', DataSchema);
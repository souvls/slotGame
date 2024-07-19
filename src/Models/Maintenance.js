const mongoose = require('mongoose')
const condb = require('../config/condb');


let MaintenanceSchema = mongoose.Schema({
    Online: {
        type: Boolean,
        required: true
    },
    DateStart:{
        type: Date
    },
    DateEnd:{
        type: Date
    }
});

let Maintenance = condb.model("maintenance", MaintenanceSchema);
module.exports = Maintenance;
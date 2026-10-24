const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema({
    device_id:{
        type: String,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    humidity:{
        type: Number,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("SensorData", sensorDataSchema);
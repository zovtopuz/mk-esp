const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    time: { type: String, required: true },
    name: { type: String, required: true }
});

module.exports = model('time', schema);
const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    onTime: { type: String, required: true }
});

module.exports = model('on1', schema);
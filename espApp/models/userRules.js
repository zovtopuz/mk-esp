const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    userNameOs: { type: String, required: true },
    nameTypeOs: { type: String, required: true },
    NameOfHost: { type: String, required: true },
    allTime: { type: String, required: true }
});

module.exports = model('user_data', schema);
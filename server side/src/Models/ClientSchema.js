const mongoose = require("mongoose");

const ClientSchem = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
})

const clientModel = new mongoose.model('Client', ClientSchem)
module.exports = clientModel

const mongoose = require("mongoose");

const ClientSchem = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
})


module.exports = new mongoose.model('Client', ClientSchem)

const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: String,
    description: String,
    imageUrl: String,
    type: String,
    hostId: Number
});

module.exports = mongoose.model("cars",customerSchema);
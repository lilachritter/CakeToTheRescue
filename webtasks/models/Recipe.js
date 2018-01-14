const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: String,
    image: String,
    recipe_url: String,
	ingredients: [String],
    id: mongoose.Schema.ObjectId
})
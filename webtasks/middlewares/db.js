var mongoose = require('mongoose');
const RecipeSchema = require('../models/Recipe');

module.exports = {
    connectDisconnect: (req, res, next) => {
        // Create connection using Mongo Lab URL
        const connection = mongoose.createConnection(req.webtaskContext.secrets.MONGO_URL);
        
        req.recipeModel = connection.model('Recipe', RecipeSchema);
        req.on('end', () => {
            mongoose.connection.close();
        });
        next();
    }
}
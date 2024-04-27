const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
mongoose.set('strictQuery', true);
// Connection to the database "recipe-app"
mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(x => {
        console.log(`Connected to the database: "${x.connection.name}"`);
        // Before adding any recipes to the database, let's remove all existing ones
        return Recipe.deleteMany()
    })
    .then(() => {
        // Run your code here, after you have insured that the connection was made
    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    });

Recipe.create({
        title: 'tomato',
        level: 'Easy Peasy',
        ingredients: ['Ingredient 1', 'Ingredient 2'],
        cuisine: 'Cuisine Type',
        dishType: 'main_course',
        image: 'https://example.com/image.jpg',
        duration: 30,
        creator: 'Your Name',
        created: new Date()
    })
    .then(recipe => {
        console.log(recipe.title);
    })
    .catch(error => {
        console.error(error);
    });


Recipe.insertMany(data)
    .then((result) => {
        result.forEach((recipe) => {
            console.log(recipe.title);
        });
    })
    .catch((error) => {
        console.error(error);
    });
Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true }, (err, updatedRecipe) => {
    if (err) {
        console.log("Error updating recipe:", err);
    } else {
        console.log("Recipe updated successfully:", updatedRecipe);
    }
});
Recipe.deleteOne({ title: 'Carrot Cake' }, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Carrot Cake recipe successfully removed from the database');
    }
});
mongoose.connection.close();
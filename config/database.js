// Create the mongoose object to connect to MongoDB
const mongoose = require('mongoose');

// Call the connect method with the MongoDB URI from environment variables
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    // If the connection was successful, print a message in the console for debugging purposes
    console.log('MongoDB connected to DB:', mongoose.connection.name);
  })
  .catch(err => console.log(err)); // If there was an error, print it in the console as well

// Export the module
module.exports = mongoose;

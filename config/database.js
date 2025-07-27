const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected to DB:', mongoose.connection.name);
  })
  .catch(err => console.log(err));

module.exports = mongoose;

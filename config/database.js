const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected to DB:', mongoose.connection.name);

    // Sync counter after connection
    const User = require('../models/User');
    const Counter = require('../models/Counter');

    const maxUser = await User.findOne().sort({ id: -1 }).select('id');
    const maxId = maxUser ? maxUser.id : 0;

    await Counter.findOneAndUpdate(
      { name: 'userId' },
      { $set: { value: maxId } },
      { upsert: true }
    );

    console.log('User counter initialized to', maxId);
  })
  .catch(err => console.log(err));

module.exports = mongoose;

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    minlength: [5, 'A board name must have 5 or more characters'],
    maxlength: [20, 'A board name must have 20 or less characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  notes: [Object],
  mileage: Number,
});

module.exports = mongoose.model('Board', schema);

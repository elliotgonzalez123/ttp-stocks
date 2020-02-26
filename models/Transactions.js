const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  transactions: [
    {
      symbol: {
        type: String,
        require: true
      },
      qty: {
        type: Number,
        require: true
      },
      price: {
        type: Number,
        require: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = User = mongoose.model('transactions', TransactionSchema);

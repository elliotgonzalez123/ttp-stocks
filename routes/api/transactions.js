require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Transactions = require('../../models/Transactions');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const iex = require('iexcloud_api_wrapper');

router.get('/', auth, async (req, res) => {
  try {
    let userTransactions = await Transactions.findOne({
      user: req.user.id
    });

    if (!userTransactions) {
      return res.status(200).send('No transactions made');
    }
    const transactions = userTransactions.transactions;
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err.message);
  }
});

router.post(
  '/',
  [
    check('symbol', 'Stock symbol is required')
      .not()
      .isEmpty(),
    check('qty', 'Please include a valid quantity').isInt({ gt: 0 })
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { symbol, qty } = req.body;
    const quoteData = await iex.quote(symbol);
    const { latestPrice } = quoteData;

    try {
      let user = await User.findById(req.user.id);
      let userTransactions = await Transactions.findOne({ user: req.user.id });
      if (!userTransactions) {
        userTransactions = new Transactions({
          user: req.user.id,
          transactions: [{ symbol, qty, price: latestPrice * qty }]
        });
        user.wallet -= latestPrice * qty;
        await user.save();
        await userTransactions.save();
        return res.status(200).send('Transaction Proccessed');
      } else {
        userTransactions.transactions.push({
          symbol,
          qty,
          price: latestPrice * qty
        });
        user.wallet -= latestPrice * qty;
        await user.save();
        await userTransactions.save();
        return res.status(200).send('Transaction Added To Portfolio');
      }
    } catch (err) {
      console.error(err.message);
      res.status(400).send('Failed');
    }
  }
);

module.exports = router;

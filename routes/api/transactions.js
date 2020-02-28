require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Transactions = require('../../models/Transactions');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const iex = require('iexcloud_api_wrapper');

//@route GET/api/transactions
//@desc gets users completed transactions
//@access PRIVATE

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

//@route GET/api/transactions
//@desc buys a stock
//@access PRIVATE

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

        if (user.wallet > latestPrice * qty) {
          user.wallet -= latestPrice * qty;
        } else {
          return res.status(400).json({
            errors: [{ msg: 'Not enough money to purchase this stock' }]
          });
        }

        await user.save();
        await userTransactions.save();
        return res.status(200).send(userTransactions);
      } else {
        userTransactions.transactions.push({
          symbol,
          qty,
          price: latestPrice * qty
        });

        if (user.wallet > latestPrice * qty) {
          user.wallet -= latestPrice * qty;
        } else {
          return res.status(400).json({
            errors: [{ msg: 'Not enough money to purchase this stock' }]
          });
        }

        await user.save();
        await userTransactions.save();
        return res.status(200).send(userTransactions);
      }
    } catch (err) {
      console.error(err.message);
      res.status(400).send('Failed');
    }
  }
);

module.exports = router;

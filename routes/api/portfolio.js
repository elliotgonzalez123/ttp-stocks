require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Transactions = require('../../models/Transactions');
const iex = require('iexcloud_api_wrapper');
const uuid = require('uuid');

router.get('/', auth, async (req, res) => {
  const userTransactions = await Transactions.findOne({
    user: req.user.id
  });
  let transactions = userTransactions.transactions;
  let obj = {};

  transactions.map(item => {
    if (!obj[item.symbol]) {
      obj[item.symbol] = item.qty;
    } else {
      obj[item.symbol] += item.qty;
    }
  });

  let promises = Object.keys(obj).map(async item => {
    try {
      const quoteData = await iex.quote(item);
      const { latestPrice } = quoteData;
      let newPrice = latestPrice * obj[item];
      return {
        id: uuid.v4(),
        symbol: item,
        qty: obj[item],
        price: newPrice
      };
    } catch (err) {
      console.error(err.message);
    }
  });

  const output = await Promise.all(promises);

  return res.status(200).send(output);
});

module.exports = router;

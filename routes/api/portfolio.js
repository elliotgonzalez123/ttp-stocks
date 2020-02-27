require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Transactions = require('../../models/Transactions');
const iex = require('iexcloud_api_wrapper');
const uuid = require('uuid');
const Bottleneck = require('bottleneck/es5');

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 333
});

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
      const quoteData = await limiter.schedule(() => iex.quote(item));
      const { latestPrice, previousClose } = quoteData;
      console.log(quoteData);
      if (quoteData) {
        let newPrice = latestPrice * obj[item];
        let color = '';
        if (latestPrice > previousClose) {
          color = 'green';
        } else if (latestPrice < previousClose) {
          color = 'red';
        } else {
          color = 'grey';
        }
        return {
          id: uuid.v4(),
          symbol: item,
          qty: obj[item],
          price: newPrice,
          color: color
        };
      }
    } catch (err) {
      console.error(err.message);
    }
  });

  const output = await Promise.all(promises);
  return res.status(200).send(output);
});

module.exports = router;

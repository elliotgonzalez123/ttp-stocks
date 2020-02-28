require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Transactions = require('../../models/Transactions');
const iex = require('iexcloud_api_wrapper');
const uuid = require('uuid');
const Bottleneck = require('bottleneck/es5');

//!!!!  PDF documentation states that I am to get the open price and compare it to the current price... Currently, the IEX api
// is NOT returning the opening stock price, I am instead proceeding with the previous days close as a substitute value to
//determine stock performance.

//api limiter to avoid 429 errors from IEX api
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 333
});

//@route GET/api/portfolio
//@desc custom route that combines transactions in database and realtime stock prices to return a custom object with
//up to date prices and quantities
//@access PRIVATE

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

  //loop to create custom return object, promises throttled with limiter function at 333ms, could probably make this go faster, but
  //do not want to push the IEX api too far
  let promises = Object.keys(obj).map(async item => {
    try {
      const quoteData = await limiter.schedule(() => iex.quote(item));
      const { latestPrice, previousClose } = quoteData;

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
  //resolve all promises
  const output = await Promise.all(promises);
  return res.status(200).send(output);
});

module.exports = router;

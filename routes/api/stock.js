require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Transactions = require('../../models/Transactions');
const iex = require('iexcloud_api_wrapper');
const uuid = require('uuid');

router.get('/', async (req, res) => {
  try {
    const quoteData = await iex.quote(req.body.symbol);
    const {
      latestPrice,
      previousClose,
      symbol,
      companyName,
      week52High,
      week52Low,
      change,
      changePercent
    } = quoteData;
    res.status(200).json({
      latestPrice,
      previousClose,
      symbol,
      companyName,
      week52High,
      week52Low,
      change,
      changePercent
    });
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ errors: { msg: 'Not a valid stock symbol' } });
  }
});

module.exports = router;

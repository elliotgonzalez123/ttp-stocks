const express = require('express');
const router = express.Router();

//@route GET/api/auth
//@desc Test route
//@access Public

router.get('/', (req, res) => {
  res.status(200).send('Auth route');
});

module.exports = router;

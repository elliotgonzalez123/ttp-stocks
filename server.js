const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json({ extended: false }));
app.use(cors());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/transactions', require('./routes/api/transactions'));
app.use('/api/portfolio', require('./routes/api/portfolio'));
app.use('/api/stock', require('./routes/api/stock'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

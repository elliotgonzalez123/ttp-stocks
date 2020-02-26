const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json({ extended: false }));
app.use(cors());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/transactions', require('./routes/api/transactions'));
app.use('/api/portfolio', require('./routes/api/portfolio'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

const connectDB = require('./connectdb');
const userRoutre = require('./routes/routes');
const authRouter = require('./routes/authRoutes');

// ! -----
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { graphqlHTTP } = require('express-graphql');
// ! -------------------
const GSchema = require('./Schema/GSchema')

// ! ----------------------
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use(cors({
    origin: [
        'http://localhost:5173',

    ],
    credentials: true
}));

app.use(cookieParser());

connectDB();



app.use('/',userRoutre)
// app.use('/',authRouter)


// ! -----------------------------



app.use('/graphql', graphqlHTTP({
    schema:GSchema,
    graphiql: process.env.NODE_ENV === 'development'
}))






























app.get('/', (req, res) => {
  res.send('Our server is ready -------- ......... ')
})

app.listen(port, () => {
  console.log(`server is sitting on port ${port}`);
})

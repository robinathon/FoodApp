const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./Routers/authRouter');
const userRouter = require('./Routers/userRouter');
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');
const bookingRouter=require('./Routers/bookingRouter')
/* enamsxsnnsejwcdw  */
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/user', userRouter);
app.use('/plans', planRouter);
app.use('/review', reviewRouter);
app.use('/booking', bookingRouter);
app.listen(5000);
const express=require('express');
const bookingRouter=express.Router();
const {protectRoute}=require('../controller/authController');
const {createSession}=require('../controller/bookingController');

bookingRouter.post('/createSession',protectRoute, createSession);

bookingRouter.get('/createSession',function(req,res){
    res.sendFile("C:/Users/Robin Kumar/Desktop/backend_pepcoding/foodApp/booking.html");
});

module.exports=bookingRouter;
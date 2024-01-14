const mongoose= require('mongoose');
const db_link='mongodb+srv://robinsinghsankalp:robinkum@cluster0.agvoh7i.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log('plan db connected');
})
.catch(function(err){
    console.log(err);
});

const planSchema=new mongoose.Schema({
    name:{
        type: 'String',
        required: true,
        unique: true,
        maxLength:[20, 'plan name should not exceed more than 20 characters']
    },
    duration:{
        type:Number,
        required: true,
    },
    price:{
        type:Number,
        required: [true, 'price not entered'],
    },
    ratingsAverage:{
        type:Number,
        default: 0
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount<100
        },'discount shuld not exceed price']
    }
})

const planModel=mongoose.model('planModel', planSchema);
module.exports=planModel;
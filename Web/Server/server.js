const express =require("express");
const app=express();
require("dotenv").config();


const port= process.env.PORT||3000;


const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//connect with front
// app.use(express.static('../frontend'));


allRoutes=require('./routes/Routes');
app.use('/api/v1',allRoutes);


const cors=require('cors');
app.use(cors());


//error handeler
app.use((err,req,res,next)=>{
console.log(err.stack);
console.log(err.name);
console.log(err.code);

res.status(500).json({
    message:"Something went wrong"
});
});



 app.listen(port, console.log(`server is listening on port ${port}`));
// //connecting database
// const connectDB = require("./DB/DBConnect");

// const start = async () => {
//   try {
//     await connectDB;
   
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();




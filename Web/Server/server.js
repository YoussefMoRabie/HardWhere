const express =require("express");
const app=express();


const port= process.env.PORT || 1444;


const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


require('dotenv').config();

//connect with front
app.use(express.static('../frontend'));




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

app.listen(port,()=>{
    console.log(`server is listening on port ${port}` );
})




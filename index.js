const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose')
const x = require('./schema')

const app = express();
const port = 3010;
const URL = "mongodb+srv://db_assignment:vraj1204@cluster0.oz3ku.mongodb.net/"
app.use(express.json())
mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(
  ()=>{
    console.log(`DB connected to atlas`)
  }
).catch((err)=>{
  console.error(`connection issue ${err}`)
})

app.post('/menu',async(req,res)=>{
  try{
    const{name,description,price}  = req.body
    if(!name||!price){
      return res.status(400).json({
        success:false,
        message:`Name and price required`
      })
    }

    const menuItem= await x.create({
      name,
      description,
      price
    });

    res.status(201).json({
      success:true,
      data:menuItem,
      message:'created'
    })
  }catch(err){
  res.status(500).json({
    success:false,
    message:'error fetching',
    error:err.message
  })
  }
})


app.get('/getmenu',async (res,req)=>{
  try{
    const xyz = await menuItem.find()

    res.status(201).json({
      success:true,
      message:"Successfully fetched",
      data:xyz
    })

  }catch(err){

    res.status(500).json({
      success:false,
      message:`Error${err.message}`,
      
    })

  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
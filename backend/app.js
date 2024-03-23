import express from 'express';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors';
import admindata from './models/signupadmin';
import customerdata from './models/signupcustomer';
import nodemailer from 'nodemailer';
import Products from './models/addproduct';
import order from './models/order';
 
 
 
 

var app = express();  
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://21a91a6152:T2wAPdf2wEU7ucq5@cluster0.9uv65fj.mongodb.net/DriveReady?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() =>
console.log("Connected to Database & Listining to localhost 5000 ")
)
.catch((err) => console.log(err));

var server = app.listen(5000)   

 


// usersignup


app.post('/adddetailsCsignup',async(req,res,next)=>{
  console.log(req.body.formdataC)
  const {fname,lname,email,password,phone}=req.body.formdataC;
  let users
  try{
    users = await customerdata.findOne({ email: email });
  }catch(err){
      return console.log(err)
  }
   
  if(!users){
      const stud =new customerdata({
          fname,
          lname,
          email,
          password,
          phone,
        })
        stud.save();
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'manojmaridi666@gmail.com',
        pass: 'twws ipfi pavo frie'
      }
    });
    var username=fname+lname;
    const emailBody = ` 
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
  <style>
      /* Add your styles here */
      body {
        font-family: 'Arial', sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
      }
      .header {
        background-color: #4CAF50;
        color: #fff;
        padding: 15px;
        text-align: center;
      }
      .content {
        padding: 20px;
      }
      .footer {
        background-color: #f4f4f4;
        padding: 10px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Registration Successful</h2>
      </div>
      <div class="content">
        <p>Hello ${username},</p>
        <p>Congratulations! Your registration was successful.</p>
        <p>Your account has been created with the following details:</p>
        <ul>
          <li>Email: ${email}</li>
          <li>Phone no:${phone}</li>
        </ul>
        <p>Thank you for joining our community.</p>
      </div>
      <div class="footer">
        <p>© 2024 manojkumar. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
     `;

    
    var mailOptions = {
      from: 'manojmaridi666@gmail.com',
      to: email,
      subject: 'Registration Successful',
      html:  emailBody};
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return res.send({msg:"Account registered successfully"}) 
  }
  else{
    return res.status(200).json({msg:"email exists!.."})
  }
});


//admin sign up
 


app.post('/adddetailsAsignup',async(req,res,next)=>{
  console.log(req.body.formdataA)
  const {fname,lname,email,company,password,phone}=req.body.formdataA;
  let users
  try{
    users = await admindata.findOne({ email: email });
  }catch(err){
      return console.log(err)
  }
   
  if(!users){
      const stud =new admindata({
          fname,
          lname,
          email,
          company,
          password,
          phone,
        })
        stud.save();
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'manojmaridi666@gmail.com',
        pass: 'twws ipfi pavo frie'
      }
    });
    var username=fname+" "+lname;
    const emailBody = ` 
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
  <style>
      /* Add your styles here */
      body {
        font-family: 'Arial', sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
      }
      .header {
        background-color: #4CAF50;
        color: #fff;
        padding: 15px;
        text-align: center;
      }
      .content {
        padding: 20px;
      }
      .footer {
        background-color: #f4f4f4;
        padding: 10px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Registration Successful</h2>
      </div>
      <div class="content">
        <p>Hello ${username},</p>
        <p>Congratulations! Your registration was successful.</p>
        <p>Your account has been created with the following details:</p>
        <ul>
          <li>Email: ${email}</li>
          <li>Phone no:${phone}</li>
          <li>Company:${company}</li>
        </ul>
        <p>Thank you for joining our community.</p>
      </div>
      <div class="footer">
        <p>© 2024 manojkumar. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
     `;

    
    var mailOptions = {
      from: 'manojmaridi666@gmail.com',
      to: email,
      subject: 'Registration Successful',
      html:  emailBody};
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return res.send({msg:"Account registered successfully"}) 
  }
  else{
    return res.status(200).json({msg:"email exists!.. please Login"})
  }
});

// CUSTOMER LOGIN

 
app.post('/logindetailsC',async (req,res,next)=>{
  
   
  const {email,password}=req.body.formdataC;
  let users;
  try{
    users = await customerdata.findOne({ email: email });
  }catch(err){
      return console.log(err)
  }
  console.log(users)
  if(!users){
    return res.status(200).json({msg:"Not registered"})
  }
  else{
    if(users.password===password){
      return res.status(200).json({msg:"login successful",email:users})
    }
    else{
      return res.status(200).json({msg:"password incorrect"})
    }
  }
   
})

//ADMIN LOGIN

//login in process testing
app.post('/logindetailsA',async (req,res,next)=>{
  
   
  const {email,password}=req.body.formdataA;
  let users;
  try{
    users = await admindata.findOne({ email: email });
  }catch(err){
      return console.log(err)
  }
  console.log(users)
  if(!users){
    return res.status(200).json({msg:"Not registered"})
  }
  else{
    if(users.password===password){
      return res.status(200).json({msg:"login successful",email:users})
    }
    else{
      return res.status(200).json({msg:"password incorrect"})
    }
  }
   
})




// add admin products
app.post('/addAdminProductdetails',async(req,res,next)=>{
 
  const {company,type,productname,description,category,price,image}=req.body.Addp;
  var users
  try{
    var users = await Products.findOne({ company: company, productname: productname });
  }catch(err){
      return console.log(err)
  }
   
  if(!users){
      const stud =new Products({
          company,
          type,
          productname,
          description,
          category,
          price,
          image,
        })
        stud.save();
        return res.send({msg:"Product added successfully"}) 
      }
      else{
        return res.status(200).json({msg:"product exists already !...."})
      }
    });



    app.get('/getdataProds',async(req,res,next)=>{
      let mdata;
      try{
          mdata=await Products.find();
          
      }catch(err){
          console.log(err);
      }
      if(!mdata){
        return res.status(404).json({message:"No item found"})
      }
      return res.status(200).json({mdata})
       
    })


    app.post('/addorders',async(req,res,next)=>{
    
      var {company,user,productName,price,quantity,status}=req.body.item;
      status=status+1;
      const newOrder = new order({
         company,user,productName,price,quantity,status
      });
      
      // Save the order to the database
      newOrder.save()
        .then((savedOrder) => {
          console.log('Order saved successfully:', savedOrder);
          return res.status(200).json({msg:"login successful"})
        })
        .catch((error) => {
          console.error('Error saving order:', error);
        });

    });


    app.get('/getOrdereddata',async(req,res,next)=>{
      let mdata;     
      try{
          mdata=await order.find({status:1});
          
      }catch(err){
          console.log(err);
      }
      if(!mdata){
        return res.status(404).json({message:"No item found"})
      }
      return res.status(200).json({mdata})
       
    })

    app.get('/getOrdereddatatotrack',async(req,res,next)=>{
      let mdata;     
      try{
          mdata=await order.find();
          
      }catch(err){
          console.log(err);
      }
      if(!mdata){
        return res.status(404).json({message:"No item found"})
      }
      return res.status(200).json({mdata})
       
    })
    
    app.post('/deliver',async(req,res,next)=>{
      console.log(req.body)     
      try {
        const result1 = await order.updateOne({ company: req.body.Company, productName: req.body.productName, user: req.body.user }, { $set: { status: 2 } });
         
        console.log(result1);
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'manojmaridi666@gmail.com',
            pass: 'twws ipfi pavo frie'
          }
        });
         
        const emailBody = ` 
        <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
              <style>
                  /* Add your styles here */
                  body {
                    font-family: 'Arial', sans-serif;
                  }
                  .container {
                    max-width: 600px;
                    margin: 20px auto;
                  }
                  .header {
                    background-color: #4CAF50;
                    color: #fff;
                    padding: 15px;
                    text-align: center;
                  }
                  .content {
                    padding: 20px;
                  }
                  .footer {
                    background-color: #f4f4f4;
                    padding: 10px;
                    text-align: center;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h2>Order Delivered Successfully</h2>
                  </div>
                  <div class="content">
                    <p>Hello ${req.body.user},</p>
                    <p>🎉 Congratulations! Your delicious meal has been successfully delivered and is now ready for you to savor. We hope every bite brings you joy and satisfaction. Our chefs put their heart and soul into preparing your order, and we're thrilled to have served you today.  Thank you for choosing ${req.body.Company} for your culinary experience. If you have any feedback or need assistance, don't hesitate to reach out. Enjoy your meal! 🍽️"</p>
                    <p>Thank you for joining our community.</p>
                  </div>
                  <div class="footer">
                    <p>© 2024 manojkumar. All rights reserved.</p>
                  </div>
                </div>
              </body>
            </html>
         `;
    
        
        var mailOptions = {
          from: 'manojmaridi666@gmail.com',
          to: req.body.user,
          subject: 'order delivery status',
          html:  emailBody};
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        return res.send({msg:"successful"}) 
        
      }catch(err){
        console.log(err);
    }
       
    })
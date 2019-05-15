"use strict";
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('home')
      

//console.log(req.body);
})

app.post('/resposta',(req,res)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "SEU-EMAIL-GMAIL-AQUI",
      pass: 'SUA-SENHA-AQUI'
    }
  });
  var email = req.body.email;
  console.log(email)
  var mailOptions = {
    from: 'programmingteste66@gmail.com',
    to: req.body.email,
    //pegar do front
    subject: req.body.titulo, //pegar do front
    text: req.body.textArea //pegar do front
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
  app.get('/')


})
app.listen(8080);


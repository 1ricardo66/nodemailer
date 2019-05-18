"use strict";
//Mudar as rotas 
//Fazer o front
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const express = require("express");
var bodyParser = require('body-parser');
var app = express();

const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
})

app.get('/enviar-email', (req, res) => {
    res.render('home')


    //console.log(req.body);
})

app.post('/resposta', (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "SEU-EMAIL-AQUI",
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

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
    res.render("index")

})

app.get("/gerar-senha", (req, res) => {
    var password = "";

    function aleatorio() {
        return parseInt(Math.floor(Math.random() * 33) + 38);
    }

    function gerarSenha() {
        var nome = req.body.gerar;
        console.log(nome);
        var numero = Math.floor(Math.random() * 999) + 865;
        var random = String.fromCharCode(aleatorio());
        password = password + "" + random + "" + numero;
        return password
    }
    password = gerarSenha()
    console.log(password)
    res.render("senha.ejs", { password: password })
})

app.get('/gerar-email', (req, res) => {
    var email = ["@gmail", "@hotmail", "mohmal", "@swift"];
    var dominio = [".ttk", ".pwd", ".mkdir", ".ls"];

    function random(quant) {
        var x = Math.floor(Math.random() * quant);
        return x;
    }

    function gerar() {
        var retornaEmail = (Math.random() * 999).toFixed(2) + "" + email[random(4)] + "" + dominio[random(4)];
        return retornaEmail;
    }
    email = gerar();
    res.render('gerar_email', { email: email });

})

app.listen(port);
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { ObjectId } = require("mongodb");

// Configuração do EJS como Template engine
app.set("view engine", "ejs");
app.set(bodyParser.urlencoded({ extended: true }));
app.set(express.static("public"));

// Conexão com o mongodb
mongoose.connect('mongodb://localhost:27017/receitasDB')


// Modulo de receita
const Receita = mongoose.model('Receita', {
    nome: String,
    ingredientes: [String],
    instrucoes: String
})

// Rotas
app.get('/', async(req, res) => {
    const searchQuery = req.query.search;
    
})
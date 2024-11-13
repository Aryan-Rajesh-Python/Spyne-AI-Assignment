const express = require("express");
const app = express();
const UserController = require('./../controllers/user')



app.post("/register-user", (req, res) => { UserController.register(req, res) });
app.post("/login-user", (req, res) => { UserController.login(req, res) });


module.exports = app;
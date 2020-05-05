const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const tasks = require("./routes/tasks");
const cors = require('cors');
const app = express();
const path = require('path');

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/client'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/client/index.html'));
  });

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true}, () => 
    console.log("Database connected!")
);

app.use(cors());

app.use(express.json());

app.use('/api', tasks);
app.use(express.urlencoded({ extended: true }))

app.listen(process.env.PORT || 8080, ()=>{
    console.log("Server start!")
});
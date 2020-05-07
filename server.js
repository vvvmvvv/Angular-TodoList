const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const tasks = require("./routes/tasks");

const app = express();

dotenv.config();

app.use(express.static('./dist/angular-heroku'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api', tasks);

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true , useNewUrlParser: true }, function (err) {
  if (err) {
      console.log(process.env.MONGODB_URI);
    console.log(err);
    process.exit(1);
  }
  console.log("Database connection ready");

  var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
    console.log("App now running on port", port);
  });
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/angular-heroku/index.html'));
  });

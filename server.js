const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const tasks = require("./routes/tasks");
const cors = require('cors');
const app = express();

const PORT = 8080;

// Serve only the static files form the dist directory
app.use(express.static('./dist/package.json'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/package.json/'});
});

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true}, () => 
    console.log("Database connected!")
);

app.use(cors());

app.use(express.json());

app.use('/api', tasks);
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log("Server started on port:" + PORT);
})
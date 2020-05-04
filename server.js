const express = require('express');
const path = require('path');

const tasks = require("./routes/tasks");
const cors = require('cors');

const port = 3000;

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api', tasks);
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log("Server started on port:" + port);
})
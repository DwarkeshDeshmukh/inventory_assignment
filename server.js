const express = require('express');
const inventory = require('./inventory');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/',inventory);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));



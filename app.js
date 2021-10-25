const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const router = require('./routes/index');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

/*
user bisa bikin product => many to many

Wishlist as a table conjunction

product itu punyanya satu user

Store one to many product, one to one user
*/
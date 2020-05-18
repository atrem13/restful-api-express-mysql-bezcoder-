const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse request from json
app.use(bodyParser.json());

// parse request from form urlendcode
app.use(bodyParser.urlencoded({extended:true}));

// test route
app.get('/', (req, res) =>{
  res.json({
    message:'welcome bitch'
  });
});

require('./routes/customer.routes.js')(app);

// set port to listen request
app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
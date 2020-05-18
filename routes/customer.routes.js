module.exports = (app) => {
  const customer = require('../controller/customer.controller.js');
  
  // create new customer
  app.post('/customers', customer.create);

  // get all customer data
  app.get('/customers', customer.findAll);

  // get a customer base on id
  app.get('/customers/:customerId', customer.findOne);

  // update a customer base on id
  app.put('/customers/:customerId', customer.update);

  // delete a customer base on id
  app.delete('/customers/:customerId', customer.delete);

  // delete all customer
  app.delete('/customers/', customer.deleteAll);


};
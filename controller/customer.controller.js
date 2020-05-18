const Customer = require('../models/customer.model.js');

// create new customer
exports.create = (req, res) => {
  // validate input
  if(!req.body){
    res.status(400).send({
      message:'input data required'
    });
  }

  // customer data
  const new_customer = new Customer({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // save customer data to database
  Customer.create(new_customer, (err, data) => {
    if(err){
      res.status(500).send({
        message: err.message || 'error: create data failed'
      });
    }else{
      res.send(data);
    }
  });


};

// get all customer data
exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
    if(err){
      res.status(500).send({
        message: err.message || 'error: read data failed'
      });
    }else{
      res.send(data);
    }
  });
};

// get customer base on id
exports.findOne = (req, res) => {
  Customer.findById(req.params.customerId, (err, data) => {
    if(err){
      if(err.message === 'not found'){
        res.status(404).send({
          message: `customer with id ${req.params.customerId} not found` 
        });
      }else{
        res.status(500).send({
          message:`error when trying to get customer with id ${req.params.customerId}`
        });
      }

    }else{
      res.send(data);
    }
  });
};


// update customer base on id
exports.update = (req, res) => {
  // validate input
  if(!req.body) {
    res.status(400).send({
      message:'input data required'
    });
  }

  // update data customer
  const update_customer = new Customer(req.body);
  Customer.updateById(req.params.customerId, update_customer, (err, data) =>{
    if(err){
      if(err.message == 'not found'){
        res.status(404).send({
          message:`customer with id ${req.params.customerId} not found` 
        });
      }else{
        res.status(500).send({
          message:`error when update customer with id ${req.params.customerId}`
        });
      }

    }else{
      res.send(data);
    }
  })


};

// delete customer base on id
exports.delete = (req, res) => {
  Customer.remove(req.params.customerId, (err, data) => {
    if(err){
      if(err.message == 'not found'){
        res.status(404).send({
          message:`customer with id ${req.params.customerId} not found` 
        });
      }else{
        res.status(500).send({
          message:`error when delete customer with id ${req.params.customerId}`
        });
      }

    }else{
      res.send({
        message: `deleted customer with id ${req.params.customerId}`
      });
    }
  });
};

exports.deleteAll = (req, res) => {
  Customer.removeAll((err, data) => {
    if(err){
      res.status(500).send({
        message: err.message || 'failed to delete all customers'
      });
    }else{
      res.send({
        message:'deleted all customers'
      });
    }
  });
};
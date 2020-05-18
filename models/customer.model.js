const sql = require('./db.js');

// customer constructor
const Customer = function(customer){
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if(err){
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('create customer: ', {id:res.insertId, ...newCustomer});
    result(null, {id:res.insertId, ...newCustomer});
  });
};

Customer.findById = (customerId, result) => {
  sql.query("SELECT * FROM customers WHERE id = ?", [customerId], (err, res) => {
    if(err){
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if(res.length){
      console.log('found customer: '), res[0];
      result(null, res);
      return;
    }

    // if not found
    result({message:"not found"}, null);
  });
};

Customer.getAll = (result) => {
  sql.query('SELECT * FROM customers', (err, res) => {
    if(err){
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};

Customer.updateById = (customerId, customer, result) => {
  sql.query(
    "Update customers SET ? WHERE id = ?", 
    [customer, customerId],
    (err, res) => {
      if(err){
        console.log("error: ", err);
        result(err, null);
        return;
      }

      // if no rows affected(update fail)
      if(res.affectedRows == 0){
        result({message:'not found'}, null);
        return;
      }

      console.log('update customer: ', {id:customerId, ...customer});
      result(null, {id:customerId, ...customer});
    });
};

Customer.remove = (customerId, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", [customerId], (err, res) => {
    if(err){
      console.log('error: ', err);
      result(err, null);
      return;
    }

    // if no rows affected(delete fail)
    if(res.affectedRows == 0){
      result({message:'customer not found'}, null);
      return;
    } 

    console.log('delete customer with id: ', customerId);
    result(null, res);
  });
};

Customer.removeAll = (result) => {
  sql.query("DELETE FROM customers", (err, res) => {
    if(err){
      console.log('error: ', err);
      result(err, null);
      return;
    }

    // if no rows affected(delete fail)
    if(res.affectedRows == 0){
      result({message:'customer not found'}, null);
      return;
    } 

    console.log(`delete ${res.affectedRows} customer`);
    result(null, res);
  });
};

module.exports = Customer;
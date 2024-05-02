const express = require('express');
const path = require('path'); 
const da = require("./data-access");
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port} using a static dir ${publicDir}`);
});

app.get("/customers", async (req, res) => {
  try {
    const cust = await da.getCustomers();
    res.send(cust);
  } catch(err) {
    console.log(err);
    return[null, err.message];
  }
});

app.get("/reset", async (req, res) => {
  const [result, err] = await da.resetCustomers();
  if(result){
      res.send(result);
  }else{
      res.status(500);
      res.send(err);
  }   
});

app.post('/customers', async (req, res) => {
  const newCustomer = req.body;
  if (newCustomer === null) {
      res.status(400);
      res.send("missing request body");
  } else {
      // return array format [status, id, errMessage]
      const [status, id, errMessage] = await da.addCustomer(newCustomer);
      if (status === "success") {
          res.status(201);
          let response = { ...newCustomer };
          response["_id"] = id;
          res.send(response);
      } else {
          res.status(400);
          res.send(errMessage);
      }
  }
});

app.get("/customers/:id", async (req, res) => {
    const id = req.params.id;
    const [cust, err] = await da.getCustomerById(id);
    if(cust){
        res.send(cust);
    }else{
        res.status(404);
        res.send(err);
    }   
});

app.put('/customers/:id', async (req, res) => {
    const id = req.params.id;
    const updatedCustomer = req.body;
    if (updatedCustomer === null) {
        res.status(400);
        res.send("missing request body");
    } else {
        delete updatedCustomer._id;
        // return array format [message, errMessage]
        const [message, errMessage] = await da.updateCustomer(updatedCustomer);
        if (message) {
            res.send(message);
        } else {
            res.status(400);
            res.send(errMessage);
        }
    }
});

app.delete("/customers/:id", async (req, res) => {
    const id = req.params.id;
    // return array [message, errMessage]
    const [message, errMessage] = await da.deleteCustomerById(id);
    if (message) {
        res.send(message);
    } else {
        res.status(404);
        res.send(errMessage);
    }
});
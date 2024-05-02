const express = require('express');
const path = require('path'); 
const da = require("./data-access");

const app = express();
const port = 4000;

const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

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
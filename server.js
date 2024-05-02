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
  const cust = await da.getCustomers();
  res.send(cust);
});
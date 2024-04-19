const express = require('express');
const path = require('path'); 

const app = express();
const port = 4000;

const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

app.listen(port, () => {
  console.log(`Server listening on port ${port} using a static dir ${publicDir}`);
});

let apiKey = null;

function setApiKey(){
    apiKey = process.env.API_KEY;
    if(apiKey){
        console.log("apiKeys: "+apiKey);
    }else{
        console.log("apiKey has no value. Please provide a value through the API_KEY env var.");
        process.exit(0);
    }  
}

function checkApiKey(req, res, next) {
    const apiKeyHeader = req.headers['x-api-key']; // Assuming the API key is sent in the header named 'x-api-key'
  
    // Check if API key is present
    if (!apiKeyHeader) {
      return res.status(401).json({ message: 'Unauthorized: Missing API key' });
    }
  
    // Compare the received key with the stored key (from environment variable or configuration file)
    let keyValid = false;    
    if (apiKeyHeader === apiKey){
        keyValid = true;
    }
    if (!keyValid ) {
      return res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }
  
    // If valid key, continue processing the request
    next();
  }

setApiKey();
module.exports = { checkApiKey };
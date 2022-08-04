const https = require('https');
const fs = require('fs');
require('dotenv').config();
const { app, PORT } = require('./api/index.js');
const options = {
    cert: fs.readFileSync(process.env.CERT_PATH, 'utf8'),
    key: fs.readFileSync(process.env.KEY_PATH, 'utf8'),
};
https.createServer(options, app).listen(PORT, () => {
    console.log(`Server initialized on PORT: ${PORT}`);
});
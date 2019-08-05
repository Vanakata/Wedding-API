const env = process.env.NODE_ENV || 'development';

const config = require('./src/configuration/config')[env];
const app = require('express')();

require('./src/configuration/database')(config);
require('./src/configuration/express')(app);
require('./src/configuration/routes')(app);
require('./src/configuration/passport')();

app.listen(config.port);
console.log(`Application listening on port ${config.port}`);
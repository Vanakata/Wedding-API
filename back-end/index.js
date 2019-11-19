const env = process.env.NODE_ENV || 'development';

const config = require('./src/configuration/config')[env];
const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: storage }).single('file');

app.post('/upload', function (req, res) {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })

});

require('./src/configuration/database')(config);
require('./src/configuration/express')(app);
require('./src/configuration/routes')(app);
require('./src/configuration/passport')();

app.listen(config.port);
console.log(`Application listening on port ${config.port}`);
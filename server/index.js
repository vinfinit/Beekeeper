const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const Promise = require('bluebird');

const app = express();
const PORT = 8088;

const utils = require('./utils');

const generatedEmbeddings = '/host/Users/uladzimir/projects/wth/server/generated-embeddings';

app.post('/process', function (req, res) {
    console.log('/process');
    const dir = `${__dirname}/uploads/${Date.now()}`;
    const form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        const path = files.file.path;
        const name = files.file.name;
        const newLocation = `${dir}/${name}`;
        console.log(2);

        console.log(path, name, newLocation);

        Promise.promisify(fs.writeFile)(path, newLocation)
            .then(() => {
                console.log("The file was saved!");
                return utils.processImage(`${__dirname}/uploads`) 
            })
            .then(output => {
                console.log(output);
                Promise.promisify(fs.readFile)(`${generatedEmbeddings}/reps.csv`)
                    .then(content => res.send(content))
            })
            .catch(err => {
                console.error(err.stack);
                res.status(500).send('Something broken!');
            });
    });
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

// utils.processImage(__dirname + '/uploads')
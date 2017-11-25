const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const Promise = require('bluebird');
const request = require('request');

const app = express();
const PORT = 8088;

const utils = require('./utils');

const generatedEmbeddings = '/host/Users/uladzimir/projects/wth/server/generated-embeddings';

app.post('/process', function (req, res) {
    console.log('/process');
    const dir = `${__dirname}/uploads/${Date.now()}`;
    const form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', (name, file) => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        file.path = `${dir}/${file.name}`;

        fs.writeFile(file.path, file, function (err) {
            if (err) {
                console.log(err);
                res.status(500).send('Something broke!' + err);
            }

            console.log("The file was saved!");

            return utils.processImage(dir)
                .then(output => {
                    console.log(output);
                    return Promise.promisify(fs.readFile)(`${generatedEmbeddings}/reps.csv`)
                })
                .then(content => {
                    return request.post({
                            url: 'http://localhost:9090/',
                            form: {content: content}
                        },
                        function (err, httpResponse, body) {
                            res.send(content)
                        });
                })
                .catch((err) => {
                    console.error(err.stack);
                    res.status(500).send('Something broke!');
                });
        });
    });
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

// utils.processImage(__dirname + '/uploads')
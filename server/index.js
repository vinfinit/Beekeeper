const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const Promise = require('bluebird');
const request = require('request');

const db = require('./db');
const app = express();
const PORT = 8088;

const utils = require('./utils');

const generatedEmbeddings = '/host/Users/uladzimir/projects/wth/server/generated-embeddings';
const user = require("./models/users");

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
                            user.create(
                                {
                                    phone: Date.now(),
                                    rating: JSON.parse(JSON.parse(content))[0],
                                    url: file.path
                                }, function (err, result) {
                                    if (err) {
                                        res.status(500).send('can not find');
                                    }
                                    console.log(result);
                                    res.send(content)
                                });
                        });
                })
                .catch((err) => {
                    console.error(err.stack);
                    res.status(500).send('Something broke!');
                });
        });
    });
});

app.post('/user', function (req, res) {
    var newUser = user({
        phone: Date.now(),
        rating: "2222",
        url: "dsds"
    });

    newUser.save(function (err) {
        if (err) throw err;

        res.send('User created!');
    });
});


app.get('/users', function (req, res) {
    user.find({}, function (err, users) {
        if (err) throw err;

        res.send(users);
    });
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

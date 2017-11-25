const express = require('express');
const formidable = require('formidable');
const fs = require('fs');

const app = express();
const PORT = 8088;

const utils = require('./utils');

app.post('/process', function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        const dir = __dirname + `/uploads/${Date.now()}`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        file.path = dir + `/${file.name}`;

        fs.writeFile(file.path, file, function(err) {
            if(err) {
                console.log(err);
                res.status(500).send('Something broke!' + err);
            }

            console.log("The file was saved!");

            return utils.processImage(dir)
                .then((res) => {
                    console.log(res);
                    res.send('Hello world from Distelli & Docker!');
                })
                .catch((err) => {
                    console.error(err.stack);
                    res.status(500).send('Something broke!');
                    exit(1);
                });
        });
    });
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);

utils.exec()
    .then(res => console.log('end good', res))
    .catch(err => console.error('end bad', err))
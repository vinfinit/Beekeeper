const express = require('express');
const formidable = require('formidable');
const fs = require('fs');

const app = express();
const PORT = 8088;


const processImage = require('./utils').processImage;

app.post('/process', function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        const dir = __dirname + `/uploads/${Date.now()}/`;
        file.path = dir + file.name;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        fs.writeFile(file.path, file, function(err) {
            if(err) {
                console.log(err);
                res.status(500).send('Something broke!' + err);
            }

            console.log("The file was saved!");

            return processImage(file.path)
                .then((res) => {
                    console.log(res);
                    res.send('Hello world from Distelli & Docker!');
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
const express = require('express');
const PORT = 8088;

const app = express();



ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

app.post('/process', function (req, res) {
    res.send('Hello world from Distelli & Docker!');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
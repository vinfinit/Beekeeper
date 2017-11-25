const express = require('express');
const request = require('request');
const Promise = require('bluebird');
const exec = Promise.promisify(require('child_process').exec);

const app = express();
const PORT = 9090;


app.post('/', function (req, res) {
	exec('python ../build/test_script.py /Users/uladzimir/projects/wth/server/generated-embeddings/reps.csv')
		.then(output => res.json(output))
		.catch(err => res.status(500).send(err))
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
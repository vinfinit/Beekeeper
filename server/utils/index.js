const util = require('util');
const fs = require('fs');
const Promise = require('bluebird');
const exec = Promise.promisify(require('child_process').exec);
const rimraf = require('rimraf');

let counter = 0;

const openfacePath = '/root/openface';
const alignedImages = '/host/Users/uladzimir/projects/wth/server/aligned-images';
const generatedEmbeddings = '/host/Users/uladzimir/projects/wth/server/generated-embeddings';

let utils = {};

utils.processImage = function (dirPath) {
	const uuid = Date.now();

	console.log(`.${openfacePath}/util/align-dlib.py ${dirPath} align outerEyesAndNose ${alignedImages} --size 96`);

	return Promise.promisify(rimraf)(alignedImages)
		.catch(console.error)
		.delay(1000)
		.finally(() => {
			return exec(`ls ${dirPath}`)
				.then((o) => {
					console.log('!!!!!!!!', o);
					return exec(`./${openfacePath}/util/align-dlib.py ${dirPath} align outerEyesAndNose ${alignedImages} --size 96`)
				})
		})
		.then(() => {
			return exec(`./${openfacePath}/batch-represent/main.lua -outDir ${generatedEmbeddings} -data ${alignedImages}`)
		})
};

utils.exec = function (command) {
    return exec(command)
}

module.exports = utils
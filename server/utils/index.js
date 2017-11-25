const util = require('util');
const fs = require('fs');
const Promise = require('bluebird');
const exec = Promise.promisify(require('child_process').exec);
let counter = 0;

const openfacePath = '/root/openface';
const alignedImages = '/host/Users/uladzimir/projects/wth/server/aligned-images';
const generatedEmbeddings = '/host/Users/uladzimir/projects/wth/server/generated-embeddings';

let utils = {};

utils.processImage = function (dirPath) {
	const uuid = Date.now();

	return Promise.promisify(fs.unlink)(`${alignedImages}/cache.t7`)
		.catch(() => {})
		.finally(() => {
			return exec(`.${openfacePath}/util/align-dlib.py ${dirPath} align outerEyesAndNose ${alignedImages} --size 96`)
		})
		.then(() => {
			return exec(`.${openfacePath}/batch-represent/main.lua -outDir ${generatedEmbeddings} -data ${alignedImages}/`)
		})
};

utils.exec = function (command) {
    return exec(command)
}

module.exports = utils
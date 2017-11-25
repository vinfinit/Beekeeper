const util = require('util');
const exec = util.promisify(require('child_process').exec);
let counter = 0;

const openfacePath = '/root/openface';
const uploads = '/host/Users/uladzimir/projects/wth/server/uploads';
const alignedImages = '/host/Users/uladzimir/projects/wth/server/aligned-images';
const generatedEmbeddings = '/host/Users/uladzimir/projects/wth/server/generated-embeddings'

module.exports.processImage = function (dirPath) {
	const uuid = Date.now();
    const commands = [
    	`rm -rf ${alignedImages}/*`
    	`rm -rf ${alignedImages}/*`,
    	`rm -rf ${generatedEmbeddings}/*`,
        `.${openfacePath}/util/align-dlib.py ${dirPath} align outerEyesAndNose ${alignedImages} --size 96`,
        `.${openfacePath}/batch-represent/main.lua -outDir ${generatedEmbeddings} -data ${alignedImages}`
    ];

    return Promise.all(commands.map(c => exec(c)))
};

module.exports.exec = function (command) {
	const commands = [
    	`ls /root`
    ];


    return Promise.all(commands.map(c => exec(c)))
}
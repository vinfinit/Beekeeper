const { exec } = require('child_process');
const ls = exec('ls');
let counter = 0;

module.exports.processImage = function () {
    const folder = 'folder_' + counter + '/';
    const commands = [
        `cp -r /host/Users/uladzimir/Downloads/docker/ training-images/` + folder,
        `./util/align-dlib.py ./training-images/${folder} align outerEyesAndNose ./aligned-images/train —size 96`,
        `./batch-represent/main.lua -outDir ./generated-embeddings/${folder} -data ./aligned-images/`,
        `cp generated-embeddings/${folder}reps.csv /host/Users/uladzimir/Downloads/${folder}`
    ];

    exec(commands.join(" | "));
};
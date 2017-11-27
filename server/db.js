const mongoose = require('mongoose');
mongoose.Promise = require("bluebird");
const dbName = "bcrypt-auth-test";


const dbAddress = process.env.DB_HOST || "127.0.0.1";
const dbPort = process.env.DB_PORT || 27017;

let options = {
    useMongoClient: true
};

options["user"] = 'dmitriymdvdv2';
options["pass"] = '12345678';
const uri = `mongodb://${options["user"]}:${options["pass"]}@ds121716.mlab.com:21716/wth-hangover`;

delete options["user"];
delete options["pass"];

mongoose.connect(uri, options)
    .catch(err => {
        if (err.message.indexOf("ECONNREFUSED") !== -1) {
            console.error("Error: The server was not able to reach MongoDB. Maybe it's not running?");
            process.exit(1);
        } else {
            throw err;
        }
    });
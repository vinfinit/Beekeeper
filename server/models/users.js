const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

schema.pre("save", function (next) {
    console.log('save');
});

schema.pre("update", function (next) {
    console.log('update');
});

schema.methods.insertOrUpdate = function (newUser) {
    console.log(newUser);
};

const model = mongoose.model("User", schema);

const cleanCollection = () => model.remove({}).exec();

module.exports = model;

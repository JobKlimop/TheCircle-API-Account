const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const truyouShema = new Schema({
    username:{
        type: String,
        required: [true, 'name is required']
    },
    email:{
        type: String,
        required: [true, 'email is required']
    },
    slogan:{
        type: String, 
        required: [true, 'slogan is required']
    },
    avatar:{
        type: String,
        required: false
    },
});

const truyou = mongoose.model('truyou', truyouShema);

module.exports = truyou;
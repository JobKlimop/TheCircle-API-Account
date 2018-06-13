const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const truyoupasswordShema = new Schema({
    password:{
        type: String, 
        required: [true, 'password is required']
    },
    pem:{
        type: String,
        required: [true, 'pem is required']
    },
    username: {
        type: String,
        required: [true, 'username is required']
    }
});

const truyou = mongoose.model('truyoupassword', truyoupasswordShema);

module.exports = truyou;
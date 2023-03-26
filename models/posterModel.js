const {Schema,model} = require('mongoose');
const posterScheme = new Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    describe: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true
    },
    visits: {
        type: Number,
        default: 1
    }
})
module.exports = model('Poster',posterScheme);
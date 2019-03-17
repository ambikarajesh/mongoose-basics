const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    stories: [{ storyId:{type: Schema.Types.ObjectId, ref: 'Story'}, cost:{type:Number} }]
});


module.exports = mongoose.model('Person', personSchema);
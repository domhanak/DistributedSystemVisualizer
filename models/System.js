/**
 * Created by Hany on 5. 3. 2015.
 */
var mongoose = require('mongoose');

var SystemSchema = new mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String,
    duration: Number,
    description: String,
    machines:[{
        _id: mongoose.Schema.ObjectId,
        name: String,
        addTime: Number,
        density: Number,
        queries:[{
            _id: mongoose.Schema.ObjectId,
            query: String,
            addTime: Number
        }]
    }],
    machineLinks:[{
        source: Number,
        target: Number,
        weight: Number,
        active: Boolean,
        left: Boolean,
        right: Boolean
    }]
});

module.exports = mongoose.model('System', SystemSchema);
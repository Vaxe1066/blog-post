const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const CommentsSchema = new Schema(
    {
        author: {type: Schema.Types.ObjectID, ref: 'User'},
        //author: {type: String, maxLength: 100},
        comment: {type: String, maxLength: 500},
        blog: {type: Schema.Types.ObjectID, ref: 'Posts'},
        //blog: {type:String, maxLength: 100},
        timestamp: {type: Date, default: Date.now}

    }
);

/*

//virtual for full name 
UserSchema
.virtual('author')
.get(function () {
    return this.last_name + ', ' +this.first_name;
});

*/


module.exports = mongoose.model('Comments', CommentsSchema);
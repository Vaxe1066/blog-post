const mongoose = require('mongoose');
const { DateTime } = require("luxon");
const Schema=mongoose.Schema;

const PostsSchema = new Schema(
    {
        author: {type: Schema.Types.ObjectID, ref: 'User'},
        //author: {type: String, maxlength: 100}
        blog: {type: String},
        title: {type: String, maxlength: 100},
        timestamp: {type: Date, default: Date.now}

    }
);


PostsSchema
.virtual('timestamp_formatted')
.get(function () {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATE_MED);
});

/*

//virtual for full name 
UserSchema
.virtual('author')
.get(function () {
    return this.last_name + ', ' +this.first_name;
});

*/


module.exports = mongoose.model('Posts', PostsSchema);
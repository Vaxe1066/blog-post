const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const UserSchema = new Schema(
    {
        first_name: {type: String, maxLength: 200},
        last_name: {type: String, maxLength: 200},
        username: {type: String, required: true, maxLength: 100},
        password: {type: String, required: true},
        admin: {type: Boolean, enum: [false,true], default: false}

    }
);



//virtual for full name 
UserSchema
.virtual('author')
.get(function () {
    return this.last_name + ', ' +this.first_name;
});


module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema( {
    name: {
        type:String,
        required:true
    },

    email: {
        type:String,
        required:true
    },

    mobile : {
        type:Number,
        required:true,
    },

    message: {
        type: Array,
        
    },

    logoutTime : {
        type:Date, 
        default: new Date( new Date().getTime() + 5 * 60000 )
    }
},

{ timestamps: true }

);


const User = mongoose.model( 'USER' ,userSchema);

module.exports = User;
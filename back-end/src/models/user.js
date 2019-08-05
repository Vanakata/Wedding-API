const mongoose = require('mongoose');

const encryption = require('../utils/encryption');

let userSchema = new mongoose.Schema({
    username: {
        type: mongoose.SchemaTypes.String,
        required:true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    weddingDate:{
        type:mongoose.SchemaTypes.Date,
    },
    groom:{
        type:mongoose.SchemaTypes.String
    },
    bride:{
        type:mongoose.SchemaTypes.String
    },
    roles: [{
        type: mongoose.SchemaTypes.String
    }],
    salt: {
        type: String,
        required: true
    }

});

userSchema.method({
    authenticate: function (password) {
        return encryption.hashedPassword(this.salt, password) === this.password
    }
})

let User = mongoose.model('User', userSchema);
module.exports = User;
module.exports.seedAdminUser=()=> {
    User.find({})
        .then(users => {
            if (users.length > 0) {
                return;
            } else {
                let salt = encryption.generateSalt();
                let password = encryption.hashedPassword(salt, 'limonada666');
                User.create({

                    email: 'vanakata@hotmail.com',
                    username: 'Vanakata',
                    password,
                    salt,
                    roles: ['admin']
                });
            };
        });
};


import mongoose from "mongoose";

import bcrpt from "bcrypt";

import {Schema, model} from "mongoose";



const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    //accountId can be google Id, facebook Id.
  //   id: {
  //     type: Number,
  //     unique: false,
  //   },
  //   first_name: {
  //     type: String,
  //     required: false,
  //   },
  //   last_name: {
  //     type: String,
  //     required: false,
  //   },
  //   name: String,
  // },
  // {
  //   timestamps: true,
  // }
  });

UserSchema.pre("save", function(next){
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });

  // this.name = this.first_name + " " +  this.last_name 
  //     next()
  })
  


  //compare password
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};


  export default model('User', UserSchema)
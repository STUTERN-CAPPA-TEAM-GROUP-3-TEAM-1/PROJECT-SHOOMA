import {Schema, model} from "mongoose"

const UserSchema = new Schema ({
  
  //accountId can be google Id, facebook Id.
  id: {
    type: Number,
    unique: false,
  },
  first_name: {
    type: String,
    required: false,
  
  },
  last_name: {
    type: String,
    required: false,
  
  },
  name: String,
    }, {
      timestamps: true

})

UserSchema.pre("save", function(next){
  this.name = this.first_name + " " +  this.last_name 
      next()
  })
  
  export default model('User', UserSchema)
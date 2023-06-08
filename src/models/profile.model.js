import { Schema, model } from "mongoose";

const ProfileSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
    ref: "User",
  
  },
  phonenumber: {
    type: Number,
 
  },
  email: {
    type: String,
  },
  password: {
    type: String,

  },
  profileImage: {
    type: String,

  },
});

export default model("Profile", ProfileSchema);

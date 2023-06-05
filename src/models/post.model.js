import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
      },
    },
  ],

  repost: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      
    },
  ],

  image : {
    type: String,
  },

  
});


  
  export default model("Post", PostSchema);
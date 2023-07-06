import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Female", "Male"],
    },
    password: {
      type: String,
      select: false,
    },
    socialAuthId: {
      type: Number,
      unique: false,
    },
    verificationCode: {
      type: Number,
      unique: false,
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  this.name = this.firstName + " " + this.lastName;
  next();
});

export default model("User", UserSchema);

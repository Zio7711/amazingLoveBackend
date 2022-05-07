import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [20, "Name must be less than 20 characters"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Email is not valid",
    },
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },

  lastName: {
    type: String,
    trim: true,
    maxlength: [20, "Last name must be less than 20 characters"],
    default: "lastName",
  },

  location: {
    type: String,
    trim: true,
    maxlength: [20, "Location must be less than 20 characters"],
    default: "location",
  },

  soulmate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    trim: true,
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", UserSchema);

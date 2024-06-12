import { Schema, model, models } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import { EnvConfig } from "../../config";
import { Roles } from "./user.constant";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    role: {
      type: String,
      enum: Roles,
      required: [true, "Role is required."],
    },
    phone: {
      type: String,
    },
    address: { type: String },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  const email = this.email;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error(`User already exists with ${email} email.`);
  }

  next();
});

userSchema.pre("save", async function (next) {
  const password = this.password;
  const hashedPassword = await bcrypt.hash(password, Number(EnvConfig.salt));
  this.password = hashedPassword;

  next();
});

userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

const User = models?.User || model("User", userSchema);

export default User;

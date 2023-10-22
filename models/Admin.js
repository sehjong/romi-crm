const authUtils = require("../utils/authUtils");
const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  // Other fields specific to admin users.
});

AdminSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  authUtils.hashPassword(user.password, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

AdminSchema.methods.comparePassword = function (candidatePassword, cb) {
  authUtils.comparePassword(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err, null);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("Admin", AdminSchema);

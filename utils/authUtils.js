const bcrypt = require("bcrypt");

// Password hash middleware.

module.exports = {
  hashPassword: function (password, callback) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return callback(err, null);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, hash);
      });
    });
  },

// Helper method for validating user's password.

  comparePassword: function (candidatePassword, hashedPassword, callback) {
    bcrypt.compare(candidatePassword, hashedPassword, (err, isMatch) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, isMatch);
    });
  },
};

const mongoose =  require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const mySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  password: {
    type: String,
    required: true,
  }
});

mySchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

mySchema.methods.comparePassword = function(passwordNew) {
  return bcrypt.compareSync(passwordNew, this.password);
};

const model = mongoose.model('User', mySchema);
module.exports = model;
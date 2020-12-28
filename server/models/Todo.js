const { model, Schema } = require('mongoose');

//the id will be generated automatically
const todoSchema = new Schema({
  body: String,
  created: String,
});

module.exports = model('Todo', todoSchema);

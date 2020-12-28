const Todo = require('../models/Todo');

module.exports = {
  Query: {
    async getTodos() {
      try {
        //to get all
        const todos = await Todo.find({}).sort({ created: -1 });
        return todos;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createTodo(_, { body }) {
      try {
        const newTodo = new Todo({
          body,
          created: new Date().toISOString(),
        });
        const todo = await newTodo.save();
        return todo;
      } catch (err) {
        throw new Error(err);
      }
    },

    async deleteTodo(_, { todoId }) {
      console.log({ todoId });
      try {
        const todo = await Todo.findById(todoId);
        if (todo) {
          await todo.delete();
          return 'Todo deleted!';
        } else {
          return 'Todo does not exist';
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

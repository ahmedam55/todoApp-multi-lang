import uuid from 'uuid';

class Todo {
  constructor(todo) {
    this.id = uuid.v1();
    this.text = todo.text;
    this.time = new Date();
    this.completed = false;
  }

  getId = () => {
    return this.id;
  };

  getText = () => {
    return this.text;
  };

  setText = (text) => (this.text = text);

  isCompleted = () => {
    return this.completed;
  };

  setCompleted = (completed) => (this.completed = completed);
}

export default Todo;

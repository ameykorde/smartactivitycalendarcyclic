import Todo from '../model/todo.mjs';

// Get all todo for a specific user
const getAllTodo = async (req, res) => {
  try {
    const userId = req.params.id;
    const todo = await Todo.find({ userId });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new todo for a specific user
const createTodo = async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    const todo = new Todo({ userId, title, description });
    const newTodo = await todo.save();
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a todo item for a specific user
const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const { userId, title, description } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, {
      title,
      description
    }, { new: true });
    if (!updatedTodo) {
      return res.status(404).json({ message: 'To-do item not found' });
    }
    if (updatedTodo.userId.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this to-do item' });
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a todo item for a specific user
const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const deletedTodo = await Todo.findOneAndDelete({ _id: todoId });
    if (!deletedTodo) {
      return res.status(404).json({ message: 'To-do item not found' });
    }
    res.json(deletedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Export the functions for use in other modules
export {
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo
};

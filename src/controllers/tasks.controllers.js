import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user : req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    
    // Validación básica
    if (!title || !description) {
      return res.status(400).json({
        message: ["Title and description are required"]
      });
    }

    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });
    
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    console.error("Create task error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;

    // Validación del ID
    if (!id) {
      return res.status(400).json({ 
        message: ["Task ID is required"] 
      });
    }

    // Validación básica de campos
    if (!title || !description) {
      return res.status(400).json({
        message: ["Title and description are required"]
      });
    }

    const taskUpdated = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, description, date },
      { new: true }
    );

    if (!taskUpdated) {
      return res.status(404).json({ 
        message: ["Task not found or you're not authorized"] 
      });
    }

    return res.json(taskUpdated);
  } catch (error) {
    console.error("Update task error:", error);
    return res.status(500).json({ 
      message: ["Error updating task", error.message] 
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

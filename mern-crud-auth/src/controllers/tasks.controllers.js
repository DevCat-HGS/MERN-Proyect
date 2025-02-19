import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    
    // Añadir información de vencimiento a cada tarea
    const tasksWithStatus = tasks.map(task => {
      const taskObj = task.toObject();
      taskObj.isOverdue = task.date && !task.completed && 
        new Date(task.date) < new Date().setHours(0, 0, 0, 0);
      return taskObj;
    });
    
    res.json(tasksWithStatus);
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
      completed: false  // Este es el valor por defecto
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
    
    const taskObj = task.toObject();
    taskObj.isOverdue = task.date && !task.completed && 
      new Date(task.date) < new Date().setHours(0, 0, 0, 0);
    
    return res.json(taskObj);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const toggleTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: ["Task not found"] });
    }

    // Verificar que el usuario sea el dueño de la tarea
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: ["Not authorized"] });
    }

    task.completed = !task.completed;
    await task.save();

    return res.json(task);
  } catch (error) {
    console.error("Toggle task status error:", error);
    return res.status(500).json({ 
      message: ["Error updating task status", error.message] 
    });
  }
};

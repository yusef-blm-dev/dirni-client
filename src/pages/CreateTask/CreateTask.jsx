import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../utils";
import "./createtask.css";
import toast from "react-hot-toast";

const CreateTask = () => {
  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "",
    status: "",
    dueDate: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      ...task,
      dueDate: task.dueDate ? task.dueDate : new Date().toISOString(),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/tasks/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (res.status === 200) {
        toast.success("Task created successfully");
        navigate("/tasks");
      } else {
        toast.error("Failed to create the task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("An error occurred while creating the task");
    }
  };

  return (
    <div className="container-general">
      <div className="create-task-container">
        <form onSubmit={handleSubmit}>
          <div className="create-task-form">
            <div className="left-side">
              <label htmlFor="name">Task Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={task.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={task.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="right-side">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                required
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={task.status}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="open">Open</option>
                <option value="done">Done</option>
              </select>
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit">Create Task</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;

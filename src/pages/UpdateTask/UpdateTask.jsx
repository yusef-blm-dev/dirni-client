import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../utils";
import "./updatetask.css";
import toast from "react-hot-toast";

const UpdateTask = () => {
  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "",
    status: "",
    dueDate: "",
  });
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch task");
        }
        const data = await res.json();
        setTask({
          _id: data._id,
          name: data.name ?? "",
          description: data.description ?? "",
          priority: data.priority ?? "Low",
          status: data.status ?? "open",
          dueDate: data.dueDate
            ? new Date(data.dueDate).toISOString().split("T")[0]
            : "",
          owner: data.owner,
        });
      } catch (error) {
        console.error("Failed to fetch task:", error);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      dueDate: task.dueDate ? task.dueDate : new Date().toISOString(),
    };

    delete updatedTask._id;

    try {
      const res = await fetch(`${API_BASE_URL}/tasks/${task._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (res.status === 200) {
        toast.success("Task Updated Successfully");
        navigate(`/tasks/${task._id}`);
      } else {
        toast.error("Failed To Updated Task");
      }
    } catch (error) {
      toast.error("An error occurred while updating the task");
    }
  };

  return (
    <div className="container-general">
      <div className="update-task-container">
        <form onSubmit={handleSubmit}>
          <div className="update-task-form">
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
          <button type="submit">Update Task</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;

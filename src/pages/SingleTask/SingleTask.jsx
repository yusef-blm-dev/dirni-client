import { useState, useEffect } from "react";
import "./singletask.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../utils";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import TaskSkeleton from "../../components/_skeletons/TaskSkeleton/TaskSkeleton";

const SingleTask = () => {
  const [task, setTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
        setTask(data);
      } catch (error) {
        console.error("Failed to fetch task:", error);
      }
    };
    fetchTask();
  }, [taskId]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        navigate("/tasks");
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (!task) {
    return <TaskSkeleton />;
  }

  return (
    <div className="container-general">
      <div className="container-task">
        <div className="container-task-title">{task.name}</div>
        <div className="container-task-info">
          <div className={task.priority === "High" ? "urgent" : "not-urgent"}>
            {task.priority}
          </div>
          <div className={task.status === "open" ? "open" : "done"}>
            {task.status}
          </div>
        </div>
        <div className="container-task-desc">{task.description}</div>
        <div className="container-task-links">
          <Link to={`/update-task/${task._id}`}>Edit Task</Link>
          <button onClick={() => setShowModal(true)}>Delete Task</button>
        </div>
        <Link to="/tasks" className="back-tasks">
          Go Back To Tasks
        </Link>
      </div>

      <ConfirmationModal
        show={showModal}
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
        message="Are you sure you want to delete this task?"
      />
    </div>
  );
};

export default SingleTask;

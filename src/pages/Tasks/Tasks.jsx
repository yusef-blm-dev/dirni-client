import { useEffect, useState } from "react";
import "./tasks.css";
import { API_BASE_URL } from "../../utils.js";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";
import { Link, useSearchParams } from "react-router-dom";
import SkeletonTasks from "../../components/_skeletons/SkeletonTasks/SkeletonTasks.jsx";
import TablePagination from "../../components/Pagination/TablePagination/TablePagination.jsx";
import { ChevronDown, ChevronUp } from "../../icons.jsx";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const [itemCount, setItemCount] = useState(0);
  const page = parseInt(searchParams.get("page")) || 1;
  const orderBy = searchParams.get("orderBy");
  const orderDirection = searchParams.get("orderDirection") || "asc";

  useEffect(() => {
    const fetchTasks = async () => {
      const query = searchParams.size ? `?${searchParams.toString()}` : "";
      const res = await fetch(
        `${API_BASE_URL}/tasks/user/${user._id}${query}`,
        {
          credentials: "include",
        }
      );
      if (res.status === 200) {
        const { tasks, taskCount } = await res.json();
        setTasks(tasks);
        setItemCount(taskCount);
        setLoading(false);
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    };
    fetchTasks();
  }, [searchParams, user._id]);

  const handleFilterByStatus = (e) => {
    const value = e.target.value;
    if (value) {
      searchParams.set("status", value);
    } else {
      searchParams.delete("status");
    }
    setSearchParams(searchParams);
  };

  const handleOrderBy = (field) => {
    if (orderBy === field) {
      const newDirection = orderDirection === "asc" ? "desc" : "asc";
      searchParams.set("orderDirection", newDirection);
    } else {
      searchParams.set("orderBy", field);
      searchParams.set("orderDirection", "asc");
    }
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  if (loading) {
    return <SkeletonTasks />;
  }

  return (
    <div className="container-general">
      <div className="tasks">
        <h1>Tasks</h1>
        <div className="before-table">
          <div className="selection-task">
            <select className="select-task" onChange={handleFilterByStatus}>
              <option value="">All</option>
              <option value="open">Open</option>
              <option value="done">Done</option>
            </select>
          </div>
          <Link to="/create-task">Create a New Task</Link>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleOrderBy("name")}>
                  Name{" "}
                  {orderBy === "name" &&
                    (orderDirection === "asc" ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    ))}
                </th>
                <th onClick={() => handleOrderBy("priority")}>
                  Priority{" "}
                  {orderBy === "priority" &&
                    (orderDirection === "asc" ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    ))}
                </th>
                <th onClick={() => handleOrderBy("status")}>
                  Status{" "}
                  {orderBy === "status" &&
                    (orderDirection === "asc" ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    ))}
                </th>
                <th onClick={() => handleOrderBy("due")}>
                  Due Date
                  {orderBy === "due" &&
                    (orderDirection === "asc" ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    ))}
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>
                    <Link to={`/tasks/${task._id}`}>{task.name}</Link>
                  </td>
                  <td>
                    <span className={task.priority === "High" ? "urgent" : ""}>
                      {task.priority}
                    </span>
                  </td>
                  <td>
                    <span className={task.status === "open" ? "open" : "done"}>
                      {task.status}
                    </span>
                  </td>
                  <td>{task.due?.split("T")[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <TablePagination
          itemCount={itemCount}
          pageSize={4}
          currentPage={page}
        />
      </div>
    </div>
  );
};

export default Tasks;

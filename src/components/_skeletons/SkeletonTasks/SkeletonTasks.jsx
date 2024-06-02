import React from "react";
import "./skeletonTasks.css";

const SkeletonTasks = () => {
  const skeletonRows = Array.from({ length: 5 }).map((_, index) => (
    <tr key={index}>
      <td>
        <div className="skeleton skeleton-text"></div>
      </td>
      <td>
        <div className="skeleton skeleton-text"></div>
      </td>
      <td>
        <div className="skeleton skeleton-text"></div>
      </td>
      <td>
        <div className="skeleton skeleton-text"></div>
      </td>
    </tr>
  ));

  return (
    <div className="container-general">
      <div className="tasks">
        <h1>Tasks</h1>
        <div className="table-wrapper">
          <div className="before-table">
            <div className="selection-task">
              <select className="select-task" disabled>
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="done">Done</option>
              </select>
            </div>
            <a href="#" className="disabled-link">
              Create a New Task
            </a>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>{skeletonRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SkeletonTasks;

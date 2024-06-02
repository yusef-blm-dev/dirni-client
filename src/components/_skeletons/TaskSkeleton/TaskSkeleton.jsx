import "./taskskeleton.css";

const TaskSkeleton = () => {
  return (
    <div className="container-general">
      <div className="container-task">
        <div className="skeleton skeleton-title"></div>
        <div className="container-task-info">
          <div className="skeleton skeleton-info"></div>
          <div className="skeleton skeleton-info"></div>
        </div>
        <div className="skeleton skeleton-desc"></div>
        <div className="container-task-links">
          <div className="skeleton skeleton-link"></div>
          <div className="skeleton skeleton-link"></div>
        </div>
        <div className="skeleton skeleton-back"></div>
      </div>
    </div>
  );
};

export default TaskSkeleton;

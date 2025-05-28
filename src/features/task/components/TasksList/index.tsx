import React from "react";
import TaskItem from "./TaskItem";

const TasksList: React.FC = () => {
  return (
    <div className="w-full h-full overflow-y-auto pr-2">
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
    </div>
  );
};

export default TasksList;

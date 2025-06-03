import React from "react";
import TaskItem from "./TaskItem";
import { useGetTasksList } from "../../hooks/useReactQuery";

type Props = {
  sectionId: string | number;
};

const TasksList: React.FC<Props> = ({ sectionId }) => {
  const { data } = useGetTasksList(sectionId);

  if (!data) return null;

  return (
    <div className="w-full h-full overflow-y-auto pr-2">
      {data.map((task, index) => {
        return <TaskItem {...task} key={task.id ?? index} />;
      })}
    </div>
  );
};

export default TasksList;

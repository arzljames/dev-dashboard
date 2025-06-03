import { Calendar } from "lucide-react";
import React, { useState } from "react";
import type { NewTaskItemProps } from "../../types";
import { TASK_PRIORITY_LEVEL } from "@/constant";
import moment from "moment";
import TaskForm from "./TaskForm";

const TaskItem: React.FC<NewTaskItemProps> = (data) => {
  const isDateOverdue = moment(data.endDate).isBefore(moment());
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={`w-full border ${isDateOverdue ? "border-red-300 bg-red-100" : "border-white bg-white hover:bg-slate-100"}  h-auto min-h-20 p-4 rounded-[10px] mb-[6px] shadow-sm flex flex-col justify-between cursor-pointer  transition duration-150`}
      >
        <h3 className="text-lg font-medium text-gray-800 mb-2 max-w-full two-line-ellipsis">
          {data.title}
        </h3>
        <p className="text-gray-500 text-sm">
          {!data.description || data.description === ""
            ? "(No description)"
            : data.description}
        </p>
        <div className="w-full h-full flex-col mt-2">
          <div className="flex flex-row justify-end items-center ">
            <div className="p-2 rounded-full">
              <Calendar size={18} className="text-gray-400" />
            </div>
            <PriorityTag priority={data.priority} />
          </div>

          <div className="flex justify-end mt-2">
            <p className="text-red-500 text-sm font-light italic">
              <i>This task is overdue</i>
            </p>
          </div>
        </div>
      </div>

      {/* The TaskForm can be used to create or edit a task item.
          If you pass a data prop, it means you are editing an existing item.
          Otherwise, it is creating a new item. */}
      {open && <TaskForm open={open} setOpen={setOpen} data={data} />}
    </>
  );
};

export default TaskItem;

const PriorityTag = ({ priority }: { priority: number }) => {
  const bgCssColor = (() => {
    switch (priority) {
      case 1:
        return "bg-slate-400";
      case 2:
        return "bg-emerald-400";
      case 3:
        return "bg-orange-400";
      case 4:
        return "bg-red-400";
      default:
        return "bg-emerald-400";
    }
  })();
  return (
    <span
      className={`ml-2 rounded-full py-1 px-3 ${bgCssColor} text-white text-xs whitespace-nowrap`}
    >
      {TASK_PRIORITY_LEVEL.find((item) => item.id === priority)?.name ??
        "Normal"}
    </span>
  );
};

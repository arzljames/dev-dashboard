import { Calendar } from "lucide-react";
import React from "react";

const TaskItem: React.FC = () => {
  return (
    <div className="w-full border border-white bg-white h-auto min-h-30 p-4 rounded-[10px] mb-[6px] shadow-sm flex flex-col justify-between cursor-pointer">
      <h3 className="text-lg text-gray-800 mb-2">This is a sample task</h3>
      <p className="text-gray-500 text-sm">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus,
        sequi.
      </p>
      <div className="w-full h-full flex-col mt-8">
        <div className="flex flex-row justify-end items-center">
          <div className="p-2 rounded-full">
            <Calendar size={18} className="text-gray-400" />
          </div>
          <span className="ml-2 rounded-full py-1 px-3 bg-slate-400 text-white text-xs whitespace-nowrap">
            Low Priority
          </span>
        </div>

        {/* <span className="rounded-full py-1 px-3 bg-green-400 text-white ml-2 text-xs whitespace-nowrap">
                  Normal
                </span>
                <span className="rounded-full py-1 px-3 bg-orange-400 text-white ml-2 text-xs whitespace-nowrap">
                  High Priority
                </span>
                <span className="rounded-full py-1 px-3 bg-red-400 text-white ml-2 text-xs whitespace-nowrap">
                  Urgent
                </span> */}
      </div>
    </div>
  );
};

export default TaskItem;

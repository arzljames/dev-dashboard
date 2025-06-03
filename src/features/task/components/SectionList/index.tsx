import React, { useState } from "react";
import TasksList from "../TasksList";
import { useGetSectionList } from "../../hooks/useReactQuery";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import TaskForm from "../TasksList/TaskForm";

const SectionList: React.FC = () => {
  const { data } = useGetSectionList();
  const [open, setOpen] = useState<boolean>(false);

  if (!data) return null;

  return (
    <div className="flex flex-row overflow-x-auto px-8 py-4 space-x-4">
      {data.map((section, index) => {
        return (
          <div
            key={section.id ?? index}
            className="flex flex-col w-[400px] h-full bg-slate-200 rounded-[10px] p-4 pr-2 overflow-hidden"
          >
            <h2 className="font-medium text-gray-700 mb-4">{section.title}</h2>
            <TasksList sectionId={section.id} />
            <Button
              onClick={() => setOpen(true)}
              className="mt-2 rounded cursor-pointer shadow-none text-gray-400 !bg-transparent hover:text-gray-600 duration-150 transition"
            >
              <PlusIcon /> Add new task
            </Button>
            <TaskForm open={open} setOpen={setOpen} />
          </div>
        );
      })}
    </div>
  );
};

export default SectionList;

import AppHeader from "@/components/shared/AppHeader";
import { Button } from "@/components/ui/button";

import CreateSectionForm from "@/features/task/components/CreateSectionForm";
import Taskitem from "@/features/task/components/Taskitem";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-full flex flex-col">
      <AppHeader headerTitle="Task Board">
        <CreateSectionForm />
      </AppHeader>

      <div className="flex flex-row overflow-x-auto px-8 py-4 space-x-4">
        <div className="flex flex-col w-[400px] h-full bg-slate-200 rounded-[10px] p-4 pr-2 overflow-hidden">
          <h2 className="font-medium text-gray-700 mb-4">Example Section</h2>

          <div className="w-full h-full overflow-y-auto pr-2">
            <Taskitem />
          </div>

          <Button className="mt-2 rounded cursor-pointer shadow-none text-gray-500">
            <Plus /> Add new task
          </Button>
        </div>
      </div>
    </div>
  );
}

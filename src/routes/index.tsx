import AppHeader from "@/components/shared/AppHeader";
import { Button } from "@/components/ui/button";
import CreateSectionForm from "@/features/task/components/CreateSectionForm";
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
        <div className="flex flex-col w-[400px] h-full bg-slate-200 rounded-[10px] p-4 overflow-hidden">
          <h2 className="font-medium text-gray-700 mb-4">Example Section</h2>

          <div className="flex-1 overflow-y-auto">
            <div className="w-full bg-slate-50 h-20 p-4 rounded-[10px] mb-[6px] shadow-sm">
              <div className="flex flex-row items-center">
                <span className="rounded-full py-1 px-3 text-shadow-secondary bg-slate-400 text-white ml-2 text-xs whitespace-nowrap">
                  Low Priority
                </span>
                <span className="rounded-full py-1 px-3 text-shadow-neutral-900 bg-green-400 text-white ml-2 text-xs whitespace-nowrap">
                  Normal
                </span>
                <span className="rounded-full py-1 px-3 text-shadow-neutral-900 bg-orange-400 text-white ml-2 text-xs whitespace-nowrap">
                  High Priority
                </span>
                <span className="rounded-full py-1 px-3 text-shadow-neutral-900 bg-red-400 text-white ml-2 text-xs whitespace-nowrap">
                  Urgent
                </span>
              </div>
            </div>
          </div>

          <Button className="mt-2 rounded cursor-pointer shadow-none text-gray-500">
            <Plus /> Add new task
          </Button>
        </div>
      </div>
    </div>
  );
}

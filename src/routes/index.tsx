import AppHeader from "@/components/shared/AppHeader";
import { Button } from "@/components/ui/button";
import CreateSectionForm from "@/features/task/components/CreateSectionForm";
import { createFileRoute } from "@tanstack/react-router";
import {
  Calendar,
  Calendar1,
  CalendarDaysIcon,
  Database,
  Plus,
  Timer,
  TimerIcon,
} from "lucide-react";

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
            <div className="w-full border border-red-300 bg-red-100 h-auto min-h-30 p-4 rounded-[10px] mb-[6px] shadow-sm flex flex-col justify-between">
              <h3 className="text-lg text-gray-800">This is a sample task</h3>
              <div className="w-full h-full flex-col mt-8">
                <div className="flex flex-row items-center mb-2">
                  <Calendar size={18} className="text-gray-400" />
                  <p className="ml-2 text-sm text-gray-400">07/01/2025</p>
                </div>
                <div className="flex flex-row justify-end">
                  <span className="rounded-full py-1 px-3 bg-slate-400 text-white text-xs whitespace-nowrap">
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

            <div className="w-full border border-white bg-white h-auto min-h-30 p-4 rounded-[10px] mb-[6px] shadow-sm flex flex-col justify-between cursor-pointer">
              <h3 className="text-lg text-gray-800 mb-2">
                This is a sample task
              </h3>
              <p className="text-gray-500 text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Temporibus, sequi.
              </p>
              <div className="w-full h-full flex-col mt-8">
                <div className="flex flex-row justify-end items-center">
                  <Calendar size={18} className="text-gray-400" />
                  <span className="ml-4 rounded-full py-1 px-3 bg-slate-400 text-white text-xs whitespace-nowrap">
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
          </div>

          <Button className="mt-2 rounded cursor-pointer shadow-none text-gray-500">
            <Plus /> Add new task
          </Button>
        </div>
      </div>
    </div>
  );
}

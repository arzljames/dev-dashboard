import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import CreateForm from "./CreateForm";
import { useState } from "react";

export function CreateTaskForm() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)} className="!bg-transparent">
        <Button className="mt-2 rounded cursor-pointer shadow-none text-gray-400 !bg-transparent hover:text-gray-600 duration-150 transition">
          <Plus /> Add new task
        </Button>
      </DialogTrigger>
      <CreateForm setOpen={setOpen} />
    </Dialog>
  );
}

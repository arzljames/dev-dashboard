import { useMutation } from "@tanstack/react-query";
import { createTaskItem, type NewTaskItemProps } from "../services";
import { toast } from "sonner";

export const useCreateTaskItem = () => {
  return useMutation({
    mutationFn: (item: NewTaskItemProps) => createTaskItem(item),
    onSuccess: () => {
      toast.success("Your new task has been added successfully.");
    },
    onError: (_err) => {
      toast.success("Something went wrong while creating your task.");
    },
  });
};

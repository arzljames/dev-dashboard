import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTaskItem, getSectionList, getTasksList } from "../services";
import { type NewTaskItemProps } from "../types";
import { toast } from "sonner";

export const useCreateTaskItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: NewTaskItemProps) => createTaskItem(item),
    onSuccess: () => {
      toast.success("Your new task has been added successfully.");
      queryClient.invalidateQueries({
        queryKey: ["tasksList"],
      });
    },
    onError: (_err) => {
      toast.success("Something went wrong while creating your task.");
    },
  });
};

export const useGetSectionList = () => {
  return useQuery({
    queryKey: ["statusSection"],
    queryFn: () => getSectionList(),
  });
};

export const useGetTasksList = (sectionId?: string | number | undefined) => {
  return useQuery({
    queryKey: ["tasksList", sectionId],
    queryFn: () => getTasksList(sectionId),
  });
};

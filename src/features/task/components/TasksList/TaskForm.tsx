import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
  Dialog,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TASK_PRIORITY_LEVEL } from "@/constant";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { useForm, type SubmitHandler } from "react-hook-form";
import React, {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { useCreateTaskItem } from "../../hooks/useReactQuery";
import { createLocalStorageEntry, getItem } from "../../services";

export type Inputs = {
  title: string;
  description: string;
  status: number | string;
  priority: number;
  startDate: string;
  effortDays: number;
  endDate: string;
};

type SectionsDataProps = {
  id: number | string;
  title: string;
};

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: Inputs | undefined;
};

const TaskForm: React.FC<Props> = ({ setOpen, open, data }) => {
  const [date, setDate] = useState<Date>();
  const [sectionsData, setSectionsData] = useState<SectionsDataProps[]>([]);

  // React query hook
  const {
    mutate: createItemMutate,
    isSuccess: isCreateSuccess,
    isPending: isCreating,
  } = useCreateTaskItem();

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm<Inputs>();

  // Handler to register and validate status of item
  const handleStatusChange = (value: string) => {
    setValue("status", parseInt(value) ?? 0); // default to 0 - No status
  };

  // Handler to register and validate priority tag of item
  const handlePriorityChange = (value: string) => {
    const level = TASK_PRIORITY_LEVEL.find((p) => p.name === value)?.id ?? 2; // default to normal if no value
    setValue("priority", level);
  };

  // Handler to register and validate start date
  const handleStartDateChange = (date?: Date) => {
    if (date) {
      setValue("startDate", date.toISOString());
    }
  };

  // Handler to to submit create new item
  const handleCreateItem: SubmitHandler<Inputs> = (data) => {
    const uniqueId = uuidv4();
    const inputValues = { ...data };

    if (!data.priority) inputValues.priority = 2; // default to no normal priority
    if (!data.status) inputValues.status = 0; // default to no status
    if (!data.startDate) inputValues.startDate = new Date().toDateString(); // default to today

    createItemMutate({ ...inputValues, id: uniqueId });
  };

  // Fetch the list of saved sections from the local storage
  // This will be used as an array options in the Select field
  useEffect(() => {
    const savedSections = getItem({ key: "STATUS_SECTION" });

    // If there is no current sections in local storage create new
    // Default first section is Queued — No Status
    if (!savedSections) {
      const initialData = [{ id: 0, title: "Queued — No Status" }];
      createLocalStorageEntry({ key: "STATUS_SECTION", value: initialData });
      setSectionsData(initialData);
      return;
    }

    // Else saved the current data in this local state
    setSectionsData(savedSections);
  }, [data]);

  const watchedPriority = watch("priority");
  const watchedEffortDays = watch("effortDays");
  const watchedStartDate = watch("startDate");
  const watchedStatus = watch("status");

  // If data prop is passed, reset form
  // This will edit existing item
  useEffect(() => {
    if (data) {
      reset({ ...data, status: data.status }); // this sets the form values to the passed data object
      setDate(new Date(data.startDate));
    }
  }, [data, reset]);

  useEffect(() => {
    if (watchedEffortDays && !watchedStartDate) {
      setDate(new Date());
      setValue("startDate", new Date().toISOString());
    }
  }, [watchedEffortDays]);

  useEffect(() => {
    if (isCreateSuccess) setOpen(false);

    if (isCreateSuccess) reset();
  }, [isCreateSuccess, isCreating]);

  const endDateValue = useMemo(() => {
    if (!watchedEffortDays || !watchedStartDate) {
      setValue("endDate", new Date().toISOString());
      return undefined;
    }

    const start = new Date(watchedStartDate);
    const result = new Date(start);
    result.setDate(result.getDate() + Number(watchedEffortDays));
    setValue("endDate", result.toISOString());
    return result;
  }, [watchedEffortDays, watchedStartDate]);

  const priorityTagCss = useMemo(() => {
    switch (watchedPriority) {
      case 1:
        return "bg-slate-400 px-3 rounded-full text-white"; // low prio
      case 2:
        return "bg-emerald-400 px-3 rounded-full text-white"; // normal
      case 3:
        return "bg-orange-400 px-3 rounded-full text-white"; // high prio
      case 4:
        return "bg-red-400 px-3 rounded-full text-white"; // urgent
      default:
        return "bg-transparent";
    }
  }, [watchedPriority]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white outline-none border-none rounded-none md:rounded-[10px] min-w-[100%] max-h-[100%] md:max-h-[500px] h-full justify-between flex flex-col md:min-w-[600px]">
        <DialogHeader className="mb-4">
          <DialogTitle className="font-normal">Add New Task</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col overflow-y-scroll h-full py-4">
          <div className="mb-6 w-full">
            <Label>Title *</Label>
            <Input
              className={`border ${errors?.title ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-gray-400 bg-gray-50"}  rounded-[6px] mt-2 placeholder:text-slate-500`}
              type="text"
              id="title"
              placeholder="Task title"
              {...register("title", { required: "Title field is required" })}
            />
            {errors?.title && (
              <RenderErrorMessage errorMessage={errors?.title.message} />
            )}
          </div>

          <div className="mb-6 w-full">
            <Label>Description</Label>
            <Textarea
              placeholder="Type your task description here"
              className="mt-2 rounded-[6px] border border-gray-300 placeholder:text-slate-500 focus:border-gray-400 max-h-50 min-h-30 bg-gray-50"
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <div>
              <Label>Status </Label>
              <Select
                value={String(watchedStatus)}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger
                  className={`w-full mt-2 rounded-[6px] ${errors?.status ? "border-red-500 !bg-red-50" : "border-gray-300"} `}
                >
                  <SelectValue placeholder="Set status" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-[6px] border-gray-300">
                  <SelectGroup>
                    {sectionsData.map((item, index) => {
                      return (
                        <SelectItem key={index} value={String(item.id)}>
                          {item.title}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors?.status && (
                <RenderErrorMessage errorMessage={errors?.status.message} />
              )}
            </div>
            <div>
              <Label>Priority</Label>
              <Select onValueChange={handlePriorityChange}>
                <SelectTrigger
                  className={`w-full mt-2 rounded-[6px] ${errors?.priority ? "border-red-500 !bg-red-50" : "border-gray-300"} `}
                >
                  <div className={`  ${priorityTagCss}`}>
                    <SelectValue placeholder="Set priority" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white rounded-[6px] border-gray-300">
                  <SelectGroup>
                    {TASK_PRIORITY_LEVEL.map((item, index) => {
                      return (
                        <SelectItem key={index} value={item.name}>
                          {item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors?.priority && (
                <RenderErrorMessage errorMessage={errors?.priority.message} />
              )}
            </div>
          </div>

          <div className="grid grid-cols-[2fr_1fr_2fr] gap-3">
            <div className="mb-4 w-full">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger
                  asChild
                  className="w-full mt-2 rounded-[6px] border-gray-300 "
                >
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-full p-0 bg-white border-gray-300 rounded-[6px]"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(val) => {
                      setDate(val ?? new Date()); // optional local state
                      handleStartDateChange(val); // update form value
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="mb-4 w-full min-w-[80px]">
              <Label>Effort Days</Label>
              <Input
                className={`border ${errors?.effortDays ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-gray-400 bg-gray-50"} rounded-[6px] mt-2 placeholder:text-slate-500 `}
                type="number"
                id="effortDays"
                placeholder="e.g. 2"
                min={1}
                max={20}
                {...register("effortDays", {
                  required: "Effort days field is required",
                  min: { value: 1, message: "Minimum is 1 day" },
                  max: { value: 20, message: "Maximum is 20 days" },
                  valueAsNumber: true,
                })}
              />

              {errors?.effortDays && (
                <RenderErrorMessage errorMessage={errors?.effortDays.message} />
              )}
            </div>

            <div className="mb-4 w-full">
              <Label>End Date</Label>
              <Popover>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal mt-2 border border-gray-300 bg-slate-50",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {endDateValue ? (
                    format(endDateValue, "PPP")
                  ) : (
                    <span>Based on effort days</span>
                  )}
                </Button>
              </Popover>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              onClick={() => setOpen(false)}
              type="submit"
              className="!bg-white rounded-[6px] text-blue-600 font-normal min-w-30 hover:!bg-slate-100 shadow-none cursor-pointer transition duration-150"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isCreating || !isValid}
            onClick={handleSubmit(handleCreateItem)}
            className="!bg-blue-500 rounded-[6px] text-white font-normal min-w-30 hover:!bg-blue-600 cursor-pointer transition duration-150"
          >
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;

const RenderErrorMessage = ({
  errorMessage = "",
}: {
  errorMessage?: string | undefined;
}) => {
  return (
    <p className="text-red-500 text-sm font-light mt-1 pl-1 text-nowrap">
      {errorMessage}
    </p>
  );
};

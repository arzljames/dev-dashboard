import { ListTodo, NotebookPen, Timer, Code } from "lucide-react";

export const NAVIGATION_LINKS = [
  {
    id: 1,
    name: "Task Manager",
    path: "/",
    icon: ListTodo,
  },
  {
    id: 2,
    name: "Promodoro Timer",
    path: "/promodoro",
    icon: Timer,
  },
  {
    id: 3,
    name: "Markdown Notes",
    path: "/markdown-notes",
    icon: NotebookPen,
  },
  {
    id: 4,
    name: "Code Snippet",
    path: "/code-snippet",
    icon: Code,
  },
];

export const TASK_PRIORITY_LEVEL = [
  {
    id: 1,
    name: "Low",
  },
  {
    id: 2,
    name: "Normal",
  },
  {
    id: 3,
    name: "High",
  },
  {
    id: 4,
    name: "Ugent",
  },
];

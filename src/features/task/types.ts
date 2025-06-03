export type LocalStorageProps = {
  key: string;
  value: string | number | object;
};

export type NewTaskItemProps = {
  id: string;
  title: string;
  description: string;
  status: number | string;
  priority: number;
  startDate: string;
  effortDays: number;
  endDate: string;
};

export type SectionListProps = {
  id: string | number;
  title: string;
};

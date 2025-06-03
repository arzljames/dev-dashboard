import AppHeader from "@/components/shared/AppHeader";
import CreateSectionForm from "@/features/task/components/CreateSectionForm";
import SectionList from "@/features/task/components/SectionList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full h-full flex flex-col">
      <AppHeader headerTitle="Task Board">
        <CreateSectionForm />
      </AppHeader>

      <SectionList />
    </div>
  );
}

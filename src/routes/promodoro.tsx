import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/promodoro")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/promodoro"!</div>;
}

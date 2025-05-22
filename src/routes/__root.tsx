import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import "../index.css";
import MainContainer from "@/components/shared/main-container";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <MainContainer>
        <Outlet />
      </MainContainer>
    </React.Fragment>
  );
}

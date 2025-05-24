import React from "react";
import AppSiderbar from "@/components/app-sidebar";

type Props = {
  children: React.ReactNode;
};

const MainContainer: React.FC<Props> = ({ children }) => {
  return (
    <main className="w-screen h-[100dvh] bg-white flex flex-row p-3 pl-0">
      <AppSiderbar />
      <ChildrenWrapper children={children} />
    </main>
  );
};

export default MainContainer;

const ChildrenWrapper = ({ children }: Props) => {
  return (
    <div className="flex-1 bg-slate-100 rounded-2xl overflow-hidden">
      {children}
    </div>
  );
};

import React from "react";

type Props = {
  children: React.ReactNode;
  headerTitle: string;
};

const AppHeader: React.FC<Props> = ({ children, headerTitle }) => {
  return (
    <div className="min-h-18 flex flex-row items-center justify-between px-8">
      <h1 className="text-lg font-semibold text-gray-700">
        {headerTitle ?? ""}
      </h1>
      {children}
    </div>
  );
};

export default AppHeader;

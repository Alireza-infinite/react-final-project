import React from "react";

type Props = {
  children: React.ReactNode;
};

const PageHeader = ({ children }: Props) => {
  return (
    <div className="mb-4 flex w-full items-center justify-between border-b border-neutral-200 bg-gray-50 px-2 py-2 dark:bg-gray-900">
      {children}
    </div>
  );
};

export default PageHeader;

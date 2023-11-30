import React from "react";

type Props = {};

const Spinner = (props: Props) => {
  return (
    <div className="h-6 w-6 animate-spin rounded-full border-t-4 border-t-blue-500"></div>
  );
};

export default Spinner;

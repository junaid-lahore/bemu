import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const CenteredContent: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`w-[90%] md:w-[80%] mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default CenteredContent;

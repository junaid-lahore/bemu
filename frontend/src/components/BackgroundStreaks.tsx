import React from 'react';

const BackgroundStreaks: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="streak streak-1" />
      <div className="streak streak-2" />
      <div className="streak streak-3" />
    </div>
  );
};

export default BackgroundStreaks;

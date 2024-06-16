import React from 'react';

interface PairTitleTextProps {
  title: string;
  text: string;
}

const PairTitleText: React.FC<PairTitleTextProps> = ({ title, text }) => {
  return (
    <div className="flex space-x-4">
      <p className="text-bold">{title}</p>
      <p className="">{text}</p>
    </div>
  );
};

export default PairTitleText;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const RenderButtonComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/view-filters');
  };

  return (
    <div>
      <button onClick={handleClick}>Go to View Details</button>
    </div>
  );
};

export default RenderButtonComponent;

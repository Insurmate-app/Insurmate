import React from 'react';
import '../styles/RubikSpinner.css';

const RubikSpinner = ({ size = 40, fullScreen = true }) => {
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    '--size': `${size}px`
  };

  // Create a 3x3 grid for each face
  const renderGrid = () => {
    return (
      <div className="rubik-grid">
        {Array(9).fill().map((_, i) => (
          <div key={i} className="rubik-cell"></div>
        ))}
      </div>
    );
  };

  const spinner = (
    <div className="rubik-spinner-container" style={containerStyle}>
      <div className="rubik-spinner">
        <div className="rubik-face rubik-face-front">{renderGrid()}</div>
        <div className="rubik-face rubik-face-back">{renderGrid()}</div>
        <div className="rubik-face rubik-face-right">{renderGrid()}</div>
        <div className="rubik-face rubik-face-left">{renderGrid()}</div>
        <div className="rubik-face rubik-face-top">{renderGrid()}</div>
        <div className="rubik-face rubik-face-bottom">{renderGrid()}</div>
      </div>
    </div>
  );

  if (fullScreen) {
    return <div className="loading-overlay">{spinner}</div>;
  }

  return spinner;
};

export default RubikSpinner;
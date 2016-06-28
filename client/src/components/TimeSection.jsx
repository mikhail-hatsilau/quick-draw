import React from 'react';
import Timer from './Timer';

function TimeSection(props) {
  return (
    <div className="time-section">
      <Timer>{props.timeSpent}</Timer>
    </div>
  );
}

export default TimeSection;

import React, { PropTypes } from 'react';
import Timer from './Timer';

function TimeSection(props) {
  return (
    <div className="time-section">
      <Timer>{props.timeSpent}</Timer>
      <div className="deprecated-selectors">
        Deprecated symbols: {props.deprecatedSymbols}
      </div>
    </div>
  );
}

TimeSection.propTypes = {
  timeSpent: PropTypes.number,
  deprecatedSymbols: PropTypes.string,
};

export default TimeSection;

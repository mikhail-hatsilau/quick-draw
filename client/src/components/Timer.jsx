import React, { PropTypes } from 'react';

function Timer(props) {
  function convertTime(time) {
    const minutes = parseInt(+time / 60);
    const seconds = +time - minutes * 60;
    const minutsStr = minutes < 10 ? '0' + minutes : '' + minutes;
    const secondsStr = seconds < 10 ? '0' + seconds : '' + seconds;
    return minutsStr + ':' + secondsStr;
  }
  const convertedTime = <span>{convertTime(props.children)}</span>
  return (
    <div>
      {convertedTime}
    </div>
  );
}

Timer.propTypes = {
  children: PropTypes.number,
};

export default Timer;

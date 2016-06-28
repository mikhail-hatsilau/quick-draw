import React, { PropTypes } from 'react';
import Timer from './Timer';

function CurrentTask(props) {
  return (
    <div className="current-task">
      <div className="current-task-name">
        Task name:
        {props.task.get('name')}
      </div>
      <div>
        Time spent:
        <Timer>{props.timeSpent}</Timer>
      </div>
    </div>
  );
}

CurrentTask.propTypes = {
  task: PropTypes.object,
  taskInProgress: PropTypes.bool,
  timeSpent: PropTypes.number,
};

export default CurrentTask;

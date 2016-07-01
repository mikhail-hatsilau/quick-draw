import React, { PropTypes } from 'react';
import Timer from './Timer';

class TasksTableItem extends React.Component {
  render() {
    return (
      <td>
        <div>
          <div><Timer>{this.props.time || ''}</Timer></div>
          <div>{this.props.selector || ''}</div>
        </div>
      </td>
    );
  }
}

TasksTableItem.propTypes = {
  time: PropTypes.number,
  selector: PropTypes.string,
};

export default TasksTableItem;

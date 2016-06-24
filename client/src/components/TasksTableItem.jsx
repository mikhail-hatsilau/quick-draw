import React, { PropTypes } from 'react';

class TasksTableItem extends React.Component {
  render() {
    return (
      <td>
        <div>
          <div>{this.props.time || ''}</div>
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

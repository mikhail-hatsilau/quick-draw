import React from 'react';
import TasksTableItem from './TasksTableItem';

class TasksTableRow extends React.Component {
  render() {
    return (
      <tr>
        <TasksTableItem />
      </tr>
    );
  }
}

export default TasksTableRow;

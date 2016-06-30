import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Navigation() {
  return (
    <ul>
      <li>
        <Link to="/users">Users</Link>
      </li>
      <li>
        <Link to="/tasks">Tasks</Link>
      </li>
      <li>
        <Link to="/quizBoard">Quiz board</Link>
      </li>
    </ul>
  );
}

export default Navigation;

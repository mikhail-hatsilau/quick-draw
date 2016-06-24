import React, { PropTypes } from 'react';

function ParticipantRow(props) {
  return (
    <tr>
      <td>{props.participant.get('user').get('username')}</td>
    </tr>
  );
}

ParticipantRow.propTypes = {
  participant: PropTypes.object,
};

export default ParticipantRow;

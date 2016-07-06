import React, { PropTypes } from 'react';
import ParticipantRow from './ParticipantRow';

class ParticipantTable extends React.Component {
  render() {
    const participants = this.props.participants.map(participant => (
      <ParticipantRow
        key={participant.get('_id')}
        participant={participant}
      />
    ));
    return (
      <div className="participant">
        <table className="bordered-table">
          <thead>
            <tr>
              <th>
                <div>
                  <div>Participant</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {participants}
          </tbody>
        </table>
      </div>
    );
  }
}

ParticipantTable.propTypes = {
  participants: PropTypes.object,
};

export default ParticipantTable;

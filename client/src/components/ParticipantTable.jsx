import React from 'react';
import ParticipantRow from './ParticipantRow';

class ParticipantTable extends React.Component {
  render() {
    return (
      <div className="participant">
        <table className="bordered-table">
          <thead>
            <tr>
              <th>
                <div>
                  Participant
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <ParticipantRow />
          </tbody>
        </table>
      </div>
    );
  }
}

export default ParticipantTable;

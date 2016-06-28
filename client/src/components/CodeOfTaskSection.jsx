import React, { PropTypes } from 'react';
import CodeRow from './CodeRow';

class CodeOfTaskSection extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const rows = this.props.code.split('\n').map((line, index) => (
      <CodeRow lineNumber={index}>{line}</CodeRow>
    ));
    return (
      <div className="code-of-task">
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

CodeOfTaskSection.propTypes = {
  code: PropTypes.string,
  selector: PropTypes.string,
};

export default CodeOfTaskSection;

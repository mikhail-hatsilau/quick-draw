import React, { PropTypes } from 'react';
import CodeRow from './CodeRow';

class CodeOfTaskSection extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const rows = this.props.code.split('\n').map((line, index) => {
      let chosen = false;
      let needed = false;
      if (this.props.currentAnswares.indexOf('' + index) !== -1) {
        chosen = true;
      }
      if (this.props.neededAnswares.indexOf('' + index) !== -1) {
        needed = true;
      }
      return <CodeRow lineNumber={index} needed={needed} chosen={chosen}>{line}</CodeRow>;
    });
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
  currentAnswares: PropTypes.array,
  neededAnswares: PropTypes.string,
};

export default CodeOfTaskSection;

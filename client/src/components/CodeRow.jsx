import React, { PropTypes } from 'react';

class CodeRow extends React.Component {
  constructor(props) {
    super(props);
    this.getStyledRow = this.getStyledRow.bind(this);
  }
  getStyledRow() {
    const line = this.props.children;
    const tagSpan = '<span class="tag">';
    const attrSpan = '<span class="attr">';
    const attrValueSpan = '<span class="attr-value">';
    const closedSpan = '</span>';
    let newLine = line.replace(/([a-zA-Z\-]+)(?==)|\s([a-zA-Z\-]+)\s*/g, (str, g1, g2) => (
      '&attr ' + g2 + '&close'
    ));
    newLine = newLine.replace(/(<|<\/)([a-zA-Z]+)/g, (str, g1, g2) => (
      g1 + '&tag' + g2 + '&close'
    ));
    newLine = newLine.replace(/"\w+"|'\w+'/g, str => (
      "&value" + str + "&close"
    ));
    newLine = newLine
      .replace(/</g, '&lt')
      .replace(/>/g, '&gt')
      .replace(/&tag/g, tagSpan)
      .replace(/&close/g, closedSpan)
      .replace(/&attr/g, attrSpan)
      .replace(/&value/g, attrValueSpan);
    return newLine;
  }
  render() {
    return (
      <tr>
        <td className="code-row-number">{this.props.lineNumber}</td>
        <td></td>
        <td dangerouslySetInnerHTML={{ __html: this.getStyledRow() }} ></td>
      </tr>
    );
  }
}

CodeRow.propTypes = {
  children: PropTypes.string,
  lineNumber: PropTypes.number,
};

export default CodeRow;

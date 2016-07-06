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
    newLine = newLine.replace(/^\s+/, str => {
      let newStr = '';
      for (let i = 0, l = str.length; i < l; i++) {
        newStr += '&nbsp';
      }
      return newStr;
    });
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
    let className = '';
    if (this.props.chosen && this.props.needed) {
      className = 'needed-element-chosen';
    } else if (this.props.chosen) {
      className = 'wrong-element-chosen';
    } else if (this.props.needed) {
      className = 'element-needed';
    }
    return (
      <tr>
        <td className="code-row-number">{this.props.lineNumber}</td>
        <td className={className}></td>
        <td dangerouslySetInnerHTML={{ __html: this.getStyledRow() }} ></td>
      </tr>
    );
  }
}

CodeRow.propTypes = {
  children: PropTypes.string,
  lineNumber: PropTypes.number,
  needed: PropTypes.bool,
  chosen: PropTypes.bool,
};

export default CodeRow;

import React, { PropTypes } from 'react';
import classNames from 'classnames';

class AnswareSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const value = event.target.value;
    this.setState({
      value,
    });
    this.props.answareChanged(value);
  }
  render() {
    const classes = classNames('answare-section', {
      'deprecated-error': this.props.deprecatedError,
    });
    return (
      <div className={classes}>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

AnswareSection.propTypes = {
  answareChanged: PropTypes.func,
  deprecatedError: PropTypes.bool,
};

export default AnswareSection;

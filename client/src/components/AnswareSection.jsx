import React, { PropTypes } from 'react';

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
    return (
      <div className="answare-section">
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
};

export default AnswareSection;

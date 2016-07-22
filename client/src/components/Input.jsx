import React, { PropTypes } from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || '',
      isValid: true,
      touched: false,
      submitted: false,
      errors: [],
      index: -1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }
  componentWillMount() {
    const index = this.context.attachComponent(this);
    this.setState({
      index,
    });
  }
  componentWillUnmount() {
    this.context.detachComponent(this.state.index);
  }
  handleChange(event) {
    // const valid = this.validateField(event.target.value);
    this.setState({
      value: event.target.value,
      // isValid: valid,
    }, () => {
      this.context.validateForm();
    });
  }
  handleFocus() {
    this.setState({
      touched: true,
    });
  }
  render() {
    const errors = this.state.errors.map(error => (
      <div className="error">{error}</div>
    ));
    return (
      <div className="form-element">
        {this.props.label ? <label htmlFor={this.props.name}>{this.props.label}</label> : null}
        <input
          id={this.props.name}
          type={this.props.type}
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          placeholder={this.props.placeholder}
          />
        {!this.state.isValid && this.state.submitted ?
          <div className="errors">{errors}</div> :
          null
        }
      </div>
    );
  }
}

Input.propTypes = {
  validators: PropTypes.array,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.contextTypes = {
  attachComponent: PropTypes.func,
  detachComponent: PropTypes.func,
  validateForm: PropTypes.func,
};

export default Input;

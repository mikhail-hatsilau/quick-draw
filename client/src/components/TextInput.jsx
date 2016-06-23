import React, { PropTypes } from 'react';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isValid: !this.props.requiredField,
      touched: false,
      errorMessage: this.props.errorMessage,
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateField = this.validateField.bind(this);
    this.handleFocus = this.handleFocus(this);
  }
  componentWillMount() {
    this.context.attachComponent(this);
  }
  handleChange(event) {
    let valid = false;
    if (this.validateField(event.target.value)) {
      valid = true;
    }
    this.setState({
      value: event.target.value,
      isValid: valid,
    }, () => {
      this.context.validateForm();
    });
  }
  validateField(value) {
    const required = this.props.requiredField;
    if (required) {
      if (value.trim() === '') {
        return false;
      }
    }
    return true;
  }
  handleFocus(event) {
    console.log(event);
  }
  render() {
    return (
      <div className="form-element">
        {this.props.label ? <label htmlFor={this.props.name}>{this.props.label}</label> : null}
        <input
          id={this.props.name}
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
        />
        {!this.state.isValid && (this.state.touched || this.state.submitted) ?
          <div>{this.state.errorMessage}</div> :
          null
        }
      </div>
    );
  }
}

TextInput.propTypes = {
  errorMessage: PropTypes.string,
  requiredField: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

TextInput.contextTypes = {
  attachComponent: PropTypes.func,
  validateForm: PropTypes.func,
};

export default TextInput;

import React, { PropTypes } from 'react';

class TextArea extends React.Component {
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
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.value !== this.props.value) {
  //     this.setState({
  //       value: nextProps.value,
  //     });
  //   }
  // }
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
      <div>{error}</div>
    ));
    return (
      <div className="form-element">
        {this.props.label ? <label htmlFor={this.props.name}>{this.props.label}</label> : null}
        <textarea
          id={this.props.name}
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
        />
        {!this.state.isValid && this.state.submitted ?
          <div>{errors}</div> :
          null
        }
      </div>
    );
  }
}

TextArea.propTypes = {
  validators: PropTypes.array,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
};

TextArea.contextTypes = {
  attachComponent: PropTypes.func,
  detachComponent: PropTypes.func,
  validateForm: PropTypes.func,
};

export default TextArea;

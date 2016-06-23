import React, { PropTypes } from 'react';
import validators from '../utils/validators';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
    };
    this.attachComponent = this.attachComponent.bind(this);
    this.detachComponent = this.detachComponent.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.setSubmittedState = this.setSubmittedState.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }
  getChildContext() {
    return {
      attachComponent: this.attachComponent,
      detachComponent: this.detachComponent,
      validateForm: this.validateForm,
    };
  }
  componentWillMount() {
    this.inputs = [];
  }
  getModel() {
    const data = {};
    this.inputs.forEach((component) => {
      data[component.props.name] = component.state.value;
    });
    return data;
  }
  setSubmittedState() {
    this.inputs.forEach((component) => {
      component.setState({
        submitted: true,
      });
    });
  }
  attachComponent(component) {
    this.inputs.push(component);
    return this.inputs.length - 1;
  }
  detachComponent(index) {
    this.inputs.splice(index, 1);
  }
  validateField(fieldValidators, component) {
    const errors = [];
    fieldValidators.forEach(fieldValidator => {
      const error = validators[fieldValidator](component.state.value);
      if (error) {
        errors.push(error);
      }
    });
    return errors;
  }
  validateForm() {
    let valid = true;
    this.inputs.forEach(component => {
      const fieldValidators = component.props.validators;
      if (!fieldValidators) {
        component.setState({
          isValid: true,
          errors: [],
          submitted: true,
        });
        return;
      }
      const errors = this.validateField(fieldValidators, component);
      if (errors.length) {
        component.setState({
          isValid: false,
          errors,
          submitted: true,
        });
        valid = false;
        return;
      }
      component.setState({
        isValid: true,
        errors: [],
        submitted: true,
      });
    });
    this.setState({ isValid: valid });
    return valid;
  }
  resetForm() {
    this.inputs.forEach(component => {
      component.setState({
        value: '',
        errors: [],
        isValid: false,
        submitted: false,
      });
    });
  }
  submitForm(event) {
    event.preventDefault();
    const formIsValid = this.validateForm();
    const model = this.getModel();
    if (formIsValid) {
      this.resetForm();
      this.props.validSubmit(model);
    } else {
      console.log('Form is not valid');
    }
  }
  render() {
    return (
      <form onSubmit={this.submitForm}>
        {this.props.serverError ? <div>{this.props.serverError}</div> : null}
        {this.props.children}
      </form>
    );
  }
}

Form.propTypes = {
  validSubmit: PropTypes.func,
  children: PropTypes.array,
  serverError: PropTypes.string,
};

Form.childContextTypes = {
  attachComponent: PropTypes.func,
  detachComponent: PropTypes.func,
  validateForm: PropTypes.func,
};

export default Form;

import React, { PropTypes } from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
    };
    this.attachComponent = this.attachComponent.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.setSubmittedState = this.setSubmittedState.bind(this);
  }
  getChildContext() {
    return {
      attachComponent: this.attachComponent,
      validateForm: this.validateForm,
    };
  }
  componentWillMount() {
    this.inputs = [];
  }
  componentDidMount() {
    this.validateForm();
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
  }
  validateForm() {
    let valid = true;
    this.inputs.forEach((component) => {
      if (!component.state.isValid) {
        valid = false;
      }
    });
    this.setState({ isValid: valid });
  }
  submitForm() {
    const model = this.getModel();
    this.setSubmittedState();
    if (this.state.isValid) {
      this.props.validSubmit(model);
    } else {
      console.log('Form is not valid');
    }
  }
  render() {
    return (
      <form onSubmit={this.submitForm}>
        {this.props.children}
      </form>
    );
  }
}

Form.propTypes = {
  validSubmit: PropTypes.func,
  children: PropTypes.array,
};

Form.childContextTypes = {
  attachComponent: PropTypes.func,
  validateForm: PropTypes.func,
};

export default Form;

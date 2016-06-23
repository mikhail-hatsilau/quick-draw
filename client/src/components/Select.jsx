import React, { PropTypes } from 'react';

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.default,
      isValid: true,
      touched: false,
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    this.context.attachComponent(this);
  }
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.default !== nextProps.default) {
  //     this.setState({
  //       value: nextProps.default,
  //     });
  //   }
  // }
  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }
  render() {
    const options = this.props.items.map(item => (
      <option value={item.value}>{item.name}</option>
    ));
    return (
      <div className="form-element">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <select id={this.props.name} value={this.props.default} onChange={this.handleChange}>
          {options}
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  items: PropTypes.object.isRequired,
  default: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

Select.contextTypes = {
  attachComponent: PropTypes.func,
};

export default Select;

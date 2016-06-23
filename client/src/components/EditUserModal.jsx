import React, { PropTypes } from 'react';
import Modal from './modal/Modal';
import Input from './Input';
import Select from './Select';
import Form from './Form';
import PasswordChanger from './PasswordChanger';

class EditUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
  }
  updateUser(model) {
    this.props.updateUser(this.props.user.get('id'), model);
  }
  render() {
    return (
      <Modal closeModal={this.props.closeModal}>
        <Modal.Header closeBtn>
          Update User
        </Modal.Header>
        <Modal.Content>
          <Form validSubmit={this.updateUser} serverError={this.props.serverError}>
            <Input
              type="text"
              name="username"
              validators={['required']}
              errorMessage="Username is required"
              label="Username"
              value={this.props.user ? this.props.user.get('username') : ''}
              />
            <PasswordChanger />
            <Select
              items={this.props.roles}
              default={this.props.user ? this.props.user.get('role').get('_id') : ''}
              name="role"
              label="Roles"
              />
            <input type="submit" value="Save" />
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

EditUserModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  roles: PropTypes.object.isRequired,
  serverError: PropTypes.string,
  updateUser: PropTypes.func,
  user: PropTypes.object,
};

export default EditUserModal;

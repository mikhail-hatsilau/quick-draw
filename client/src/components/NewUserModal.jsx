import React, { PropTypes } from 'react';
import Modal from './modal/Modal';
import Input from './Input';
import Select from './Select';
import Form from './Form';

function NewUserModal(props) {
  return (
    <Modal closeModal={props.closeModal}>
      <Modal.Header closeBtn>
        New User
      </Modal.Header>
      <Modal.Content>
        <Form validSubmit={props.addUser} serverError={props.serverError}>
          <Input
            type="text"
            name="username"
            validators={['required']}
            errorMessage="Username is required"
            label="Username"
          />
          <Input
            type="password"
            name="password"
            validators={['required']}
            errorMessage="Password is required"
            label="Password"
          />
          <Select
            items={props.roles}
            default={props.roles.get(0) ? props.roles.get(0).value : ''}
            name="role"
            label="Roles"
          />
          <input type="submit" value="Save" />
        </Form>
      </Modal.Content>
    </Modal>
  );
}

NewUserModal.propTypes = {
  roles: PropTypes.object.isRequired,
  serverError: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
};

export default NewUserModal;

import React, { PropTypes } from 'react';
import Modal from './modal/Modal';
import Form from './Form';
import Input from './Input';
import TextArea from './TextArea';

class AddTaskModal extends React.Component {
  render() {
    return (
      <Modal closeModal={this.props.closeModal}>
        <Modal.Header closeBtn>
          New task
        </Modal.Header>
        <Modal.Content>
          <Form validSubmit={this.props.submitModalForm}>
            <Input
              type="text"
              name="name"
              validators={['required']}
              label="Task name"
              value={this.props.task && this.props.task.get('name')}
            />
            <TextArea
              name="code"
              validators={['required']}
              label="Code"
              value={this.props.task && this.props.task.get('code')}
            />
            <Input
              type="number"
              name="answare"
              validators={['required']}
              label="Answare row"
              value={this.props.task && this.props.task.get('answare')}
            />
            <button>{this.props.editMode ? 'Save' : 'Add'}</button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

AddTaskModal.propTypes = {
  submitModalForm: PropTypes.func.isRequired,
  closeModal: PropTypes.func,
  editMode: PropTypes.bool,
  task: PropTypes.object,
};

export default AddTaskModal;

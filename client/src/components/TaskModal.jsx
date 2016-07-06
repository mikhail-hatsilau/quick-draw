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
              type="text"
              name="deprecatedSelectors"
              label="Deprecated selectors"
              validators={['deprecatedSelectorsValidation']}
              placeholder=":,*"
              value={this.props.task && this.props.task.get('deprecatedSelectors')}
            />
            <Input
              type="text"
              name="answare"
              validators={['required', 'answareslistValidation']}
              label="Answare row"
              placeholder="0,1"
              value={this.props.task && this.props.task.get('answare')}
            />
            <Input
              type="text"
              name="timeLimit"
              validators={['required', 'timeValidation']}
              label="Time limit (seconds)"
              placeholder="120"
              value={this.props.task && this.props.task.get('timeLimit')}
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

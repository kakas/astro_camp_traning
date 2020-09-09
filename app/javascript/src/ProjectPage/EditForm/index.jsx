import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { oneOf } from 'prop-types'
import { Button, Modal, Form } from 'semantic-ui-react'
import {
  updateTaskFormData,
  openTaskFormModal,
  clearFormFieldErrors,
  createTask,
  updateTask,
} from '../actions'
import { FORM_TYPE } from '../constants'

const statusOptions = [
  { key: 'pending', value: 'pending', text: 'pending' },
  { key: 'in_progress', value: 'in_progress', text: 'in_progress' },
  { key: 'done', value: 'done', text: 'done' },
]

const priorityOptions = [
  { key: 'normal', value: 'normal', text: 'normal' },
  { key: 'high', value: 'high', text: 'high' },
  { key: 'low', value: 'low', text: 'low' },
]

function EditForm({ formType }) {
  const dispatch = useDispatch()
  const {
    taskFormData,
    formErrors,
    editFormIsOpen: isOpen,
    editFormIsLoading: isLoading,
  } = useSelector((state) => state.projectPage, shallowEqual)

  const handleChange = (e, { name, value }) => {
    dispatch(updateTaskFormData({ ...taskFormData, [name]: value }))
    dispatch(clearFormFieldErrors(name))
  }

  const handleSubmit = () => {
    if (formType === FORM_TYPE.UPDATE) {
      dispatch(updateTask(taskFormData))
    } else {
      dispatch(createTask(taskFormData))
    }
  }

  /* eslint-disable consistent-return */
  const error = (name) => {
    if (formErrors[name] == null) return

    return {
      content: formErrors[name].join('\n'),
      pointing: 'below',
    }
  }
  /* eslint-enable consistent-return */

  return (
    <Modal open={isOpen}>
      <Modal.Content>
        <Modal.Description>
          <Form loading={isLoading}>
            <Form.Input
              label="Title"
              name="title"
              value={taskFormData.title}
              onChange={handleChange}
              error={error('title')}
            />
            <Form.TextArea
              label="Content"
              name="content"
              value={taskFormData.content}
              onChange={handleChange}
              error={error('content')}
            />
            <Form.Select
              selection
              options={statusOptions}
              label="Status"
              name="status"
              value={taskFormData.status}
              onChange={handleChange}
              error={error('status')}
            />
            <Form.Select
              selection
              options={priorityOptions}
              label="Priority"
              name="priority"
              value={taskFormData.priority}
              onChange={handleChange}
              error={error('priority')}
            />
            {/* TODO: start_time and end_time */}
            <Button
              color="red"
              content="Cancel"
              onClick={() => dispatch(openTaskFormModal(false))}
            />
            <Button
              color="blue"
              content="Submit"
              labelPosition="right"
              icon="edit"
              onClick={handleSubmit}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

EditForm.propTypes = {
  formType: oneOf(Object.keys(FORM_TYPE)).isRequired,
}

export default EditForm

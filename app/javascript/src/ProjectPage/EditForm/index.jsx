import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import _ from 'lodash'
import { Button, Modal, Form } from 'semantic-ui-react'
import {
  updateTaskFormData,
  openTaskFormModal,
  clearFormFieldErrors,
} from 'ducks/projectPage'
import { updateTask } from 'ducks/tasks'

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

function EditForm() {
  const dispatch = useDispatch()
  const { taskFormData, formErrors, editFormIsOpen: isOpen } = useSelector(
    (state) => state.projectPage,
    shallowEqual
  )

  const handleChange = (e, { name, value }) => {
    dispatch(updateTaskFormData({ ...taskFormData, [name]: value }))
    dispatch(clearFormFieldErrors(name))
  }

  const handleSubmit = () => {
    dispatch(updateTask(taskFormData))
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
          <Form>
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
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
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
      </Modal.Actions>
    </Modal>
  )
}

export default EditForm

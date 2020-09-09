import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Button, Container, Table, Pagination } from 'semantic-ui-react'
import { fetchTasks, openTaskFormModal, updateTaskFormData } from './actions'
import { emptyTask, FORM_TYPE } from './constants'
import EditForm from './EditForm'

export default function ProjectPage() {
  const dispatch = useDispatch()
  const { tasks, totalPages } = useSelector(
    (state) => state.projectPage,
    shallowEqual
  )
  const [activePage, setActivePage] = useState(1)
  const [formType, setFormType] = useState(FORM_TYPE.CREATE)

  const handlePageChange = (e, { activePage: newActivepage }) => {
    setActivePage(newActivepage)
    dispatch(fetchTasks(newActivepage))
  }

  useEffect(() => {
    dispatch(fetchTasks(activePage))
  }, [])

  return (
    <Container>
      <EditForm formType={formType} />
      <Button
        content="New"
        onClick={() => {
          dispatch(openTaskFormModal(true))
          dispatch(updateTaskFormData({ ...emptyTask }))
          setFormType(FORM_TYPE.CREATE)
        }}
      />

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Content</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Priority</Table.HeaderCell>
            <Table.HeaderCell>Start Time</Table.HeaderCell>
            <Table.HeaderCell>End Time</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tasks.map((task) => {
            return (
              <Table.Row key={task.id}>
                <Table.Cell>
                  <Button
                    content="Edit"
                    onClick={() => {
                      dispatch(openTaskFormModal(true))
                      dispatch(updateTaskFormData({ ...task }))
                      setFormType(FORM_TYPE.UPDATE)
                    }}
                  />
                </Table.Cell>
                <Table.Cell>{task.title} </Table.Cell>
                <Table.Cell>{task.content}</Table.Cell>
                <Table.Cell>{task.status}</Table.Cell>
                <Table.Cell>{task.priority}</Table.Cell>
                <Table.Cell>{task.start_time}</Table.Cell>
                <Table.Cell>{task.end_time}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="7">
              <Pagination
                activePage={activePage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Container>
  )
}
